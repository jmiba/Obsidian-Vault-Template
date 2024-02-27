## Augabensuche
```dataviewjs
let textSearch = '';
let compl = '';
try {
    // Update query with the initial value of textSearch
    textSearch = dv.el("input", "", {attr: 
		{"type":"search","placeholder": "Suche ...", "size": "25" }})
	textSearch.addEventListener('input', async (e) => run(e, textSearch.value, compl.checked))
	compl = dv.el("input", "", {attr: 
		{"type": "checkbox", "style": "margin-left: 10px"}})
	compl.addEventListener('input', async (e) => run(e, textSearch.value, compl.checked))
	// hidden element used as an anchor to clean up tables when re-rendering
	dv.span("", {cls: "refPoint"})
	dv.paragraph("")
} catch (error) {
    console.error(error);
    dv.paragraph("Error handling task filtering: " + error.toString());
}

async function run(wrapperNode, text, compl) {
	let result = document.querySelectorAll(".refPoint")[0].parentNode.lastChild
	result.remove()
	//let query = await dv.tryQueryMarkdown(`task where contains(text, "${text}")`);
	console.log(text)
	console.log(compl)
	let searchResults = compl? dv.pages().file.tasks.filter(t => t.completed && t.text.toLowerCase().includes(text.toLowerCase())) : dv.pages().file.tasks.filter(t => !t.completed && t.text.toLowerCase().includes(text.toLowerCase()));
	
	// Check if there are any results
	if (text.length > 2) {
		if (searchResults.length > 0) {
		    dv.taskList(searchResults,false);
		} else {
		    dv.paragraph("<font color='#de7802'>Keine Ergebnisse!</font>");
		}
	} else {
		dv.paragraph("<font color='#595959'>Mindestens 3 Zeichen eingeben!</font>");
	}
}

```

```dataviewjs 
const tasks = await dv.query(` 
TASK 
where !completed
WHERE fällig >= dateformat(date(sow),"yyyy-MM-dd, ccc ('W'WW)")
where fällig <= dateformat(date(eow),"yyyy-MM-dd, ccc ('W'WW)")
`) 
if ( tasks.successful == true ) { 
	if ( tasks.value.values.length > 0 ) { 
			dv.header(2, "Aufgaben diese Woche ") 
			dv.taskList(tasks.value.values, false) 
			} 
	} else 
		dv.paragraph("~~~~\n" + tasks.error + "\n~~~~") 
```

## Prioritäre Aufgaben
```dataview
task
where fällig <= dateformat(date(sow)+dur(200 days),"yyyy-MM-dd, ccc ('W'WW)")
where (status != "x" AND status != "-") and prio
sort file.ctime
group by join(list(prio, fällig), ": ") AS due
sort due asc
```

## Aufgaben ohne Priorität
```dataview
task
where fällig <= dateformat(date(sow)+dur(200 days),"yyyy-MM-dd, ccc ('W'WW)")
where (status != "x" AND status != "-" AND status != ">") and !prio
sort fällig asc
group by fällig
```

## Delegierte Aufgaben
```dataview
task
where fällig <= dateformat(date(sow)+dur(200 days),"yyyy-MM-dd, ccc ('W'WW)")
where (status = ">")
group by (fällig+": "+resp) AS resp-fällig

```

