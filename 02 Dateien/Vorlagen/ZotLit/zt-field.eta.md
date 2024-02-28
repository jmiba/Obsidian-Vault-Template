<%_ 
const tagArray = it.tags
//const tagArray = it.tags.filter(t => t.type === 0); //only manual tags
function replaceCharacters(str) {
    // Delete '.' in the string
    str = JSON.stringify(str).replace(/\./g, '');
    return str.replace(/\s/g, '_');
    // return str.toLowerCase().replace(/\s/g, '_'); //if you want lower-case tags
}
const oTags = tagArray.map(replaceCharacters);
%>
citekey: "<%= it.citekey %>"
title: "<%= it.title %>"
published: <%= it.date %>
creators: [<%= it.creators %>]
bibliographic type: "<%= it.itemType %>"
topics: [<%_ for (const coll of it.collections) { %><%= '"'+coll+'",' %><% } %>]
aliases: ["<%= it.title ?? it.shortTitle %>","<%= it.citekey %>"]
URL: "<%= it.url %>"
DOI: "<%= it.DOI %>"
tags: [<%= oTags %>]
created: <%= moment(it.dateAdded, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss") %>