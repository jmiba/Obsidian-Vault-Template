---
topics:
  - "[[Wissensmanagement]]"
tags:
  - Literaturverwaltung
  - Second_Brain
aliases: 
lang: de-DE
created: 2024-02-28T15:41:29
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

# Zotero anbinden

## Lösung 1: ZotLit

Zunächst muss auch für Zotero ein Plugin installiert werden. Sie finden es auf der ZotLit-Dokumentationsseite: https://zotlit.aidenlx.top/getting-started/install/zotero.

Außerdem ist das Zotero-Plugin Better BibTex notwendig: https://retorque.re/zotero-better-bibtex/

# Obsidian

Im Beispiel-Vault ist das Obsidian-Plugin ZotLIt bereits installiert. Sie müssen es u.U. noch einrichten - und zwar dann, wenn Ihre Zotero-Datenbank nicht am standardmäßig dafür vorgesehenen Platz gespeichert ist:
![[Pasted image 20240228154843.png]]


## Lösung 2: Zotero Research Assistant

[Zotero Research Assistant](https://community.obsidian.md/plugins/zotero-redisearch-rag) verbindet Zotero und Obsidian, sodass du Fragen über deine gesamte PDF-Bibliothek hinweg stellen kannst, ohne deinen Vault zu verlassen. Das Plugin importiert ausgewählte Zotero-Einträge, extrahiert den Text mit Docling (bei Bedarf unter Verwendung von OCR), zerlegt die Inhalte in Chunks und indexiert diese in Redis Stack. Wenn du eine Frage stellst, ruft es die relevantesten Chunks ab und liefert eine Antwort mit Quellenangaben, die direkt zur entsprechenden Stelle in deiner Notiz oder PDF springen.

Die erstellten Notizen sind normale Obsidian-Notizen, die du bearbeiten kannst. Synchronisationsmarkierungen und Chunk-Badges halten den Index mit deinen Änderungen konsistent, und Änderungen führen nur zur Neuindexierung der betroffenen Chunks, anstatt das gesamte Dokument erneut zu verarbeiten. Dadurch bleibt der Workflow schnell, lokal-first und transparent.

![[Pasted image 20260523163136.png]]

Installations-Anleitung hier: https://jmiba.github.io/zotero-redisearch-rag/

- [ ] Alternative zur Anbindung von Zotero ausprobieren: Zotero Research Assistant (https://community.obsidian.md/plugins/zotero-redisearch-rag) [fällig:: 2024-02-28, Mi (W09)]
