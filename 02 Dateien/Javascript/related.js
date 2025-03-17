const topics = dv.current().file.frontmatter.topics
const file = dv.current().file.name
//console.log(file)
if (topics != '') {
	for (const topic of topics) {
		dv.header(5, `Zum Thema "${topic}":`);
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
				dv.list(list)
			} else {
				dv.paragraph(`Noch keine Zusammenhänge für das Thema "${topic}"!`);
			}
		} else {
			dv.paragraph("Fehler beim Abfragen der Zusammenhänge für das Thema: " + topic);
		}
	}
} else {
	dv.paragraph("Noch kein Thema in Frontmatter `topics` definiert!" );
}
