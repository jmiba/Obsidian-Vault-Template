```dataview 
TABLE WITHOUT ID file.link AS "Datei", dateformat(file.mtime, "dd.MM.yyyy HH:mm") AS "Datum"
FROM ""
SORT file.mtime desc
LIMIT 100
```
