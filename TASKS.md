# 📋 Project Tasks: Signatures App

This checklist will guide completion of the **Signatures App** project.

---

## Phase 1: Repository Setup
- [ ] Fix remote origin → `https://github.com/phillipray87/signatures-app.git`
- [ ] Ensure `.gitignore` contains:
  - `node_modules/`
  - `.env`
  - `*.log`
  - `.DS_Store`
- [ ] Verify repo runs in GitHub Codespaces

---

## Phase 2: File & Folder Structure
- [ ] Confirm structure:

```
signatures-app/
├── data/
│   ├── people/
│   │   ├── kathleen.json
│   │   └── phillip.json
│   └── templates/
│       ├── template1/
│       │   ├── style.css
│       │   └── template.html
│       └── template2/
│           ├── style.css
│           └── template.html
├── public/
│   ├── app.js
│   ├── config.js
│   ├── helpers.js
│   ├── index.html
│   └── styles.css
├── server.js
├── package.json
└── README.md
```

- [ ] Remove duplicates under `public/data/`
- [ ] Ensure `/data/people` and `/data/templates` exist

---

## Phase 3: Backend (server.js)
- [ ] Serve static files from `/public`
- [ ] API routes:
  - [ ] `GET /api/people` → list all JSONs from `/data/people/`
  - [ ] `POST /api/people` → save new JSON
  - [ ] `GET /api/templates` → list templates
  - [ ] `POST /api/templates` → save template folder (`template.html` + `style.css`)
- [ ] Add error handling (invalid JSON, missing file)

---

## Phase 4: Frontend (UI)
- [ ] Populate **person dropdown** from `/api/people`
- [ ] Populate **templates gallery** from `/api/templates`
- [ ] `+ Add Person` modal → POST new person → refresh dropdown
- [ ] `+ Add Template` modal → POST new template → refresh gallery
- [ ] Template placeholders replaced with JSON values:
  - `{{name}}`, `{{title}}`, `{{company}}`, `{{mobile}}`, etc.
  - Array fields (like `awards`) expand into `<li>` elements

---

## Phase 5: Helpers & Config
- [ ] `helpers.js`:
  - Replace placeholders
  - Validate required fields
- [ ] `config.js`:
  - Define base paths for `people` and `templates`

---

## Phase 6: Testing
- [ ] Run locally in Codespaces:
  ```bash
  node server.js
  ```
- [ ] Test in browser:
  - People load
  - Templates render
  - Adding new person/template creates files in `/data/`
- [ ] Commit & push to GitHub

---

## Phase 7: Polishing
- [ ] Write `README.md` with setup instructions
- [ ] Add **pre-commit hook**:
  - Block duplicate folders (e.g., `/signatures-app/signatures-app`)
  - Validate JSON before commit
- [ ] (Optional) Deploy:
  - GitHub Pages (static only)  
  - Render/Heroku (with backend)

---

✅ When all boxes are checked, the **Signatures App** will be complete and production-ready.
