---
id: 5dd8b4ea-8536-4a71-af1e-6f7ae1f48649
title: |
  Obsidian AI Summary
topics: 
aliases: 
tags:
  - Technologie/KI
  - Obsidian
  - Plug-in
created: 2024-01-15 12:56:39
URL: https://github.com/irbull/obsidian-ai-summary
Omnivore-URL: https://omnivore.app/me/irbull-obsidian-ai-summary-an-obsidian-plugin-that-uses-chat-gpt-18d0cfb1c98
related: 
starred: true
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
Noch kein Thema in Frontmatter `topics` definiert!%% END A %%

# Obsidian AI Summary

> [!info] Info
> 
> An Obsidian plugin that uses ChatGPT to generate a summary of referenced notes - irbull/obsidian-ai-summary: An Obsidian plugin that uses ChatGPT to generate a summary of referenced notes


## Inhalt

## Obsidian AI Summary Plugin

[![](https://proxy-prod.omnivore-image-cache.app/96x0,sk9wRBJmfXcGEliel_iEDmzIEgiksbfiNrqPIqZnDupg/https://github.com/irbull/obsidian-ai-summary/raw/main/ai-summary.png)](https://github.com/irbull/obsidian-ai-summary/blob/main/ai-summary.png) 

A plugin for [Obsidian](https://obsidian.md/) that uses [OpenAI's GPT-3](https://openai.com/blog/openai-api/) to generate summaries of your notes. The plugin will look in the current note and find all the links to other notes. It will then generate a summary of each linked note and present it in a dialog. The plugin does not update your existing notes. It only generates a summary and presents it in a dialog. You can then copy the summary and paste it into your note.

The Prompt can be specified in the Front Matter of the note. If no prompt is specified, the plugin will use the default prompt specified in the settings.

This plugin is particularly useful for generating weekly (and monthly) summaries of your notes.

## 🚀 Installation & Setup

To use this plugin, you will need to have an OpenAI API key. You can get one from [OpenAI](https://beta.openai.com/). Once you have your key, you can enter it in the plugin settings. You can also specify a default prompt in the settings and maximum number of tokens to generate.

[![Settings](https://proxy-prod.omnivore-image-cache.app/0x0,suyQfe5GWrwzatI1-csdOP7j1XtyrsqY8VP8uKK_w-qg/https://github.com/irbull/obsidian-ai-summary/raw/main/images/settings.png)](https://github.com/irbull/obsidian-ai-summary/blob/main/images/settings.png)

Once installed and configured, open a note with links to other notes. Then select the `Summarize referenced notes` command from the command palette.

## 💪 Example Usage

The Obsidian AI Summary Plugin can be used to generate weekly summaries of your note. For example, if you create a weekly note called `2023-W01` with the following content:

---
Prompt: Write me a 2-3 paragraph summary of the work I completed this week in the first person. The work completed is below the '# 🚀 Work Completed' section.
---

# 🚀 What Did I Do This Week 2023/2023-W01

# 📅 Daily Notes

- [[2023-01-02]]
- [[2023-01-03]]
- [[2023-01-04]]
- [[2023-01-05]]
- [[2023-01-06]]

You can use the plugin to summarize those daily notes.

[![Settings](https://proxy-prod.omnivore-image-cache.app/0x0,sprL5ZAS-1B6NGv5MlSaFwVAVlnTrfJbGkwkrCMZXyGI/https://github.com/irbull/obsidian-ai-summary/raw/main/images/ai-dialog.png)](https://github.com/irbull/obsidian-ai-summary/blob/main/images/ai-dialog.png)