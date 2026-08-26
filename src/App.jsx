import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Battery,
  Check,
  ChevronRight,
  Clock3,
  Folder,
  Github,
  Globe,
  Linkedin,
  Mail,
  Maximize2,
  Minimize2,
  Moon,
  MoreHorizontal,
  Network,
  Power,
  RotateCcw,
  Search,
  Settings as SettingsIcon,
  Terminal as TerminalIcon,
  X
} from "lucide-react";
import { apps, profile, projects, skills } from "./data";

const INITIAL_WINDOWS = {
  about: { open: false, minimized: false, maximized: false, x: 120, y: 85, w: 680, h: 520 },
  projects: { open: false, minimized: false, maximized: false, x: 180, y: 75, w: 820, h: 560 },
  skills: { open: false, minimized: false, maximized: false, x: 250, y: 90, w: 760, h: 560 },
  github: { open: false, minimized: false, maximized: false, x: 300, y: 100, w: 650, h: 420 },
  leetcode: { open: false, minimized: false, maximized: false, x: 330, y: 120, w: 650, h: 420 },
  linkedin: { open: false, minimized: false, maximized: false, x: 360, y: 110, w: 650, h: 420 },
  resume: { open: false, minimized: false, maximized: false, x: 140, y: 60, w: 700, h: 600 },
  terminal: { open: false, minimized: false, maximized: false, x: 220, y: 100, w: 720, h: 470 },
  browser: { open: false, minimized: false, maximized: false, x: 150, y: 70, w: 820, h: 560 },
  contact: { open: false, minimized: false, maximized: false, x: 400, y: 130, w: 560, h: 430 },
  settings: { open: false, minimized: false, maximized: false, x: 280, y: 100, w: 620, h: 470 }
};

function App() {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [active, setActive] = useState(null);
  const [zCounter, setZCounter] = useState(20);
  const [startOpen, setStartOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState(() => localStorage.getItem("soumyos-theme") || "dark");
  const [reducedMotion, setReducedMotion] = useState(
    () => localStorage.getItem("soumyos-reduced-motion") === "true"
  );
  const [terminalHistory, setTerminalHistory] = useState([
    "SoumyOS Terminal v1.0",
    'Type "help" to see available commands.'
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    localStorage.setItem("soumyos-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("soumyos-reduced-motion", reducedMotion);
  }, [reducedMotion]);

  const openWindow = (id) => {
    setZCounter((z) => z + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false, zIndex: zCounter + 1 }
    }));
    setActive(id);
    setStartOpen(false);
  };

  const focusWindow = (id) => {
    setZCounter((z) => z + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: false, zIndex: zCounter + 1 }
    }));
    setActive(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false, minimized: false } }));
    if (active === id) setActive(null);
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }));
    if (active === id) setActive(null);
  };

  const maximizeWindow = (id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized } }));
    focusWindow(id);
  };

  const resetDesktop = () => {
    setWindows(INITIAL_WINDOWS);
    setActive(null);
    setStartOpen(false);
  };

  const executeCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    const output = [`soumyajit@soumyos:~$ ${command}`];

    const commands = {
      help: [
        "Available commands:",
        "  whoami      About Soumyajit",
        "  skills      Show technical skills",
        "  projects    List projects",
        "  github      Open GitHub",
        "  linkedin    Open LinkedIn",
        "  leetcode    Open LeetCode",
        "  contact     Show contact information",
        "  clear       Clear terminal"
      ],
      whoami: [profile.name, profile.role, profile.education],
      skills: Object.entries(skills).flatMap(([category, items]) => [
        `${category}: ${items.join(", ")}`
      ]),
      projects: projects.map((p, i) => `${i + 1}. ${p.name}`),
      contact: [
        `GitHub: ${profile.github}`,
        `LinkedIn: ${profile.linkedin}`,
        `LeetCode: ${profile.leetcode}`,
        profile.email ? `Email: ${profile.email}` : "Email: not configured"
      ]
    };

    if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }

    if (cmd === "github") {
      window.open(profile.github, "_blank", "noopener,noreferrer");
      output.push("Opening GitHub...");
    } else if (cmd === "linkedin") {
      window.open(profile.linkedin, "_blank", "noopener,noreferrer");
      output.push("Opening LinkedIn...");
    } else if (cmd === "leetcode") {
      window.open(profile.leetcode, "_blank", "noopener,noreferrer");
      output.push("Opening LeetCode...");
    } else if (commands[cmd]) {
      output.push(...commands[cmd]);
    } else {
      output.push(`Command not found: ${cmd}. Type "help".`);
    }

    setTerminalHistory((h) => [...h, ...output]);
  };

  if (booting) {
    return <BootScreen reducedMotion={reducedMotion} />;
  }

  return (
    <main className={`os-shell ${theme} ${reducedMotion ? "reduced-motion" : ""}`}>
      <div className="wallpaper-grid" />
      <TopBar now={now} onStart={() => setStartOpen((v) => !v)} />

      <section className="desktop" onClick={() => setStartOpen(false)}>
        <DesktopIcons onOpen={openWindow} />

        {Object.entries(windows).map(([id, win]) =>
          win.open && !win.minimized ? (
            <Window
              key={id}
              id={id}
              meta={apps.find((a) => a.id === id)}
              state={win}
              active={active === id}
              onFocus={() => focusWindow(id)}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => maximizeWindow(id)}
            >
              <AppContent
                id={id}
                terminalHistory={terminalHistory}
                executeCommand={executeCommand}
                theme={theme}
                setTheme={setTheme}
                reducedMotion={reducedMotion}
                setReducedMotion={setReducedMotion}
                onOpen={openWindow}
              />
            </Window>
          ) : null
        )}
      </section>

      {startOpen && (
        <StartMenu
          onOpen={openWindow}
          onReset={resetDesktop}
          onClose={() => setStartOpen(false)}
        />
      )}

      <Taskbar
        windows={windows}
        active={active}
        onOpen={openWindow}
        onFocus={focusWindow}
        onStart={() => setStartOpen((v) => !v)}
        now={now}
      />
    </main>
  );
}

