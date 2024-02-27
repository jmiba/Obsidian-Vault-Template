---
topics:
  - Statistik
tags:
  - obsidian
  - datenanalyse
aliases: 
lang:
  - de
created: 2023-12-23, 12:43:27
related:
  - "[[Themen-DB]]"
---

# Alle Themen mit zugehörigen Notizen

```dataview 
TABLE WITHOUT ID topics AS Thema, rows.file.link AS Notizen
WHERE topics
FLATTEN topics
GROUP BY topics
SORT topics ASC
```
