// helpers.js
// Normalizes a person JSON into template-ready flat keys
function normalizePerson(person) {
  return {
    id: person.id,
    name: person.name,
    title: person.title,
    company: person.company,
    group: person.group || "",
    // Flatten contact info
    mobile: person.contact?.mobile || "",
    office: person.contact?.office || "",
    email: person.contact?.email || "",
    address: person.contact?.address || "",
    license: person.contact?.license || "",
    // Awards list (rendered as <li>)
    awards: (person.awards || [])
      .map(a => `<li><span class="fa fa-trophy"></span> ${a}</li>`)
      .join(""),
    // Signature fields
    signature: person.signature?.html || "",
    signatureCss: person.signature?.css || "",
  };
}
