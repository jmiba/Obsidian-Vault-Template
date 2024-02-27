Dieses Template wird von ZotLit nicht ausgelagert, sondern muss in den Einstellungen geändert werden.

Meine Anpassung:

<%=  it.shortTitle ?  it.shortTitle+" ("+it.date+")" :  it.title ?it.title+" ("+it.date+")" : it.citekey ?? it.DOI ?? it.key %>.md