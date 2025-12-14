---
id: feb62136-f16d-4d6c-94e1-d0e15a84630f
title: |
  Obsidian Linter
topics: 
aliases: 
tags:
  - Obsidian
  - Plug-in
created: 2024-01-14 21:12:00
URL: https://github.com/platers/obsidian-linter
Omnivore-URL: https://omnivore.app/me/platers-obsidian-linter-an-obsidian-plugin-that-formats-and-styl-18d099a3f13
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
Noch kein Thema in Frontmatter `topics` definiert!
%% END A %%

# Obsidian Linter

> [!info] Info
> 
> An Obsidian plugin that formats and styles your notes with a focus on configurability and extensibility. - platers/obsidian-linter: An Obsidian plugin that formats and styles your notes with a focu...


## Inhalt

## Obsidian Linter

[![Build](https://proxy-prod.omnivore-image-cache.app/0x0,sk8DIuYXJC9i1vcVN6sF-r_vJxvFE92zckzCFdw8wjYw/https://github.com/platers/obsidian-linter/actions/workflows/main.yml/badge.svg)](https://github.com/platers/obsidian-linter/actions/workflows/main.yml/badge.svg) [![Downloads](https://proxy-prod.omnivore-image-cache.app/0x0,sVDsSVLm8_0ptmXhVDzQdiC6zXdvNxqYjY6A6ub3KOns/https://camo.githubusercontent.com/24b871dab2ea854b7e0e83815a092e0e66dc6117b89df067ca2c4199ed631187/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f706c61746572732f6f6273696469616e2d6c696e7465722f746f74616c)](https://camo.githubusercontent.com/24b871dab2ea854b7e0e83815a092e0e66dc6117b89df067ca2c4199ed631187/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f706c61746572732f6f6273696469616e2d6c696e7465722f746f74616c)

This Obsidian plugin formats and styles your notes with a focus on configurability and extensibility. Rules can be toggled and configured in the settings. The main documentation on rules and other things are located on the [wiki](https://platers.github.io/obsidian-linter/). Below is a quick run down of some reference links to the rules that exist and how to install the Linter.

[![Demo](https://proxy-prod.omnivore-image-cache.app/0x0,siC_xO0ddASGbONG0WF7jdfPGlaiQQtNAWiSptBz1Te4/https://github.com/platers/obsidian-linter/raw/master/docs/docs/assets/demo.gif)](https://github.com/platers/obsidian-linter/blob/master/docs/docs/assets/demo.gif) 

## Rules

Documentation for all rules can be found on the [wiki](https://platers.github.io/obsidian-linter/). The docs are updated before the plugin is released, so they may not be completely accurate.

Each rule is its own set of logic and is designed to be run independently. This means that enabling certain rules together could cause undesired results. One such case would be using "Paragraph blank lines" with "Two Spaces Between Lines with Content". These two rules have some overlap in what they target to change which results in undesired or unexpected results since together they work differently than if they were run by themselves.

### YAML rules

* [add-blank-line-after-yaml](https://platers.github.io/obsidian-linter/settings/yaml-rules/#add-blank-line-after-yaml)
* [escape-yaml-special-characters](https://platers.github.io/obsidian-linter/settings/yaml-rules/#escape-yaml-special-characters)
* [force-yaml-escape](https://platers.github.io/obsidian-linter/settings/yaml-rules/#force-yaml-escape)
* [format-tags-in-yaml](https://platers.github.io/obsidian-linter/settings/yaml-rules/#format-tags-in-yaml)
* [format-yaml-array](https://platers.github.io/obsidian-linter/settings/yaml-rules/#format-yaml-array)
* [insert-yaml-attributes](https://platers.github.io/obsidian-linter/settings/yaml-rules/#insert-yaml-attributes)
* [move-tags-to-yaml](https://platers.github.io/obsidian-linter/settings/yaml-rules/#move-tags-to-yaml)
* [remove-yaml-keys](https://platers.github.io/obsidian-linter/settings/yaml-rules/#remove-yaml-keys)
* [yaml-key-sort](https://platers.github.io/obsidian-linter/settings/yaml-rules/#yaml-key-sort)
* [yaml-timestamp](https://platers.github.io/obsidian-linter/settings/yaml-rules/#yaml-timestamp)
* [yaml-title](https://platers.github.io/obsidian-linter/settings/yaml-rules/#yaml-title)
* [yaml-title-alias](https://platers.github.io/obsidian-linter/settings/yaml-rules/#yaml-title-alias)

### Heading rules

* [capitalize-headings](https://platers.github.io/obsidian-linter/settings/heading-rules/#capitalize-headings)
* [file-name-heading](https://platers.github.io/obsidian-linter/settings/heading-rules/#file-name-heading)
* [header-increment](https://platers.github.io/obsidian-linter/settings/heading-rules/#header-increment)
* [headings-start-line](https://platers.github.io/obsidian-linter/settings/heading-rules/#headings-start-line)
* [remove-trailing-punctuation-in-heading](https://platers.github.io/obsidian-linter/settings/heading-rules/#remove-trailing-punctuation-in-heading)

### Footnote rules

* [footnote-after-punctuation](https://platers.github.io/obsidian-linter/settings/footnote-rules/#footnote-after-punctuation)
* [move-footnotes-to-the-bottom](https://platers.github.io/obsidian-linter/settings/footnote-rules/#move-footnotes-to-the-bottom)
* [re-index-footnotes](https://platers.github.io/obsidian-linter/settings/footnote-rules/#re-index-footnotes)

### Content rules

* [auto-correct-common-misspellings](https://platers.github.io/obsidian-linter/settings/content-rules/#auto-correct-common-misspellings)
* [blockquote-style](https://platers.github.io/obsidian-linter/settings/content-rules/#blockquote-style)
* [convert-bullet-list-markers](https://platers.github.io/obsidian-linter/settings/content-rules/#convert-bullet-list-markers)
* [default-language-for-code-fences](https://platers.github.io/obsidian-linter/settings/content-rules/#default-language-for-code-fences)
* [emphasis-style](https://platers.github.io/obsidian-linter/settings/content-rules/#emphasis-style)
* [no-bare-urls](https://platers.github.io/obsidian-linter/settings/content-rules/#no-bare-urls)
* [ordered-list-style](https://platers.github.io/obsidian-linter/settings/content-rules/#ordered-list-style)
* [proper-ellipsis](https://platers.github.io/obsidian-linter/settings/content-rules/#proper-ellipsis)
* [quote-style](https://platers.github.io/obsidian-linter/settings/content-rules/#quote-style)
* [remove-consecutive-list-markers](https://platers.github.io/obsidian-linter/settings/content-rules/#remove-consecutive-list-markers)
* [remove-empty-list-markers](https://platers.github.io/obsidian-linter/settings/content-rules/#remove-empty-list-markers)
* [remove-hyphenated-line-breaks](https://platers.github.io/obsidian-linter/settings/content-rules/#remove-hyphenated-line-breaks)
* [remove-multiple-spaces](https://platers.github.io/obsidian-linter/settings/content-rules/#remove-multiple-spaces)
* [strong-style](https://platers.github.io/obsidian-linter/settings/content-rules/#strong-style)
* [two-spaces-between-lines-with-content](https://platers.github.io/obsidian-linter/settings/content-rules/#two-spaces-between-lines-with-content)
* [unordered-list-style](https://platers.github.io/obsidian-linter/settings/content-rules/#unordered-list-style)

### Spacing rules

* [compact-yaml](https://platers.github.io/obsidian-linter/settings/spacing-rules/#compact-yaml)
* [consecutive-blank-lines](https://platers.github.io/obsidian-linter/settings/spacing-rules/#consecutive-blank-lines)
* [convert-spaces-to-tabs](https://platers.github.io/obsidian-linter/settings/spacing-rules/#convert-spaces-to-tabs)
* [empty-line-around-blockquotes](https://platers.github.io/obsidian-linter/settings/spacing-rules/#empty-line-around-blockquotes)
* [empty-line-around-code-fences](https://platers.github.io/obsidian-linter/settings/spacing-rules/#empty-line-around-code-fences)
* [empty-line-around-math-blocks](https://platers.github.io/obsidian-linter/settings/spacing-rules/#empty-line-around-math-blocks)
* [empty-line-around-tables](https://platers.github.io/obsidian-linter/settings/spacing-rules/#empty-line-around-tables)
* [heading-blank-lines](https://platers.github.io/obsidian-linter/settings/spacing-rules/#heading-blank-lines)
* [line-break-at-document-end](https://platers.github.io/obsidian-linter/settings/spacing-rules/#line-break-at-document-end)
* [move-math-block-indicators-to-their-own-line](https://platers.github.io/obsidian-linter/settings/spacing-rules/#move-math-block-indicators-to-their-own-line)
* [paragraph-blank-lines](https://platers.github.io/obsidian-linter/settings/spacing-rules/#paragraph-blank-lines)
* [remove-empty-lines-between-list-markers-and-checklists](https://platers.github.io/obsidian-linter/settings/spacing-rules/#remove-empty-lines-between-list-markers-and-checklists)
* [remove-link-spacing](https://platers.github.io/obsidian-linter/settings/spacing-rules/#remove-link-spacing)
* [remove-space-around-characters](https://platers.github.io/obsidian-linter/settings/spacing-rules/#remove-space-around-characters)
* [remove-space-before-or-after-characters](https://platers.github.io/obsidian-linter/settings/spacing-rules/#remove-space-before-or-after-characters)
* [space-after-list-markers](https://platers.github.io/obsidian-linter/settings/spacing-rules/#space-after-list-markers)
* [space-between-chinese-japanese-or-korean-and-english-or-numbers](https://platers.github.io/obsidian-linter/settings/spacing-rules/#space-between-chinese-japanese-or-korean-and-english-or-numbers)
* [trailing-spaces](https://platers.github.io/obsidian-linter/settings/spacing-rules/#trailing-spaces)

### Paste rules

* [add-blockquote-indentation-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#add-blockquote-indentation-on-paste)
* [prevent-double-checklist-indicator-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#prevent-double-checklist-indicator-on-paste)
* [prevent-double-list-item-indicator-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#prevent-double-list-item-indicator-on-paste)
* [proper-ellipsis-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#proper-ellipsis-on-paste)
* [remove-hyphens-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#remove-hyphens-on-paste)
* [remove-leading-or-trailing-whitespace-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#remove-leading-or-trailing-whitespace-on-paste)
* [remove-leftover-footnotes-from-quote-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#remove-leftover-footnotes-from-quote-on-paste)
* [remove-multiple-blank-lines-on-paste](https://platers.github.io/obsidian-linter/settings/paste-rules/#remove-multiple-blank-lines-on-paste)

## Installing

As of version [0.9.7 of Obsidian](https://forum.obsidian.md/t/obsidian-release-v0-9-7-insider-build/7628), this plugin is available to be installed directly from within the app. The plugin can be found in the Community Plugins directory which can be accessed from the Settings pane under Third Party Plugins. The plugin is called `Linter`.

### Manual installation

1. Download the [latest release](https://github.com/platers/obsidian-linter/releases/latest)
2. Extract the obsidian-linter folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`  
Note: On some machines the `.obsidian` folder may be hidden. On MacOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.
3. Reload Obsidian
4. If prompted about Safe Mode, you can disable safe mode and enable the plugin.

## How You Can Help

Contributions are welcome and appreciated. You can help in any of the following ways:

No repo setup required:

* [Reporting a bug](https://github.com/platers/obsidian-linter/issues/new?assignees=&labels=bug&template=bug%5Freport.md&title=Bug%3A+)
* [Requesting a feature](https://github.com/platers/obsidian-linter/issues/new?assignees=&labels=rule+suggestion&template=feature%5Frequest.md&title=FR%3A+)
* [Suggesting documentation](https://github.com/platers/obsidian-linter/issues/new?assignees=&labels=documentation&template=documentation%5Frequest.md&title=Doc%3A+)

Varying repo and development setup required:

* [Updating or adding documentation](https://platers.github.io/obsidian-linter/contributing/documentation/)
* [Translating the plugin into a new language](https://platers.github.io/obsidian-linter/contributing/translation/#adding-a-new-language-translation)
* [Fixing a bug](https://platers.github.io/obsidian-linter/contributing/bug-fix/)
* [Adding a new rule](https://platers.github.io/obsidian-linter/contributing/adding-a-rule/)