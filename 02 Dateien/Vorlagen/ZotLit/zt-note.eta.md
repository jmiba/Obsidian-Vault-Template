# <%= it.title %>
<%_ const creatorGroups = it.creators.reduce((acc, cur) => {
    const { creatorType: type, fullname } = cur;
    if (!acc[type]) {
        acc[type] = [];
    }
    acc[type].push(fullname);
    return acc;
}, {});

// Mapping object to rename classNames
const irregularPlurals = { 
editor: 'Herausgeber\\*in',
editors: 'Herausgeber\\*innen',
author: 'Autor\\*in', 
authors: 'Autor\\*innen',
contributor: 'Mitarbeiter\\*in',
contributors: 'Mitarbeiter\\*innen',
translator: 'Übersetzer\\*in',
translators: 'Übersetzer\\*innen',
seriesEditor: 'Reihenherausgeber\\*in',
seriesEditors: 'Reihenherausgeber\\*innen',// Add more mappings as needed 
};
const creatorGroupsMapping = {};
Object.keys(creatorGroups).forEach(className => {
    const elementsCount = creatorGroups[className].length;

    if (elementsCount > 1) {
        creatorGroupsMapping[className] = `${className}s`; // Plural form
    } else {
        creatorGroupsMapping[className] = className; // Singular form
    }
});

for (const className in creatorGroups) {
    if (Object.hasOwnProperty.call(creatorGroups, className)) {
        const newName = irregularPlurals[creatorGroupsMapping[className]] || className;
        const values = creatorGroups[className].join(', ');%>
<%=`${values} (${newName})` -%>
<%; } 
}
%>

- [Eintrag in Zotero öffnen](<%= it.backlink %>) 

<% if ( it.abstractNote) { -%> 
## Abstract
<%= it.abstractNote -%>
<% } %>
<%~ include("annots", it.annotations) %>