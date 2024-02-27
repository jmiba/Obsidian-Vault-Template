---
id: 2e6b5b62-341b-4adb-8cad-944c74e1c11c
title: |
  Was ist LangChain?
author: |
  Martin Heller
topics: 
aliases: 
tags:
  - Technologie/KI
  - Programmieren
  - Programmbibliothek
created: 2024-01-19 07:58:06
published: 2023-09-12 09:35:00
URL: https://www.computerwoche.de/a/amp/was-ist-langchain,3615211
Omnivore-URL: https://omnivore.app/me/was-ist-lang-chain-18d20833582
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%%% END A %%

# Was ist LangChain?

> [!info] Info
> **Martin Heller**
> 
> LangChain macht es einfacher, Anwendungen auf Generative-AI-Basis zu entwickeln. Das sollten Sie über das Python- und JavaScript-Framework wissen.


## Inhalt

[![LangChain erleichtert es, Applikationen auf Sprachmodellbasis zu erstellen. Das sollten Sie über das Open-Source-Framework wissen.](https://proxy-prod.omnivore-image-cache.app/0x0,s1edIzkUD3Kfl1ZMcB0MDpzEBaFPKUcfTyzmeUNClnnI/https://images.computerwoche.de/bdb/3388356/738x415_enlarge.jpg "LangChain erleichtert es, Applikationen auf Sprachmodellbasis zu erstellen. Das sollten Sie über das Open-Source-Framework wissen.")](https://www.computerwoche.de/i/detail/artikel/3615211/1/3388356/EL%5FmediaN1000C/)

LangChain erleichtert es, Applikationen auf Sprachmodellbasis zu erstellen. Das sollten Sie über das Open-Source-Framework wissen.  
Foto: Idea99 - shutterstock.com

Auch wenn es eine eigene Kunstform darstellt, [effektive Prompts](https://www.computerwoche.de/a/so-schreiben-sie-optimale-chatgpt-prompts,3716039 "effektive Prompts") für sie zu erstellen: [Large Language Models](https://www.computerwoche.de/a/was-sind-llms,3614567 "Large Language Models") (LLMs; auch große Sprachmodelle) sind im Allgemeinen einfach zu verwenden. Mit LLMs zu programmieren, kann hingegen eine echte Herausforderung darstellen. An dieser Stelle kommt [LangChain](https://www.langchain.com/ "LangChain") ins Spiel - ein quelloffenes Framework, um LLM-basierte Applikationen zu entwickeln. 

Mit Hilfe dieses Rahmenwerks können Entwickler beispielsweise:

* [Chatbots](https://www.computerwoche.de/a/was-unternehmen-ueber-chatbots-wissen-muessen,3329735 "Chatbots") oder persönliche Assistenten erstellen,
* Dokumente oder strukturierte Daten zusammenfassen, respektive analysieren,
* Code schreiben und besser verstehen, oder
* mit [APIs](https://www.computerwoche.de/a/was-sie-ueber-application-programming-interfaces-wissen-muessen,3547586 "APIs") interagieren.

Derzeit gibt es zwei Versionen von LangChain - eine für Python und eine für TypeScript/JavaScript. In diesem Artikel lesen Sie, wie LangChain funktioniert und integriert, wie Sie das Framework installieren und was Sie sonst noch zum Thema wissen sollten.

### Wie LangChain funktioniert

LangChain ermöglicht es Sprachmodellen, sich mit Datenquellen zu verbinden und mit ihrer Umgebung zu interagieren.

* LangChain-Komponenten sind modulare Abstraktionen und Sammlungen von Implementierungen dieser Abstraktionen.
* Off-the-Shelf-Ketten (-Chains) sind strukturierte Zusammenstellungen von Komponenten, um bestimmte übergeordnete Tasks zu erfüllen.
* Sie können Komponenten verwenden, um bestehende Ketten anzupassen und um neue Chains zu erstellen.

In diesem Zusammenhang gibt es außerdem zwei Arten von Sprachmodellen:

* Bei Large Language Models bestehen Input und Output jeweils aus einer Zeichenkette.
* Bei Chat-Modellen dient eine Liste von Nachrichten als Input und eine Chat-Nachricht als Output. Letztere enthalten wiederum zwei Komponenten - Inhalt und Rolle (gibt Auskunft über die Quelle des Inhalts).

Im Allgemeinen verwenden Sprachmodelle Prompt-Templates für ihre Inputs. Damit lässt sich definieren, welche Aufgabe ein Sprach- oder Chatmodell übernehmen soll - etwa die des Assistenten, der Englisch in Französisch übersetzt. Die Templates lassen sich darüber hinaus auch auf viele verschiedene Inhaltsinstanzen anwenden - etwa einer Liste von Sätzen, die übersetzt werden sollen.

LangChain besteht aus sechs Modulen:

* **[Model I/O](https://python.langchain.com/docs/modules/model%5Fio/ "Model I/O")** (Schnittstelle zu Sprachmodellen),
* **[Data Connection](https://python.langchain.com/docs/modules/data%5Fconnection/ "Data Connection")** (Schnittstelle zu anwendungsspezifischen Daten),
* **[Chains](https://python.langchain.com/docs/modules/chains/ "Chains")** (konstruieren Call-Sequenzen),
* **[Agents](https://python.langchain.com/docs/modules/agents/ "Agents")** (ermöglichen den Chains, die zu verwendenden Tools anhand von High-Level-Direktiven auszuwählen),
* **[Memory](https://python.langchain.com/docs/modules/memory/ "Memory")** (bewahrt den Anwendungsstatus zwischen den "Chain Runs") und
* **[Callbacks](https://python.langchain.com/docs/modules/callbacks/ "Callbacks")** (protokollieren und streamen die Zwischenschritte einer jeden Chain).

**Debugging mit LangSmith**

Geht es darum, Ihre mit LangChain generierten Applikationen vom Prototypenstatus in die Produktion zu überführen, bietet [LangSmith](https://python.langchain.com/docs/guides/langsmith/ "LangSmith") Unterstützung.

### LangChain-Anwendungsfälle

Zu den Anwendungsfällen für LangChain gehören:

* Q&A-Generierung aus Dokumenten,
* die Analyse strukturierter Daten,
* API-Interaktionen,
* Code Understanding,
* Agenten-Simulationen,
* autonome Agenten,
* Chatbots,
* Code-Generierung,
* Datenextraktion,
* Graphdatenanalyse,
* multimodale Outputs,
* Self-Checking,
* Zusammenfassung und
* Tagging.

### LangChain-Integrationen

In Sachen Integrationen zeigt sich LangChain vielfältig und unterstützt zahlreiche:

* [Callbacks](https://python.langchain.com/docs/integrations/callbacks/ "Callbacks"),
* [Chat-Modelle](https://python.langchain.com/docs/integrations/chat/ "Chat-Modelle"),
* [Document Loader](https://python.langchain.com/docs/integrations/document%5Floaders/ "Document Loader"),
* [Document Transformer](https://python.langchain.com/docs/integrations/document%5Ftransformers/ "Document Transformer"),
* [LLMs](https://python.langchain.com/docs/integrations/llms/ "LLMs"),
* [Memory](https://python.langchain.com/docs/integrations/memory/ "Memory"),
* [Retriever](https://python.langchain.com/docs/integrations/retrievers/ "Retriever"),
* [Text-Embedding-Modelle](https://python.langchain.com/docs/integrations/text%5Fembedding/ "Text-Embedding-Modelle"),
* [Agents & Toolkits](https://python.langchain.com/docs/integrations/toolkits/ "Agents & Toolkits"),
* [Tools](https://python.langchain.com/docs/integrations/tools/ "Tools") und
* [Vector Stores](https://python.langchain.com/docs/integrations/vectorstores/ "Vector Stores").

LangChain fungiert dabei im Wesentlichen als neutraler Knotenpunkt für all diese Fähigkeiten.

### LangChain installieren

Um **LangChain** **für Python zu installieren**, verwenden Sie pip oder conda. Um Versionskonflikte zu vermeiden, empfiehlt es sich, [Python-Packages in virtuellen Umgebungen](https://www.computerwoche.de/a/so-bereinigen-sie-python-projektchaos,3615082 "Python-Packages in virtuellen Umgebungen") zu installieren.

Die grundlegende, minimale Installation starten Sie mit folgendem Befehl:

`pip install langchain`

Nicht enthalten sind dann die Module für Modell-Provider, Data Stores und andere Integrationen. Um LangChain gemeinsam mit den gängigen Sprachmodellen zu installieren, verwenden Sie:

`pip install langchain[llms]`

Um LangChain inklusive sämtlicher Integrationen zu installieren, lautet der Befehl:

`pip install langchain[all]`

Wenn Sie `zsh` verwenden (die Standard-Shell auf neueren Versionen von macOS), sind Ausdrücke mit eckigen Klammern in Anführungszeichen zu setzen. Anderenfalls interpretiert die Shell eckige Klammern als Arrays. Bezogen auf das ebengenannte Beispiel wäre der richtige Befehl:

`pip install 'langchain[all]'`

Um **LangChain für JavaScript zu installieren**, nutzen Sie:

* npm (`npm install -S langchain`),
* Yarn (`yarn add langchain`) oder
* pnpm (`pnpm add langchain`).

Sie können LangChain für JavaScript verwenden mit:

* Node.js,
* Cloudflare Workers,
* Vercel / Next.js (Browser-, Serverless- und Edge-Funktionen),
* Supabase Edge Functions,
* Webbrowsern und
* Deno.

Weiterführende Informationen zu LangChain für JavaScript finden Sie [hier](https://js.langchain.com/docs/get%5Fstarted/installation "hier").

### LangChain-Beispiel

Aus Platzgründen beschränken wir uns in diesem Artikel auf ein Beispiel aus der [LangChain-Dokumentation](https://python.langchain.com/docs/get%5Fstarted/quickstart#llmchain "LangChain-Dokumentation"). Folgender Python-Code demonstriert eine LLMChain. Diese Kette nimmt Eingabevariablen und übergibt sie an ein Prompt-Template, um einen Prompt zu erstellen. Der Prompt wird an ein Large Language Model (ChatOpenAI) übergeben und der CSV-Output in einen (optionalen) Output-Parser eingespeist, um ein Python-Array von Strings zu erstellen.

`from langchain.chat_models import ChatOpenAI`

`from langchain.prompts.chat import (`

` ChatPromptTemplate,`

` SystemMessagePromptTemplate,`

` HumanMessagePromptTemplate,`

`)`

`from langchain.chains import LLMChain`

`from langchain.schema import BaseOutputParser`

`class CommaSeparatedListOutputParser(BaseOutputParser):`

`"""Parse the output of an LLM call to a comma-separated list."""`

`def parse(self, text: str):`

`"""Parse the output of an LLM call."""`

`return text.strip().split(", ")`

`template = """You are a helpful assistant who generates comma separated lists.`

`A user will pass in a category, and you should generate 5 objects in that category in a comma separated list.`

`ONLY return a comma separated list, and nothing more."""`

`system_message_prompt = SystemMessagePromptTemplate.from_template(template)`

`human_template = "{text}"`

`human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)`

`chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])`

`chain = LLMChain(`

`llm=ChatOpenAI(),`

`prompt=chat_prompt,`

`output_parser=CommaSeparatedListOutputParser()`

`)`

`chain.run("colors")`

`# >> ['red', 'blue', 'green', 'yellow', 'orange']`

### Die LangChain Expression Language (LCEL)

Die [LangChain Expression Language](https://blog.langchain.dev/langchain-expression-language/ "LangChain Expression Language") (LCEL) ist eine deklarative Methode, um Ketten zusammenzustellen und bietet standardmäßig Streaming-, Batch- und Async-Support. LCEL erleichtert es, LangChain zu nutzen und ist im Grunde eine High-Level-Alternative, um Chains in Python oder TypeScript/JavaScript zu erstellen. Um LCEL zu erlernen, können Sie beispielsweise den interaktiven [LangChain Teacher](https://langchain-teacher-lcel.streamlit.app/ "LangChain Teacher") nutzen - dazu müssen Sie allerdings zuerst LangChain für Python installieren.

LCEL-Ausdrücke verwenden Pipe-Zeichen (`|`), um Variablen in Ketten zu verbinden. Eine einfache, allgemeine Chain verwendet zum Beispiel ein Modell und einen Prompt:

`chain = prompt | model`

Im Kontext könnten Sie dieses Python-Programm haben:

`from langchain.prompts import ChatPromptTemplate`

`from langchain.chat_models import ChatOpenAI`

`model = ChatOpenAI()`

`prompt = ChatPromptTemplate.from_template("tell me a joke about {foo}")`

`chain = prompt | model`

`chain.invoke({"foo": "bears"})`

Der Output (wie auf der Website angegeben) sieht folgendermaßen aus:

`AIMessage(content='Why don\'t bears use cell phones? \n\nBecause they always get terrible "grizzly" reception!', additional_kwargs={}, example=False)`

[Dieser Beitrag basiert auf einem Artikel unserer US-Schwesterpublikation Infoworld.](https://www.infoworld.com/article/3706289/what-is-langchain-easier-development-around-llms.html "Dieser Beitrag basiert auf einem Artikel unserer US-Schwesterpublikation Infoworld.")