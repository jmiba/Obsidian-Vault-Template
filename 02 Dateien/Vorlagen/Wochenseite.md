---
tags:
aliases:
  - Woche {{monday:DD.MM.YY}} – {{sunday:DD.MM.YY}}
lang: de-DE
created: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
number headings: first-level 1, start-at 1 , max 3, auto, contents ^toc
children:
  - "[[{{monday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{tuesday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{wednesday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{thursday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{friday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{saturday: YYYY-MM-DD, dd ([W]ww)}}]]"
  - "[[{{sunday: YYYY-MM-DD, dd ([W]ww)}}]]"
related:
---
# 1 Meine Woche
```dataviewjs 
const tasks = await dv.query(` 
TASK 
WHERE fällig >= "{{monday: YYYY-MM-DD, dd ([W]ww)}}"
where fällig <= "{{sunday: YYYY-MM-DD, dd ([W]ww)}}"
`) 
if ( tasks.successful == true ) { 
	if ( tasks.value.values.length > 0 ) { 
			dv.header(3, "Aufgaben diese Woche:") 
			dv.taskList(tasks.value.values, false) 
			} 
	} else 
		dv.paragraph("~~~~\n" + tasks.error + "\n~~~~") 
```

# 2 Thema X
