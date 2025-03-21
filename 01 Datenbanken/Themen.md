---
topics: []
tags:
  - obsidian
  - datenanalyse
aliases: 
lang:
  - de
created: 2023-12-23, 12:43:27
related:
---

# Alle Themen mit zugehörigen Notizen

```dataviewjs
const vault = this.app.vault;
const files = ["02 Dateien/Javascript/topics.json","01 Datenbanken/topics.md"]; //Ausgabedateien definieren  

const topics = dv.pages('"Notizensammlung/Themen"').sort(page => page.file.name, "asc"); //.where(file => file.description);
const jsonOutput = topics.map(topic => ({
    topic: `[[${topic.file.name}]]`,
    aliases: topic.aliases || [],
    tags: topic.tags || [],
    description: topic.description || "",
    related: (topic.related || []).map(rel => dv.page(rel.path)?.file.name) // Linktext extrahieren
}));
// Ausgabe im JSON-Format anzeigen
const output = JSON.stringify(jsonOutput.values, null, 2);
// Ausgabe in Markdown
const markdownOutput = topics.map(topic => `${topic.file.name}`).join('; ');
//console.log(markdownOutput)

for (let file of files) {
let abstractFile = vault.getAbstractFileByPath(file);
//console.log(file)
if (abstractFile) {
  if (file.endsWith('.json')) {
    await vault.modify(abstractFile, output);
  } else if (file.endsWith('.md')) {
    await vault.modify(abstractFile, markdownOutput);
  }
} else {
  //console.error(`File not found: ${file}`);
}; }// Ausgabedateien schreiben

```

```dataview 
TABLE WITHOUT ID topics AS Thema, rows.file.link AS Notizen
WHERE topics AND !contains(file.folder, "02 Dateien/Vorlagen")
FLATTEN topics
GROUP BY topics
SORT topics ASC
```
