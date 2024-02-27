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
	.where(b => b.Fortbildung) .sort(b => b.file.link) .map(b => [b.file.link, b.Thema, dv.span(msToTime(moment.duration(b.Fortbildung)+0), { attr: { style: "float:right" } })]))

const total =
  DataviewAPI
    .pages()
    .where(d => d.file.name.includes(year))
    .filter(item => item
      .hasOwnProperty('Fortbildung'))
    .values
    .reduce((sum, item) => sum + moment.duration(item.Fortbildung), 0);
dv.paragraph("<hr>");
dv.span(`Gesamtdauer Fortbildung ${year}:`, { attr: { style: "font-weight:bold" } });
dv.span(`${msToTime(total)}`, { attr: { style: "float:right;padding:0 8px 5px 8px;border-bottom: double 4px;" } })