---
topics:
  - "[[Künstliche Intelligenz]]"
tags:
  - Technologie/KI
  - Werkzeuge
  - Obsidian
  - Plug-in
aliases: 
lang: de-DE
created: 2024-02-26T18:25:04
type: topical
status: new
source: 
links: 
action: false
parent: "[[2024-02-28, Mi (W09)]]"
related:
---


```dataviewjs
await dv.view("02 Dateien/Javascript/related_list")
```

# Smart Connections

"Smart Connections" berechnet für Ihre Notizen im Vault Ähnlichkeitsvektoren und zeigt Ihnen KI-gestützt, welche Notizen mit welchen zusammenhängen: 
https://github.com/brianpetro/obsidian-smart-connections

Darüber hinaus ermöglicht SmartConnections die sprachunabhängige, semantische Suche nach Konzepten in Ihrem Vault.

Schauen Sie sich den „Getting Started Guide“ von SmartConnections an:

```meta-bind-button
label: Getting Started
icon: ""
style: primary
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: ""
hidden: false
actions:
  - type: command
    command: smart-connections:show-getting-started

```

# API-Key

Das Plugin „Smart Connections“ nutzt standardmäßig ein lokales Embedding-Modell. Das hat den Vorteil, dass Ihre Daten auf Ihrem lokalen Rechner bleiben und nicht an einen Webservice übertragen werden.  

Gute Ergebnisse können aber durchaus auch mit Embeddingmodellen von OpenAI erziel werden. Um sie zu nutzen, müssen Sie sich bei [OpenAI](https://www.openai.com) ein Konto anlegen und einen API Key erstellen:
![[Pasted image 20240226183307.png]]

Dieser Key muss dann in den Einstellungen des Obsidian-Plugins eingetragen werden:
![[Pasted image 20240228172739.png]]


