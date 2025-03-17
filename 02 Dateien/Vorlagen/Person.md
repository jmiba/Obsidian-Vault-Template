---
type: person
name: <% tp.file.title.split(/\s\S*$/)[0]%>
surname: <% tp.file.title.split(" ").pop()%>
ORCID: 
aliases: 
affiliation: 
topics: 
tags:
  - Person
birthday: 
e-mails:
  - <% tp.system.clipboard() %>
phone: 
links: 
created: <% tp.file.creation_date("YYYY-MM-DDTHH:mm:ss") %>
---
# <% tp.file.title %>



# [[Invertierter Index]] für „<% tp.file.title %>“

```dataview
list from [[]] and !outgoing([[]])
sort file.mtime desc
```