function BootScreen({ reducedMotion }) {
  return (
    <div className={`boot-screen ${reducedMotion ? "reduced-motion" : ""}`}>
      <div className="boot-logo">S</div>
      <div className="boot-title">SOUMYOS</div>
      <div className="boot-subtitle">Personal Developer Operating System</div>
      <div className="boot-lines">
        <span>Initializing portfolio...</span>
        <span>Loading projects...</span>
        <span>Loading skills...</span>
        <span>Starting desktop...</span>
      </div>
      <div className="progress"><i /></div>
      <div className="boot-welcome">Welcome, visitor.</div>
    </div>
  );
}

function TopBar({ now, onStart }) {
  return (
    <header className="topbar">
      <button className="brand-button" onClick={onStart}>
        <span className="brand-mark">S</span>
        <span>SoumyOS</span>
      </button>
      <div className="topbar-center">Developer Workstation</div>
      <div className="system-status">
        <Network size={15} />
        <span>Connected</span>
        <span>•</span>
        <span>{now.toLocaleDateString([], { day: "2-digit", month: "short" })}</span>
        <span>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        <Battery size={16} />
      </div>
    </header>
  );
}

function DesktopIcons({ onOpen }) {
  const ids = ["about", "projects", "skills", "github", "leetcode", "linkedin", "resume", "terminal", "contact", "email"];
  return (
    <div className="desktop-icons">
      {ids.map((id) => {
        const app = apps.find((a) => a.id === id);
        return (
          <button className="desktop-icon" key={id} onDoubleClick={() => onOpen(id)} onClick={() => onOpen(id)}>
            <span className="desktop-icon-image">{app.icon}</span>
            <span>{app.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function Taskbar({ windows, active, onOpen, onFocus, onStart, now }) {
  const openApps = Object.entries(windows).filter(([, w]) => w.open);
  return (
    <footer className="taskbar">
      <button className="start-button" onClick={onStart}>
        <span className="brand-mark small">S</span>
      </button>
      <div className="taskbar-apps">
        {openApps.map(([id]) => {
          const app = apps.find((a) => a.id === id);
          return (
            <button
              key={id}
              className={`task-app ${active === id ? "active" : ""}`}
              onClick={() => onFocus(id)}
              title={app.name}
            >
              <span>{app.icon}</span>
              <span className="task-label">{app.name}</span>
            </button>
          );
        })}
      </div>
      <div className="tray">
        <span><Network size={14} /></span>
        <span><Battery size={14} /></span>
        <span>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </footer>
  );
}

function StartMenu({ onOpen, onReset, onClose }) {
  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-header">
        <div>
          <div className="start-user">Soumyajit Saha</div>
          <div className="muted">Java Backend Developer</div>
        </div>
        <div className="avatar">SS</div>
      </div>
      <div className="start-search"><Search size={16} /> Search applications...</div>
      <div className="app-grid">
        {apps.map((app) => (
          <button key={app.id} className="launcher-app" onClick={() => onOpen(app.id)}>
            <span>{app.icon}</span>
            <small>{app.name}</small>
          </button>
        ))}
      </div>
      <div className="start-footer">
        <button onClick={onReset}><RotateCcw size={15} /> Reset Desktop</button>
        <button onClick={onClose}><Power size={15} /> Close</button>
      </div>
    </div>
  );
}

function Window({ id, meta, state, active, onFocus, onClose, onMinimize, onMaximize, children }) {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: state.x, y: state.y });

  useEffect(() => {
    setPos({ x: state.x, y: state.y });
  }, [state.x, state.y]);

  const beginDrag = (e) => {
    if (state.maximized) return;
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const original = { ...pos };
    dragRef.current = { startX, startY, original };

    const move = (event) => {
      const d = dragRef.current;
      setPos({
        x: Math.max(8, original.x + event.clientX - d.startX),
        y: Math.max(42, original.y + event.clientY - d.startY)
      });
    };

    const up = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const style = state.maximized
    ? { zIndex: state.zIndex || 10 }
    : {
        left: pos.x,
        top: pos.y,
        width: `min(${state.w}px, calc(100vw - 20px))`,
        height: `min(${state.h}px, calc(100vh - 95px))`,
        zIndex: state.zIndex || 10
      };

  return (
    <section
      className={`window ${active ? "window-active" : ""} ${state.maximized ? "maximized" : ""}`}
      style={style}
      onPointerDown={onFocus}
    >
      <header className="window-titlebar" onPointerDown={beginDrag}>
        <div className="window-title">
          <span>{meta?.icon || "◻️"}</span>
          <span>{meta?.name || id}</span>
        </div>
        <div className="window-controls">
          <button title="Minimize" onPointerDown={(e) => e.stopPropagation()} onClick={onMinimize}><Minimize2 size={15} /></button>
          <button title="Maximize" onPointerDown={(e) => e.stopPropagation()} onClick={onMaximize}><Maximize2 size={14} /></button>
          <button title="Close" className="close" onPointerDown={(e) => e.stopPropagation()} onClick={onClose}><X size={15} /></button>
        </div>
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}

function AppContent({ id, terminalHistory, executeCommand, theme, setTheme, reducedMotion, setReducedMotion, onOpen }) {
  switch (id) {
    case "about": return <About onOpen={onOpen} />;
    case "projects": return <Projects />;
    case "skills": return <Skills />;
    case "github": return <SocialApp type="github" />;
    case "leetcode": return <SocialApp type="leetcode" />;
    case "linkedin": return <SocialApp type="linkedin" />;
    case "resume": return <Resume />;
    case "terminal": return <Terminal history={terminalHistory} executeCommand={executeCommand} />;
    case "browser": return <Browser />;
    case "contact": return <Contact />;
    case "email": return <EmailApp />;
    case "settings": return <Settings theme={theme} setTheme={setTheme} reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} />;
    default: return null;
  }
}

function AppHeader({ eyebrow, title, children }) {
  return (
    <div className="app-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}

function About({ onOpen }) {
  return (
    <div className="content">
      <AppHeader eyebrow="SYSTEM / PROFILE" title="About Me">
        <span className="status-pill"><Check size={13} /> Available for learning & building</span>
      </AppHeader>
      <div className="about-hero">
        <div className="profile-avatar">SS</div>
        <div>
          <h2>{profile.name}</h2>
          <p className="role">{profile.role}</p>
          <p>{profile.summary}</p>
        </div>
      </div>
      <div className="info-grid">
        <InfoCard title="Education" value={profile.education} />
        <InfoCard title="Primary Focus" value="Java • Spring Boot • SQL • Backend" />
        <InfoCard title="Exploring" value="Cybersecurity • Web3 • System Design" />
        <InfoCard title="Practice" value="DSA • Computer Science fundamentals" />
      </div>
      <div className="section-title">Quick access</div>
      <div className="quick-actions">
        <button onClick={() => onOpen("projects")}>View Projects <ChevronRight size={15} /></button>
        <button onClick={() => onOpen("skills")}>Explore Skills <ChevronRight size={15} /></button>
        <button onClick={() => onOpen("terminal")}>Open Terminal <ChevronRight size={15} /></button>
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return <div className="info-card"><span>{title}</span><strong>{value}</strong></div>;
}

function Projects() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <div className="content project-layout">
      <div className="project-sidebar">
        <div className="eyebrow">WORKSPACE</div>
        <h2>Projects</h2>
        {projects.map((p, i) => (
          <button className={`project-item ${selected === i ? "selected" : ""}`} key={p.name} onClick={() => setSelected(i)}>
            <span>{p.icon}</span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>
      <div className="project-detail">
        <div className="project-icon-large">{project.icon}</div>
        <div className="eyebrow">PROJECT {String(selected + 1).padStart(2, "0")}</div>
        <h1>{project.name}</h1>
        <p className="lead">{project.description}</p>
        <div className="tag-row">{project.technologies.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <h3>Key features</h3>
        <ul className="feature-list">{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="link-row">
          {project.github ? <a href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a> : <span className="disabled-link">GitHub not configured</span>}
          {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer"><Globe size={16} /> Live Demo</a> : <span className="disabled-link">Live Demo not configured</span>}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="content">
      <AppHeader eyebrow="SYSTEM / TOOLCHAIN" title="Skills" />
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skill-group" key={category}>
            <h3>{category}</h3>
            <div className="skill-list">{items.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
        ))}
      </div>
      <p className="disclaimer">Skills are grouped by current learning and project exposure; no artificial “expert” percentages are used.</p>
    </div>
  );
}

function SocialApp({ type }) {
  if (type === "github") return <GitHubApp />;

  const config = {
    leetcode: {
      label: "LeetCode",
      icon: <span className="big-emoji">🧠</span>,
      handle: "soumyajit_saha",
      url: profile.leetcode,
      description: "DSA practice and problem-solving profile."
    },
    linkedin: {
      label: "LinkedIn",
      icon: <Linkedin size={42} />,
      handle: "Soumyajit Saha",
      url: profile.linkedin,
      description: "Professional profile and career network."
    }
  }[type];

  return (
    <div className="social-app">
      <div className="social-icon">{config.icon}</div>
      <div className="eyebrow">EXTERNAL PROFILE</div>
      <h1>{config.label}</h1>
      <p className="handle">{config.handle}</p>
      <p>{config.description}</p>
      <a className="primary-button" href={config.url} target="_blank" rel="noreferrer">
        Open {config.label} <ChevronRight size={16} />
      </a>
      <div className="external-note">
        This profile is hosted by {config.label}; it cannot reliably be rendered inside a portfolio window.
      </div>
    </div>
  );
}

function GitHubApp() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadGitHub() {
      try {
        setLoading(true);
        setError("");

        const [userResponse, reposResponse] = await Promise.all([
          fetch("https://api.github.com/users/SOUMYAJIT200515"),
          fetch("https://api.github.com/users/SOUMYAJIT200515/repos?sort=updated&per_page=12")
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub API request failed");
        }

        const userData = await userResponse.json();
        const repoData = await reposResponse.json();

        if (!cancelled) {
          setUser(userData);
          setRepos(Array.isArray(repoData) ? repoData : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not load GitHub data right now. You can still open the real profile.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadGitHub();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="github-app">
        <div className="github-loading">
          <div className="github-spinner" />
          <h2>Connecting to GitHub...</h2>
          <p>Loading your public profile and repositories directly inside SoumyOS.</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="github-app">
        <div className="github-error">
          <Github size={42} />
          <h2>GitHub is temporarily unavailable</h2>
          <p>{error}</p>
          <a className="primary-button" href={profile.github} target="_blank" rel="noreferrer">
            Open GitHub <ChevronRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="github-app">
      <div className="github-header">
        <div className="github-brand">
          <Github size={24} />
          <strong>GitHub</strong>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="github-open-link">
          View full profile ↗
        </a>
      </div>

      <div className="github-profile">
        <img className="github-avatar" src={user.avatar_url} alt={user.login} />
        <div className="github-profile-main">
          <div className="github-name-row">
            <div>
              <h1>{user.name || user.login}</h1>
              <p className="github-login">@{user.login}</p>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="github-follow">
              Open profile
            </a>
          </div>
          {user.bio && <p className="github-bio">{user.bio}</p>}
          <div className="github-stats">
            <span><strong>{user.public_repos}</strong> repositories</span>
            <span><strong>{user.followers}</strong> followers</span>
            <span><strong>{user.following}</strong> following</span>
          </div>
          <div className="github-meta">
            {user.location && <span>📍 {user.location}</span>}
            {user.company && <span>🏢 {user.company}</span>}
            {user.blog && <span>🔗 {user.blog}</span>}
          </div>
        </div>
      </div>

      <div className="github-section-head">
        <h2>Repositories</h2>
        <span>Recently updated public repositories</span>
      </div>

      <div className="repo-grid">
        {repos.length ? repos.map((repo) => (
          <a
            className="repo-card"
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="repo-title">
              <span><Github size={14} /> {repo.name}</span>
              <span className="repo-arrow">↗</span>
            </div>
            <p>{repo.description || "No repository description provided."}</p>
            <div className="repo-footer">
              <span>{repo.language || "Code"}</span>
              <span>★ {repo.stargazers_count}</span>
              <span>⑂ {repo.forks_count}</span>
            </div>
          </a>
        )) : (
          <p>No public repositories were returned by GitHub.</p>
        )}
      </div>

      <div className="github-api-note">
        <span>●</span> Live public data from GitHub API — no database or backend required.
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className="content">
      <AppHeader eyebrow="DOCUMENTS" title="Resume">
        <span className="status-pill">PDF viewer</span>
      </AppHeader>
      <div className="resume-placeholder">
        <div className="paper-icon">📄</div>
        <h2>Resume not configured yet</h2>
        <p>Add your PDF at <code>/public/resume.pdf</code> to enable the viewer.</p>
        <div className="resume-actions">
          <a className="primary-button" href="/resume.pdf" target="_blank" rel="noreferrer">Open Resume</a>
          <a className="secondary-button" href="/resume.pdf" download>Download PDF</a>
        </div>
      </div>
    </div>
  );
}

function Terminal({ history, executeCommand }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-toolbar"><span>bash — soumyos</span><span>UTF-8</span></div>
      <div className="terminal-output">
        {history.map((line, i) => <div key={`${line}-${i}`} className={line.startsWith("soumyajit@") ? "prompt-line" : ""}>{line}</div>)}
      </div>
      <form className="terminal-input" onSubmit={(e) => { e.preventDefault(); executeCommand(input); setInput(""); }}>
        <span>soumyajit@soumyos:~$</span>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
      </form>
    </div>
  );
}

function Browser() {
  return (
    <div className="browser">
      <div className="browser-bar">
        <button><ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /></button>
        <button><ChevronRight size={16} /></button>
        <div className="address"><Globe size={14} /> soumyos://developer-links</div>
        <MoreHorizontal size={18} />
      </div>
      <div className="browser-page">
        <div className="browser-logo">S</div>
        <div className="eyebrow">DEVELOPER LINK HUB</div>
        <h1>Explore Soumyajit's web</h1>
        <p>Quick links to the real external profiles.</p>
        <div className="browser-links">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub <ChevronRight /></a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer"><span>🧠</span> LeetCode <ChevronRight /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ChevronRight /></a>
          {profile.email && (
            <a href={`mailto:${profile.email}?subject=Hello%20Soumyajit&body=Hi%20Soumyajit,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ARegards,`}>
              <Mail /> Email <ChevronRight />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="content">
      <AppHeader eyebrow="COMMUNICATION" title="Contact" />
      <div className="contact-card">
        <div className="contact-icon"><Mail size={28} /></div>
        <h2>Let's connect</h2>
        <p>For professional communication, use the links below.</p>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer"><span>🧠</span> LeetCode</a>
          {profile.email && (
            <a
              href={`mailto:${profile.email}?subject=Hello%20Soumyajit&body=Hi%20Soumyajit,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ARegards,`}
            >
              <Mail /> Email
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailApp() {
  const email = profile.email;

  const openCompose = () => {
    window.location.href =
      `mailto:${email}?subject=Hello%20Soumyajit&body=Hi%20Soumyajit,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ARegards,`;
  };

  return (
    <div className="email-app">
      <div className="email-toolbar">
        <div className="github-brand"><Mail size={22} /><strong>Mail</strong></div>
        <span className="status-pill"><Check size={13} /> Ready</span>
      </div>

      <div className="email-compose-card">
        <div className="email-icon"><Mail size={30} /></div>
        <div className="eyebrow">COMPOSE MESSAGE</div>
        <h1>Contact Soumyajit</h1>
        <p>Your email application will open with the recipient already filled in.</p>

        <div className="mail-field">
          <label>To</label>
          <div className="mail-value">{email}</div>
        </div>
        <div className="mail-field">
          <label>Subject</label>
          <div className="mail-value">Hello Soumyajit</div>
        </div>

        <button className="primary-button compose-button" onClick={openCompose}>
          <Mail size={16} /> Compose Email
        </button>

        <p className="email-note">
          SoumyOS does not need a backend for email. The button uses your device's
          configured mail handler (Gmail/Outlook/Mail app, depending on the browser/device).
        </p>
      </div>
    </div>
  );
}

function Settings({ theme, setTheme, reducedMotion, setReducedMotion }) {
  return (
    <div className="content">
      <AppHeader eyebrow="SYSTEM" title="Settings"><SettingsIcon size={20} /></AppHeader>
      <div className="settings-list">
        <div className="setting-row">
          <div><strong>Appearance</strong><span>Choose the desktop theme.</span></div>
          <div className="segmented">
            <button className={theme === "dark" ? "selected" : ""} onClick={() => setTheme("dark")}><Moon size={15} /> Dark</button>
            <button className={theme === "light" ? "selected" : ""} onClick={() => setTheme("light")}>Light</button>
          </div>
        </div>
        <div className="setting-row">
          <div><strong>Reduce animations</strong><span>Minimize motion throughout SoumyOS.</span></div>
          <button className={`toggle ${reducedMotion ? "on" : ""}`} onClick={() => setReducedMotion(!reducedMotion)}>
            <i />
          </button>
        </div>
        <div className="setting-row">
          <div><strong>Portfolio</strong><span>SoumyOS v1.0 • Client-side application</span></div>
          <span className="status-pill"><Check size={13} /> No backend</span>
        </div>
      </div>
    </div>
  );
}

export default App;