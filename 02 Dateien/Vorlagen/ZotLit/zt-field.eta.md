<%_ 
const tagArray = it.tags.filter(t => t.type === 0);
function replaceCharacters(str) {
    // Replace 'a' with 'o' in the string
    str = JSON.stringify(str).replace(/\./g, '');
    return str.toLowerCase().replace(/\s/g, '_');
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
created: <%= it.dateAdded %>