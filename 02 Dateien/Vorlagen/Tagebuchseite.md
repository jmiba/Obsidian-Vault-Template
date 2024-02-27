---
tags: 
aliases: 
lang: de-DE
created: <% tp.file.creation_date("YYYY-MM-DD, HH:mm:ss") %>
number headings: first-level 1, start-at 1 , max 3, auto, contents ^toc
parent: "[[<% tp.date.weekday('YYYY, [W]ww (DD.MM.)', 0, tp.file.title, 'YYYY-MM-DD') %>]]"
related:
---
# 1 Zitat des Tages

<% tp.web.daily_quote() %>

# 2 Mein Tag
```dataviewjs 
const tasks = await dv.query(` 
TASK 
WHERE !completed
WHERE fällig = "{{title}}"
`) 
if ( tasks.successful == true ) { 
	if ( tasks.value.values.length > 0 ) { 
			dv.header(3, "Heute fällig:") 
			dv.taskList(tasks.value.values, false) 
			} else 
				dv.paragraph("Heute keine Aufgaben mehr.")
	} else 
		dv.paragraph("~~~~\n" + tasks.error + "\n~~~~") 
```
→ s. [[Aufgabenerfüllung]]

# 3 Themen heute `BUTTON[makeNote]`
```dataviewjs 
const topics = await dv.query(` 
LIST 
WHERE file.frontmatter.parent = "[[<% tp.file.title %>]]"
sort file.frontmatter.parent asc
`) 
if ( topics.successful == true ) { 
	if ( topics.value.values.length > 0 ) { 
			dv.list(topics.value.values, false) 
			} else 
				dv.paragraph("Heute keine Themen.")
	} else 
		dv.paragraph("~~~~\n" + tasks.error + "\n~~~~") 
```
```meta-bind-button
style: primary
label: Neue untergeordnete Notiz erstellen
id: makeNote
hidden: true
class: float-right
actions:
  - type: templaterCreateNote
    templateFile: 02 Dateien/Vorlagen/Kindvorlage.md
    folderPath: Notizensammlung
    fileName: defaultName
    openNote: true
  - type: updateMetadata
    bindTarget: Notizensammlung/defaultName#parent
    evaluate: false
    value: "[[<% tp.file.title %>]]"
```
# 4 Neue Aufgaben


# 5 Fortbildung
Fortbildung::
Thema::

→ s. [[Fortbildung]]

# 6 Beratung
Beratung:: 
Beratungsthema:: 

→ s. [[Beratung]]

# 7 Sport
Sport:: 
Übung:: 
Reps:: 
Übung:: 
Reps:: 
Distanz:: 
Zeit:: 
Kalorien:: 
Anstieg: 
Herzfrequenz:: 
HerzfrequenzMax:: 
VO2max:: 
Link:: 

→ s. [[Sport]]