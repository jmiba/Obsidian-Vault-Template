---
PromptInfo:
 promptId: getTagsD
 name: 🏷️ Schlage Tags vor
 description: Tags für den markierten Tags im Markdown-Format
 author: jmiba
 tags: writing, learning
 version: 0.0.1
bodyParams:
 max_tokens: 35
---
content: 
{{context}}
prompt:
Schlage Tags für diesen Inhalt vor. Gib die Tags in der Singularform aus, beginnend mit einem Hash-Zeichen, Leerzeichen ersetze durch einen Unterstrich. Gib nur Tag mit einer Relevanz von 95 % aus.
tags:
