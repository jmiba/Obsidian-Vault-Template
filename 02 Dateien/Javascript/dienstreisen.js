let year = input;
const myformat = new Intl.NumberFormat('de', { 
    minimumFractionDigits: 2
});
dv.header(1, "Dienstreisen " + year);
dv.table(["Datum", "Dienstreise", "Abgerechnet", "Ticketpreis"], dv.pages()
    .where(d => d.file.name.includes(year))
    .where(b => b.Ticket)
    .sort(b => b.file.link)
    .map(b => [
        b.file.link,
        b.Zweck,
		b.Abgerechnet==true? "ja": "nein",
        dv.span(
            Array.isArray(b.Ticket)? b.Ticket.map(ticketValue => myformat.format(ticketValue) + " €"): myformat.format(b.Ticket) + " €", // Formatting multiple or single Ticket values
            { attr: { class: "number-right" } }
        )
    ])
);
const total = DataviewAPI
    .pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item.hasOwnProperty('Ticket')) // Filtering items with 'Ticket'
    .values
    .reduce((sum, item) => {
        if (Array.isArray(item.Ticket)) {
            // Handling the case where 'Ticket' is an array
            return sum + item.Ticket.reduce((subSum, ticketValue) => subSum + ticketValue, 0);
        } else if (typeof item.Ticket === 'number') {
            // Handling the case where 'Ticket' is a single value
            return sum + item.Ticket;
        }
        return sum; // If 'Ticket' is neither an array nor a number, return the current sum
    }, 0);
dv.paragraph("<hr>");
dv.span('Gesamtpreis Tickets:', { attr: { style: "font-weight:bold" } });
dv.span(`${myformat.format(Math.round(total*100)/100)} €`, { attr: { style: "float:right;padding-right:8px" } })
const bc =
  DataviewAPI
    .pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item
      .hasOwnProperty('Bahncard'))
    .values
    .reduce((sum, item) => sum + item.Bahncard, 0);
const bcFile = dv.pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item
    .hasOwnProperty('Bahncard'))
    .file.link[0]
    

dv.span(`<br>Preis Bahncard vom ${bcFile}:`, { attr: { style: "font-weight:bold;" } });
dv.span(`-${myformat.format(Math.round(bc*100)/100)} €`, { attr: { style: "float:right;padding-bottom:5px;border-bottom:solid 1px;;padding-right:8px" } })

dv.span('<br><br>Ersparnis:', { attr: { style: "font-weight:bold" } });
const saving = Math.round((total-bc)*100)/100;
if (saving >= 0) {
dv.span(`${myformat.format(saving)} €`, { attr: { style: "float:right;padding:0 8px 5px 8px;border-bottom: double 4px; color:green; border-color:var(--text-normal);" } })
} else {
dv.span(`${myformat.format(saving)} €`, { attr: { style: "float:right;padding:0 8px 5px 8px;border-bottom: double 4px;  color:red; border-color:var(--text-normal);" } })
};