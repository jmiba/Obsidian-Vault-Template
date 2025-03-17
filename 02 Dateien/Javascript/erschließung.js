let year = parseInt(dv.current().year);
let type = input;

dv.header(6, `# ${type.charAt(0).toUpperCase() + type.slice(1)}en ${year}`);
dv.table(["Datum", "Anzahl"], dv.pages()
	.where(d => d.file.name.includes(year)) 
	.where(b => b[type]) .sort(b => b.file.link) .map(b => [b.file.link, dv.span(b[type], { attr: { style: "float:right" } })]))

const total =
  DataviewAPI
    .pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item
      .hasOwnProperty(type))
    .values
    .reduce((sum, item) => sum + item[type], 0);
dv.paragraph("<hr>");
dv.span(`Gesamtzahl ${type}en:`, { attr: { style: "font-weight:bold" } });
dv.span(`${total}`, { attr: { style: "float:right;padding:0 8px 5px 8px;border-bottom: double 4px;" } })