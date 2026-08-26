# SoumyOS Portfolio

An OS-style developer portfolio for Soumyajit Saha.

## Stack

- React
- JavaScript
- Vite
- CSS
- lucide-react

No backend. No database.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Build

```bash
npm run build
npm run preview
```

## Personal links already configured

- GitHub: https://github.com/SOUMYAJIT200515
- LeetCode: https://leetcode.com/u/soumyajit_saha
- LinkedIn: https://www.linkedin.com/in/soumyajit-saha-958639338/

## Resume

Put your PDF at:

`public/resume.pdf`

## Important

Optional project GitHub/demo URLs are intentionally left blank when they were not supplied.
Do not replace them with fake links.


## GitHub app behavior

The GitHub icon now opens an actual GitHub-style application **inside SoumyOS**.
It fetches your public GitHub profile and public repositories from the GitHub API
directly from the browser. No database, backend, or API key is required.

The real GitHub profile remains available through the "View full profile" button.

## Email behavior

The Email app is also inside SoumyOS. It automatically uses:

`soumyajitsaha.mii@gmail.com`

Clicking "Compose Email" triggers a `mailto:` action with the recipient and starter
subject/body already filled. The browser/device then hands it to the user's
configured email application or web mail handler.

## Important limitation

LinkedIn and similar third-party sites generally prevent their complete websites
from being embedded in an iframe. Therefore the portfolio keeps those as real
external links rather than pretending a broken embedded page is the actual site.
