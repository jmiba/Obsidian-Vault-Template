let year = input;
function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        //, hours = parseInt((duration/(1000*60*60))%24)
        , hours = parseInt((duration/(1000*60*60)))
        //, days = parseInt((duration/(1000*60*60*24)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    //return (days == 0) ?  hours + ":" + minutes + " h" : days + " Tage und " + hours + ":" + minutes + "&nbsp;h";
    return hours + ":" + minutes + "&nbsp;h";
}
dv.header(6,"# Fortbildungszeit "+year);
dv.table(["Datum", "Thema", "Dauer"], dv.pages()
	.where(d => d.file.name.includes(year)) 
	.where(b => b.Fortbildung) .sort(b => b.file.link) .map(b => [b.file.link, b.Thema, dv.span(
	//msToTime(moment.duration(b.Fortbildung)+0)
		Array.isArray(b.Fortbildung)? b.Fortbildung.map(fValue => msToTime(moment.duration(fValue)+0)) : msToTime(moment.duration(b.Fortbildung)+0), 
		{ attr: { style: "float:right" } }
		)
	])
)

const total =
  DataviewAPI
    .pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item
      .hasOwnProperty('Fortbildung'))
    .values
    //.reduce((sum, item) => sum + moment.duration(item.Fortbildung), 0);
	.reduce((sum, item) => {
        if (Array.isArray(item.Fortbildung)) {
            // Handling the case where 'Fortbildung' is an array
			//alert(item.Fortbildung);
            return sum + item.Fortbildung.reduce((subSum, fValue) => subSum + moment.duration(fValue), 0);
        } else {
            // Handling the case where 'Ticket' is a single value
            return sum + moment.duration(item.Fortbildung);
        }
        return sum; // If 'Ticket' is neither an array nor a number, return the current sum
    }, 0);
dv.paragraph("<hr>");
dv.span(`Gesamtdauer Fortbildung ${year}:`, { attr: { style: "font-weight:bold" } });
dv.span(`${msToTime(total)}`, { attr: { style: "float:right;padding:0 8px 5px 8px;border-bottom: double 4px;" } })