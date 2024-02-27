---
id: 6edfa840-f1d8-40eb-b9e9-7ace041b0990
title: |
  This German nonprofit is building an open voice assistant that anyone can use | TechCrunch
author: |
  Kyle Wiggers
topics: 
aliases: 
tags:
  - Technologie/KI
  - Werkzeuge
  - Voice_Assistent
created: 2024-02-16 10:11:09
published: 2024-02-15 22:08:20
URL: https://techcrunch.com/2024/02/15/this-german-nonprofit-is-building-an-open-voice-assistant-that-anyone-can-use/?guccounter=1
Omnivore-URL: https://omnivore.app/me/this-german-nonprofit-is-building-an-open-voice-assistant-that-a-18db12f1523
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%%% END A %%

# This German nonprofit is building an open voice assistant that anyone can use | TechCrunch

> [!info] Info
> **Kyle Wiggers**
> 
> There have been many attempts at open source AI-powered voice assistants (see Rhasspy, Mycroft and Jasper, to name a few) &#8212; all established with the goal of creating privacy-preserving, offline experiences that don&#8217;t compromise on functionality. But development&#8217;s proven to be extraordinarily slow. That&#8217;s because, in addition to all the usual challenges attendant with open [&hellip;]


## Inhalt

![smart speakers graphic](https://proxy-prod.omnivore-image-cache.app/0x0,sDWM8MWtuhNmzP3gzH6_Od5oumKJOVmD1WVjB7qo1Gqc/https://techcrunch.com/wp-content/uploads/2017/10/voice-assistants.png?w=730&crop=1)

camera**Image Credits:** Bryce Durbin / TechCrunch

There have been many attempts at open source AI-powered voice assistants (see Rhasspy, Mycroft and Jasper, to name a few) — all established with the goal of creating privacy-preserving, offline experiences that don’t compromise on functionality. But development’s proven to be extraordinarily slow. That’s because, in addition to all the usual challenges attendant with open source projects, programming an assistant is _hard._ Tech like Google Assistant, Siri and Alexa have years, if not decades, of R&D behind them — and enormous infrastructure to boot.

But that’s not deterring the folks at Large-scale Artificial Intelligence Open Network (LAION), the German nonprofit responsible for maintaining some of the world’s most popular AI training data sets. This month, [LAION](https://laion.ai/) announced a new initiative, BUD-E, that seeks to build a “fully open” voice assistant capable of running on consumer hardware.

Why launch a whole new voice assistant project when there are countless others out there in various states of abandonment? Wieland Brendel, a fellow at the Ellis Institute and a contributor to BUD-E, believes there isn’t an open assistant with an architecture extensible enough to take full advantage of emerging GenAI technologies, particularly large language models (LLMs) along the lines of OpenAI’s [ChatGPT](https://techcrunch.com/tag/chatgpt/).

“Most interactions with \[assistants\] rely on chat interfaces that are rather cumbersome to interact with, \[and\] the dialogues with those systems feel stilted and unnatural,” Brendel told TechCrunch in an email interview. “Those systems are OK to convey commands to control your music or turn on the light, but they’re not a basis for long and engaging conversations. The goal of BUD-E is to provide the basis for a voice assistant that feels much more natural to humans and that mimics the natural speech patterns of human dialogues and remembers past conversations.”

Brendel added that LAION also wants to ensure that every component of BUD-E can eventually be integrated with apps and services license-free, even commercially — which isn’t necessarily the case for other open assistant efforts.

A collaboration with Ellis Institute in Tübingen, tech consultancy Collabora and the Tübingen AI Center, BUD-E — recursive shorthand for “Buddy for Understanding and Digital Empathy” — has an ambitious roadmap. In a [blog post](https://laion.ai/blog/bud-e/), the LAION team lays out what they hope to accomplish in the next few months, chiefly building “emotional intelligence” into BUD-E and ensuring it can handle conversations involving multiple speakers at once.

infoTo view this this content, you'll need to update your privacy settings.  
[Click here to do so.](https://techcrunch.mydashboard.oath.com/guc-redirect?app=thirdPartyContentEmbed)

“There’s a big need for a well-working natural voice assistant,” Brendel said. “LAION has shown in the past that it’s great at building communities, and the ELLIS Institute Tübingen and the Tübingen AI Center are committed to provide the resources to develop the assistant.”

BUD-E is up and running — you can [download](https://github.com/LAION-AI/natural%5Fvoice%5Fassistant) and install it today from GitHub on Ubuntu or Windows PC (macOS is coming) — but it’s very clearly in the early stages.

LAION patched together several open models to assemble an MVP, including Microsoft’s Phi-2 LLM, Columbia’s text-to-speech StyleTTS2 and Nvidia’s FastConformer for speech-to-text. As such, the experience is a bit unoptimized. Getting BUD-E to respond to commands within about 500 milliseconds — in the range of commercial voice assistants such as Google Assistant and Alexa — requires a beefy GPU like Nvidia’s RTX 4090.

Collabora is working pro bono to adapt its open source speech recognition and text-to-speech models, WhisperLive and WhisperSpeech, for BUD-E.

“Building the text-to-speech and speech recognition solutions ourselves means we can customize them to a degree that isn’t possible with closed models exposed through APIs,” Jakub Piotr Cłapa, an AI researcher at Collabora and BUD-E team member, said in an email. “Collabora initially started working on \[open assistants\] partially because we struggled to find a good text-to-speech solution for an LLM-based voice agent for one of our customers. We decided to join forces with the wider open source community to make our models more widely accessible and useful.”

In the near term, LAION says it’ll work to make BUD-E’s hardware requirements less onerous and reduce the assistant’s latency. A longer-horizon undertaking is building a dataset of dialogs to fine-tune BUD-E — as well as a memory mechanism to allow BUD-E to store information from previous conversations and a speech processing pipeline that can keep track of several people talking at once. 

I asked the team whether accessibility was a priority, considering speech recognition systems historically haven’t performed well with languages that aren’t English and accents that aren’t Transatlantic. One Stanford [study](https://news.stanford.edu/2020/03/23/automated-speech-recognition-less-accurate-blacks/) found that speech recognition systems from Amazon, IBM, Google, Microsoft and Apple were almost twice as likely to mishear Black speakers versus white speakers of the same age and gender.

Brendel said that LAION’s not ignoring accessibility — but that it’s not an “immediate focus” for BUD-E.

“The first focus is on really redefining the experience of how we interact with voice assistants before generalizing that experience to more diverse accents and languages,” Brendel said.

To that end, LAION has some pretty out-there ideas for BUD-E, ranging from an animated avatar to personifying the assistant to support for analyzing users’ faces through webcams to account for their emotional state.

The ethics of that last bit — facial analysis — are a bit dicey, needless to say. But Robert Kaczmarczyk, a LAION co-founder, stressed that LAION will remain committed to safety.

“\[We\] adhere strictly to the safety and ethical guidelines formulated by the EU AI Act,” he told TechCrunch via email — referring to the legal framework governing the sale and use of AI in the EU. The EU AI Act allows European Union member countries to adopt more restrictive rules and safeguards for “high-risk” AI, including emotion classifiers.

“This commitment to transparency not only facilitates the early identification and correction of potential biases, but also aids the cause of scientific integrity,” Kaczmarczyk added. “By making our data sets accessible, we enable the broader scientific community to engage in research that upholds the highest standards of reproducibility.”

LAION’s previous work [hasn’t been pristine](https://www.insider.com/chatgpt-is-like-many-other-ai-models-rife-with-bias-2023-1) in the ethical sense, and it’s pursuing a somewhat controversial separate project at the moment on [emotion detection](https://techcrunch.com/2023/10/27/a-group-behind-stable-diffusion-wants-to-open-source-emotion-detecting-ai/). But perhaps BUD-E will be different; we’ll have to wait and see.