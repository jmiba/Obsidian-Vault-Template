---
id: 9c41dcf7-9af7-43cf-9a9f-eb3b65a65039
title: |
  Obsidian Omnisearch
topics: 
aliases: 
tags:
  - Obsidian
  - Plug-in
created: 2024-01-14 20:53:42
URL: https://github.com/scambier/obsidian-omnisearch
Omnivore-URL: https://omnivore.app/me/scambier-obsidian-omnisearch-a-search-engine-that-just-works-for-18d09897f7c
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%%% END A %%

# Obsidian Omnisearch

> [!info] Info
> 
> A search engine that &quot;just works&quot; for Obsidian. Supports OCR and PDF indexing. - scambier/obsidian-omnisearch: A search engine that &quot;just works&quot; for Obsidian. Su...


## Inhalt

## Omnisearch for Obsidian

[![Sponsor me](https://proxy-prod.omnivore-image-cache.app/0x0,sjuJTs54OD0OzHb2qBovd2xvGAYTKnoVONwqLvdDaYEE/https://camo.githubusercontent.com/db4e614f85181dd28eb8b2760293a74a153a76aa922d8c4ec4206f708c9213ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2545322539442541342532304c696b6525323074686973253230706c7567696e2533462d53706f6e736f722532306d65212d666636396234)](https://github.com/sponsors/scambier)  
[![Obsidian plugin](https://proxy-prod.omnivore-image-cache.app/0x0,sMqy2dxunPdMx0MAPWA_xaCPcZfKoTcERqcxyI3AWMzA/https://camo.githubusercontent.com/f34f5ef666585c0b6e32be4724c92f2ded37ad583c244ea3db40b3830caac544/68747470733a2f2f696d672e736869656c64732e696f2f656e64706f696e743f75726c3d68747470732533412532462532467363616d626965722e78797a2532466f6273696469616e2d656e64706f696e74732532466f6d6e697365617263682e6a736f6e)](https://camo.githubusercontent.com/f34f5ef666585c0b6e32be4724c92f2ded37ad583c244ea3db40b3830caac544/68747470733a2f2f696d672e736869656c64732e696f2f656e64706f696e743f75726c3d68747470732533412532462532467363616d626965722e78797a2532466f6273696469616e2d656e64706f696e74732532466f6d6e697365617263682e6a736f6e) [![GitHub release (latest by date and asset)](https://proxy-prod.omnivore-image-cache.app/0x0,s0xWeVcyuIKxShqv3F2moPg7vx-_u6pvoQL1-n8HB_8I/https://camo.githubusercontent.com/7b154e11629b0a7732b79acf3c6c9f366c41cf5fbdd904df9fec9f8334c0b0f1/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f7363616d626965722f6f6273696469616e2d6f6d6e697365617263682f6c61746573742f6d61696e2e6a73)](https://camo.githubusercontent.com/7b154e11629b0a7732b79acf3c6c9f366c41cf5fbdd904df9fec9f8334c0b0f1/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f7363616d626965722f6f6273696469616e2d6f6d6e697365617263682f6c61746573742f6d61696e2e6a73)  
[![GitHub release (latest by date including pre-releases)](https://proxy-prod.omnivore-image-cache.app/0x0,sHKZwmSMpGR-VhSpwIMsV_YB7KoIhWP_7rNaxriPRQeg/https://camo.githubusercontent.com/8ff84e5a7760e354fc3c0c88a02ea69d8f38977db546235c5aba6187196cd61f/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f7363616d626965722f6f6273696469616e2d6f6d6e69736561726368)](https://camo.githubusercontent.com/8ff84e5a7760e354fc3c0c88a02ea69d8f38977db546235c5aba6187196cd61f/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f7363616d626965722f6f6273696469616e2d6f6d6e69736561726368) [![GitHub release (latest by date including pre-releases)](https://proxy-prod.omnivore-image-cache.app/0x0,su-Y8y5TfquRxV0LNXPv5oQGWZ_0VRGvZxPPNqtSHwQQ/https://camo.githubusercontent.com/6de13e4dc516e04a4c0bc0d022e6d0837cb28fd22ca53b2f70af070827a09730/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f7363616d626965722f6f6273696469616e2d6f6d6e697365617263683f696e636c7564655f70726572656c6561736573266c6162656c3d4252415425323062657461)](https://camo.githubusercontent.com/6de13e4dc516e04a4c0bc0d022e6d0837cb28fd22ca53b2f70af070827a09730/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f7363616d626965722f6f6273696469616e2d6f6d6e697365617263683f696e636c7564655f70726572656c6561736573266c6162656c3d4252415425323062657461)

> **Omnisearch** is a search engine that "_just works_". It always instantly shows you the most relevant results, thanks to its smart weighting algorithm.

Under the hood, it uses the excellent [MiniSearch](https://github.com/lucaong/minisearch) library.

[![](https://proxy-prod.omnivore-image-cache.app/0x0,sSGR_CrGIKW1sb1bW1mn40qL-vnJ9cdmy9G7Ebvkv6uw/https://raw.githubusercontent.com/scambier/obsidian-omnisearch/master/images/omnisearch.gif)](https://raw.githubusercontent.com/scambier/obsidian-omnisearch/master/images/omnisearch.gif) 

## Documentation

<https://publish.obsidian.md/omnisearch/Index>

## Installation

* Omnisearch is available on [the official Community Plugins repository](https://obsidian.md/plugins?search=Omnisearch).
* Beta releases can be installed through [BRAT](https://github.com/TfTHacker/obsidian42-brat). **Be advised that those versions can be buggy and break things.**

You can check the [CHANGELOG](https://github.com/scambier/obsidian-omnisearch/blob/master/CHANGELOG.md) for more information on the different versions.

## Features

> Omnisearch's first goal is to _locate_ files instantly. You can see it as a _Quick Switcher_ on steroids.

* Find your **📝notes, 📄PDFs, and 🖼images** faster than ever  
   * Images and PDF indexing is available through [Text Extractor](https://github.com/scambier/obsidian-text-extractor)
* Automatic document scoring using the [BM25 algorithm](https://github.com/lucaong/minisearch/issues/129#issuecomment-1046257399)  
   * The relevance of a document against a query depends on the number of times the query terms appear in the document, its filename, and its headings
* Keyboard first: you never have to use your mouse
* Workflow similar to the "Quick Switcher" core plugin
* Resistance to typos
* Switch between Vault and In-file search to quickly skim multiple results in a single note
* Supports `"expressions in quotes"` and `-exclusions`
* Filters file types with '.jpg' or '.md'
* Directly Insert a `[[link]]` from the search results
* Supports Vim navigation keys

**Note:** support of Chinese, Japanese, Korean, etc. depends on [this additional plugin](https://github.com/aidenlx/cm-chs-patch). Please read its documentation for more information.

## LICENSE

Omnisearch is licensed under [GPL-3](https://tldrlegal.com/license/gnu-general-public-license-v3-%28gpl-3%29).

## Thanks

To all people who donate through [Ko-Fi](https://ko-fi.com/scambier)or [Github Sponsors](https://github.com/sponsors/scambier) ❤

[![JetBrains Logo (Main) logo](https://proxy-prod.omnivore-image-cache.app/0x0,sBKJT-LwWa_f3WKZ-vqMdDDLI-HZn7geBs4t03gpBM8w/https://camo.githubusercontent.com/830c8bd550b48827eb78c6ce81a378aeed729d8db4a8bdd460ee500db7bda0d8/68747470733a2f2f7265736f75726365732e6a6574627261696e732e636f6d2f73746f726167652f70726f64756374732f636f6d70616e792f6272616e642f6c6f676f732f6a625f6265616d2e737667)](https://camo.githubusercontent.com/830c8bd550b48827eb78c6ce81a378aeed729d8db4a8bdd460ee500db7bda0d8/68747470733a2f2f7265736f75726365732e6a6574627261696e732e636f6d2f73746f726167652f70726f64756374732f636f6d70616e792f6272616e642f6c6f676f732f6a625f6265616d2e737667)