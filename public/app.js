let people = [];
let templates = [];
let currentPerson = null;

// Utility: replace placeholders in template HTML
function renderTemplate(templateHtml, person) {
  let html = templateHtml;
  Object.keys(person).forEach(key => {
    if (typeof person[key] === "string") {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), person[key]);
    } else if (Array.isArray(person[key])) {
      // Handle arrays like awards
      html = html.replace(
        new RegExp(`{{${key}}}`, "g"),
        person[key].map(item => `<li>${item}</li>`).join("")
      );
    } else if (typeof person[key] === "object" && person[key] !== null) {
      Object.keys(person[key]).forEach(subKey => {
        html = html.replace(
          new RegExp(`{{${subKey}}}`, "g"),
          person[key][subKey]
        );
      });
    }
  });
  return html;
}

// Load all people JSONs
async function loadPeople() {
  try {
    const promises = PEOPLE_PATHS.map(file =>
      fetch(file).then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.json();
      })
    );
    people = await Promise.all(promises);

    const select = document.getElementById("person-select");
    select.innerHTML = "";

    people.forEach(person => {
      const option = document.createElement("option");
      option.value = person.id;
      option.textContent = person.name;
      select.appendChild(option);
    });

    currentPerson = people[0];
    select.value = currentPerson.id;
  } catch (err) {
    console.error("Error loading people:", err);
    document.getElementById("gallery").innerHTML =
      `<div class="loading text-danger">⚠ Could not load people data.</div>`;
  }
}

// Load all templates
async function loadTemplates() {
  try {
    templates = [];

    for (let t of TEMPLATE_PATHS) {
      const base = `data/templates/${t.folder}`;
      const [html, css] = await Promise.all([
        fetch(`${base}/${t.html}`).then(res => res.text()),
        fetch(`${base}/${t.css}`).then(res => res.text())
      ]);
      templates.push({ html, css, folder: t.folder });
    }
  } catch (err) {
    console.error("Error loading templates:", err);
    document.getElementById("gallery").innerHTML =
      `<div class="loading text-danger">⚠ Could not load templates.</div>`;
  }
}

// Render gallery for current person
function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  if (!currentPerson) {
    gallery.innerHTML = `<div class="loading">No person selected.</div>`;
    return;
  }

  if (templates.length === 0) {
    gallery.innerHTML = `<div class="loading">No templates available.</div>`;
    return;
  }

  templates.forEach((template, idx) => {
    const card = document.createElement("div");
    card.className = "signature-card";
    card.innerHTML = `
      <div class="preview p-2 border rounded">
        ${renderTemplate(template.html, currentPerson)}
        <style>${template.css}</style>
      </div>
      <small>Template ${idx + 1} (${template.folder})</small>
    `;
    gallery.appendChild(card);
  });
}

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
  await loadPeople();
  await loadTemplates();
  renderGallery();

  // Person dropdown change
  document.getElementById("person-select").addEventListener("change", e => {
    const id = e.target.value;
    currentPerson = people.find(p => p.id === id);
    renderGallery();
  });

  // Add Person button -> modal
  document.getElementById("add-person").addEventListener("click", () => {
    document.getElementById("person-modal").style.display = "flex";
  });

  // Save new person
  document.getElementById("save-person").addEventListener("click", () => {
    const newPerson = {
      id: Date.now().toString(),
      name: document.getElementById("person-name").value,
      title: document.getElementById("person-title").value,
      group: document.getElementById("person-group").value,
      company: document.getElementById("person-company").value,
      awards: document.getElementById("person-awards").value.split(",").map(a => a.trim()),
      mobile: document.getElementById("person-mobile").value,
      office: document.getElementById("person-office").value,
      address: document.getElementById("person-address").value,
      license: document.getElementById("person-license").value
    };

    people.push(newPerson);

    const select = document.getElementById("person-select");
    const option = document.createElement("option");
    option.value = newPerson.id;
    option.textContent = newPerson.name;
    select.appendChild(option);

    currentPerson = newPerson;
    select.value = newPerson.id;

    renderGallery();
    document.getElementById("person-modal").style.display = "none";
  });

  // Add Template button -> modal
  document.getElementById("add-template").addEventListener("click", () => {
    document.getElementById("template-modal").style.display = "flex";
  });

  // Save new template
  document.getElementById("save-template").addEventListener("click", () => {
    const html = document.getElementById("template-html").value;
    const css = document.getElementById("template-css").value;

    if (html.trim() && css.trim()) {
      templates.push({ html, css, folder: "custom" });
      renderGallery();
    }

    document.getElementById("template-modal").style.display = "none";
  });
});
