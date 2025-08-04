const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3005;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // serve index.html and static assets

// Directories
const PEOPLE_DIR = path.join(__dirname, "public/data/people");
const TEMPLATE_DIR = path.join(__dirname, "public/data/templates");

// Ensure directories exist
if (!fs.existsSync(PEOPLE_DIR)) fs.mkdirSync(PEOPLE_DIR, { recursive: true });
if (!fs.existsSync(TEMPLATE_DIR)) fs.mkdirSync(TEMPLATE_DIR, { recursive: true });

/* ===========================
   API ROUTES
   =========================== */

// -------- PEOPLE --------
app.get("/api/people", (req, res) => {
  try {
    const files = fs.readdirSync(PEOPLE_DIR).filter(f => f.endsWith(".json"));
    const people = files.map(f => {
      const raw = fs.readFileSync(path.join(PEOPLE_DIR, f), "utf-8");
      return JSON.parse(raw);
    });
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/people", (req, res) => {
  const person = req.body;
  if (!person.id) return res.status(400).json({ error: "Person must have an 'id'" });

  const filePath = path.join(PEOPLE_DIR, `${person.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(person, null, 2), "utf-8");
  res.json({ success: true, file: filePath });
});

// -------- TEMPLATES --------
app.get("/api/templates", (req, res) => {
  try {
    const files = fs.readdirSync(TEMPLATE_DIR).filter(f => f.endsWith(".json"));
    const templates = files.map(f => {
      const raw = fs.readFileSync(path.join(TEMPLATE_DIR, f), "utf-8");
      return JSON.parse(raw);
    });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/templates", (req, res) => {
  const { id, html, css } = req.body;
  if (!id) return res.status(400).json({ error: "Template must have an 'id'" });

  const filePath = path.join(TEMPLATE_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ id, html, css }, null, 2), "utf-8");
  res.json({ success: true, file: filePath });
});

/* ===========================
   START SERVER
   =========================== */
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
