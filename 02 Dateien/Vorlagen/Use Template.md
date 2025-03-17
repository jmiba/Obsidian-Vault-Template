<%* if (!tp.file.content) {
let filetype = await tp.system.suggester(["Wissenschaftlicher Artikel", "Allgemeine Notiz", "Konzept", "Thema", "Person"], ["Wissenschaftlicher Artikel", "Allgemeine Notiz", "Konzept", "Thema", "Person"], false, "Welche Vorlage wollen Sie benutzen?") %>
<%-* if (filetype === "Wissenschaftlicher Artikel") { %> 
<%- tp.file.include("[[Wissenschaftlicher Artikel]]") %> <% tp.file.move("Notizensammlung/" + tp.file.title) %>
<%-* } else if (filetype === "Allgemeine Notiz") { %>
<%- tp.file.include("[[General Note]]") %> <% tp.file.move("Notizensammlung/" + tp.file.title) %>
<%-* } else if (filetype === "Konzept") { %>
<%- tp.file.include("[[Concept Note]]") %> <% tp.file.move("06 Konzepte/" + tp.file.title) %>
<%-* } else if (filetype === "Thema") { %>
<%- tp.file.include("[[Topic]]") %><% tp.file.move("Notizensammlung/Themen/" + tp.file.title) %>
<%-* } else if (filetype === "Person") { %>
<%- tp.file.include("[[Person]]") %><% tp.file.move("03 Personen/" + tp.file.title) %>
<%-* } else { %>
<% tp.file.cursor(1) %>
<%* };
} else {
alert("Not empty!");
}-%>