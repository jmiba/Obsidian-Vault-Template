---
topics:
  - Statistik
tags:
  - statistik
  - fortbildung
aliases:
  - Statistik Fortbildung
lang: de-DE
created: 2023-11-13, 13:24:56
related:
  - "[[Beratung]]"
---

```dataviewjs
const topics = dv.current().file.frontmatter.topics
const file = dv.current().file.name
let toRender = '> ';
//console.log(file)
if (topics != '') {
	for (const topic of topics) {
		toRender += `##### Zum Thema "${topic}":\n\n`;
		const related = await dv.query(` 
			LIST created
			FLATTEN topics AS t
			WHERE t = "${topic}" AND file.name != "${file}"
			SORT created ASC
		`);
		if (related.successful === true) {
			if (related.value.values.length > 0) {
				//console.log(related.value.values)
				// Iterate through related files and display links with formatted creation date
				const list = []
                for (const item of related.value.values) {
                    const createdDate = moment(item.value).format('DD.MM.YYYY');
                    list.push(`${item.key} (${createdDate})`);
				}
				toRender += dv.markdownList(list)			
			} else {
				toRender = `Noch keine Zusammenhänge für das Thema "${topic}"!`;
			}
		} else {
			toRender = "Fehler beim Abfragen der Zusammenhänge für das Thema: " + topic;
		}
	}
} else {
	toRender ="Noch kein Thema in Frontmatter `topics` definiert!";
}
toRender = toRender.replace(/\n/g, '\n> ');
await dv.view("02 Dateien/Javascript/dv_insert", { target: "A", msg: toRender})
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
> ##### Zum Thema "Statistik":
> 
> - [[01 Datenbanken/Sport.md|Sport]] (26.04.2024)
> - [[01 Datenbanken/Dienstreisen.md|Dienstreisen]] (12.11.2023)
> - [[01 Datenbanken/Beratung.md|Beratung]] (13.11.2023)
> - [[01 Datenbanken/Themen.md|Themen]] (23.12.2023)
> %% END A %%

```dataviewjs
const year= 2024;
await dv.view("02 Dateien/Javascript/fortbildung", year)
```
