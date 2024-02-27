---
id: 7f206b63-cb60-4546-b4e0-4ace32020344
title: |
  Taking your RAG pipelines to a next level ! LangGraphs 
author: |
  Ahmedabdullah
topics:
  - Programmieren
  - Künstliche Intelligenz
aliases: 
tags:
  - Technologie/KI
  - Programmieren
  - LLM
created: 2024-01-25 07:41:52
published: 2024-01-19 10:34:33
URL: https://medium.com/tensor-labs/taking-your-rag-pipelines-to-a-next-level-langgraphs-0e7addda0405
Omnivore-URL: https://omnivore.app/me/taking-your-rag-pipelines-to-a-next-level-lang-graphs-by-ahmedab-18d3f5a8273
related:
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
> #### Meine Notes
> ##### Zum Thema "Programmieren":
> - [[Test mit Dataview-Write in Datei.md|Test mit Dataview-Write in Datei]] (Invalid date)
> - [[Notizensammlung/Obsidian Plugin DB Folder.md|Obsidian Plugin DB Folder]] (23.12.2023)
> - [[Notizensammlung/DataviewJS - Daten zusammenfassen.md|DataviewJS - Daten zusammenfassen]] (23.12.2023)
> - [[Notizensammlung/Programmcode mit ChatGPT dokumentieren.md|Programmcode mit ChatGPT dokumentieren]] (19.01.2024)
> - [[Notizensammlung/Dataview mit Input-Feld.md|Dataview mit Input-Feld]] (24.01.2024)
> ##### Zum Thema "Künstliche Intelligenz":
> - [[Herausgebertätigkeit/BFP 49-2/BFP 49-2.md|BFP 49-2]] (04.05.2023)
> 
> &nbsp;
> #### Relevante Literatur
> ##### Zum Thema "Programmieren":
> - [[04 Literatur-Notes/Pocket/Getting Started with OpenAI API in JavaScript.md|Getting Started with OpenAI API in JavaScript]] (21.12.2023)
> - [[04 Literatur-Notes/Omnivore/Comparing LangChain and LlamaIndex with 4 tasks.md|Comparing LangChain and LlamaIndex with 4 tasks]] (25.01.2024)
> ##### Zum Thema "Künstliche Intelligenz":
> - [[04 Literatur-Notes/Pocket/Prompting  Angst macht KI schlau.md|Prompting  Angst macht KI schlau]] (12.11.2023)
> - [[04 Literatur-Notes/Pocket/OpenAI Custom GPT.md|OpenAI Custom GPT]] (12.11.2023)
> - [[04 Literatur-Notes/Pocket/OpenIndex.ai - AI-powered autonomous agents, tools and document embeddings.md|OpenIndex.ai - AI-powered autonomous agents, tools and document embeddings]] (16.11.2023)
> - [[04 Literatur-Notes/Pocket/Workshopreihe  GPT und Prompt Engineering für die (digitalen) Geisteswissenschaften .md|Workshopreihe  GPT und Prompt Engineering für die (digitalen) Geisteswissenschaften ]] (21.11.2023)
> - [[04 Literatur-Notes/Pocket/ChatGPT und OpenAI-API in Unternehmen.md|ChatGPT und OpenAI-API in Unternehmen]] (30.11.2023)
> - [[04 Literatur-Notes/Pocket/Unbelievable! Run 70B LLM Inference on a Single 4GB GPU with This NEW Technique.md|Unbelievable! Run 70B LLM Inference on a Single 4GB GPU with This NEW Technique]] (30.11.2023)
> - [[04 Literatur-Notes/Pocket/ChatGPT von OpenAI für die sichere Nutzung in Ihrem Unternehmen..md|ChatGPT von OpenAI für die sichere Nutzung in Ihrem Unternehmen.]] (30.11.2023)
> - [[04 Literatur-Notes/Pocket/microsoft AI-For-Beginners.md|microsoft AI-For-Beginners]] (04.12.2023)
> - [[04 Literatur-Notes/Pocket/Building An OpenAI GPT with Your API  A Step-by-Step Guide.md|Building An OpenAI GPT with Your API  A Step-by-Step Guide]] (04.12.2023)
> - [[04 Literatur-Notes/Pocket/Creating Automatic Knowledge Graphs from Pre-trained Language Models.md|Creating Automatic Knowledge Graphs from Pre-trained Language Models]] (04.12.2023)
> - [[04 Literatur-Notes/Pocket/How to Create Your Own GPT Voice Assistant with Infinite Chat Memory in Python.md|How to Create Your Own GPT Voice Assistant with Infinite Chat Memory in Python]] (04.12.2023)
> - [[04 Literatur-Notes/Pocket/Wegen ChatGPT  An dieser Uni müssen Studenten keine Bachelorarbeit mehr einreichen.md|Wegen ChatGPT  An dieser Uni müssen Studenten keine Bachelorarbeit mehr einreichen]] (04.12.2023)
> - [[04 Literatur-Notes/Pocket/Krea AI.md|Krea AI]] (13.12.2023)
> - [[04 Literatur-Notes/Pocket/Künstliche Intelligenz  War’s das mit meiner Intelligenz .md|Künstliche Intelligenz  War’s das mit meiner Intelligenz ]] (13.12.2023)
> - [[04 Literatur-Notes/Pocket/How ChatGPT can help you do archival research — but never replace archivists.md|How ChatGPT can help you do archival research — but never replace archivists]] (13.12.2023)
> - [[04 Literatur-Notes/Pocket/GPT für die Hochschule.md|GPT für die Hochschule]] (21.12.2023)
> - [[04 Literatur-Notes/Pocket/Getting Started with OpenAI API in JavaScript.md|Getting Started with OpenAI API in JavaScript]] (21.12.2023)
> - [[04 Literatur-Notes/Pocket/ChatGPT Voice ist jetzt kostenlos  So unterhältst du dich mit dem Bot.md|ChatGPT Voice ist jetzt kostenlos  So unterhältst du dich mit dem Bot]] (03.01.2024)
> - [[04 Literatur-Notes/Pocket/Das sind die 5 größten Gefahren durch KI – laut Cyber­sicherheits­experte.md|Das sind die 5 größten Gefahren durch KI – laut Cyber­sicherheits­experte]] (03.01.2024)
> - [[04 Literatur-Notes/Omnivore/KI-Textgeneratoren- Die 10 besten Programme.md|KI-Textgeneratoren- Die 10 besten Programme]] (23.01.2024)
> - [[04 Literatur-Notes/Omnivore/Comparing LangChain and LlamaIndex with 4 tasks.md|Comparing LangChain and LlamaIndex with 4 tasks]] (25.01.2024)
> - [[04 Literatur-Notes/Omnivore/Six Ways the AI Revolution is Unfolding.md|Six Ways the AI Revolution is Unfolding]] (25.01.2024)
> %% END A %%

# Taking your RAG pipelines to a next level ! LangGraphs 

> [!info] Info
> **Ahmedabdullah**
> 
> Well hey there my fellow companion on data journey, If you’ve landed on this article then this means that you’ve taken amazing steps and now you’re well familiarized with RAG pipelines are are…


## Inhalt

![](https://proxy-prod.omnivore-image-cache.app/700x700,sN9DWw0G9QaLqzfWYld2DYV2tZCPj0PMdn2HhRTV1cdU/https://miro.medium.com/v2/resize:fit:1400/1*Kwr0jvNCyU0bQRqfZlijtg.jpeg)

Well hey there my fellow companion on data journey, If you’ve landed on this article then this means that you’ve taken amazing steps and now you’re well familiarized with RAG pipelines are are dwelling in the world of Generative AI. If that is true then one of the bridges you must’ve crossed is langchain itself. But guess what?In the latest release of langchain, they have introduced langGraphs which take this entire framework to a whole new level and that is what we’ll be diving into today. Also in this article we’ll see how LangGraphs can engance your langChain based RAG pipelines.

> LangChain is a framework designed to simplify the creation of applications using large language models. As a language model integration framework, LangChain’s use-cases largely overlap with those of language models in general, including document analysis and summarization, chatbots, and code analysis.

## Introduction

LangChain has introduced a new library called LangGraph. It’s like a puzzle piece that fits perfectly into LangChain’s world, but it brings something new to the table. Imagine you’re building a maze, and now you have the tools to make loops and circles, not just straight lines. That’s what LangGraph does with its ability to create cyclical graphs, making it super handy for developing complex programs, especially agent runtimes. As with the rest of langChain tools this too can be imported with a single line of code

from langgraph import LangGraph

## The Drive Behind LangGraph

LangChain is known for making custom chains of commands, like a chef creating unique recipes. But previously, it was like they were serving everything on flat plates. Now with LangGraph, they’ve got bowls too, where things can loop and twist. This is really useful when you’re making complex programs that need to make decisions and loop back, not just go in one direction.

For instance, if you have a program that fetches information but sometimes needs to ask again in a smarter way, LangGraph helps with that. It’s like teaching the program to not just follow a list but think and act more like a human.

while not success:  
    data = fetch_info(query)  
    if data_is_good(data):  
        success = True  
    else:  
        query = make_query_smarter()

## How LangGraph Works

LangGraph has a simple but powerful setup. You start with something called a StateGraph, which is like the brain of your operation. You tell it all the things it needs to keep track of.

from langgraph import StateGraph

  
class MyState:  
    def __init__(self):  
        self.memory = {}

state = MyState()  
graph = StateGraph(state)

Then you add nodes, which are like stations where specific tasks happen. You connect these stations with edges. It’s like setting up a train network where trains (data) move from one station to another, sometimes choosing different tracks based on signals.

  
graph.add_node("station1", task1)  
graph.add_node("station2", task2)  
graph.add_edge("station1", "station2")

After setting up your network, you make it ready to work. This is like opening your train network for business, ready to handle the data-trains efficiently.

  
network = graph.compile()

## Upgraded Agent Executors

With LangGraph, you get a better version of LangChain’s AgentExecutor. It’s like having a more advanced control room where you can really fine-tune how your program thinks and acts.

## Customizing with LangGraph

What’s really cool about LangGraph is that it’s like a set of building blocks. You can put them together in basic ways, but you’re also free to change things around to fit exactly what you need. Whether it’s making sure your program uses a certain tool first, involves a person in making decisions, or handles a bunch of tasks smoothly, LangGraph is flexible enough to handle it.

## Comparing Simple RAG Pipelines with LangGraph Enhanced RAG Pipelines

In traditional Retrieval-Augmented Generation (RAG) pipelines, the process is linear and deterministic. It operates on a sequential modus operandi: posing a query, fetching pertinent documents, and subsequently generating a response based on the retrieved content. It’s akin to a single-threaded process in computational terms, where each step logically follows the previous one without the capacity for iteration or refinement.

In a conventional RAG architecture:

1. Query Articulation: A query is formulated.
2. Document Retrieval: The system retrieves documents pertinent to the query.
3. Response Generation: The system synthesizes a response based on the content of the retrieved documents.

  
query = "What is the tallest mountain?"  
documents = retrieve_documents(query)  
response = generate_response(query, documents)

However, this linear approach has limitations, particularly in scenarios where the initial retrieval yields suboptimal or irrelevant information. In such cases, the traditional RAG pipeline lacks the mechanism to reassess and refine its search strategy.

LangGraph introduces a paradigm shift by incorporating iterative and evaluative capabilities into the RAG framework. It’s not merely about enhancing the pipeline but about embedding a feedback loop, enabling the system to critically evaluate the relevance of retrieved documents, refine the query if necessary, and iterate the process. This iterative approach is emblematic of real-world AI problem-solving where solutions are not static but evolve through continuous learning and adaptation.

In a LangGraph-enhanced RAG architecture:

1. Query Articulation: The initial query is posed.
2. Iterative Retrieval and Assessment: Documents are retrieved and their relevance is assessed.
3. Decision-Making: The system evaluates whether the retrieved documents suffice to generate a quality response.
4. Iterative Refinement: If the documents are deemed insufficient, the query is refined, and the retrieval process iterates.
5. Informed Response Generation: Once optimal documents are retrieved, a response is generated.

  
query = "What is the tallest mountain?"  
satisfactory = False

while not satisfactory:  
    documents = retrieve_documents(query)  
    if evaluate_relevance(documents):  
        satisfactory = True  
    else:  
        query = refine_query(query)

response = generate_response(query, documents)

## Final Notes !

In essence, LangGraph doesn’t just enhance RAG pipelines; it revolutionizes them by infusing a layer of cognitive iteration and evaluation. It elevates the pipeline from a mere sequential process to an intelligent, adaptive system capable of introspection and refinement. This is particularly crucial in complex AI domains where the first response is not necessarily the best response, and iterative refinement can significantly amplify the accuracy and relevance of the solution. With that I really hope your data journey goes amazing.

While we’re talking about amazing things, check out [TensorLabs](https://tensorlabs.io/) and the amazing waves we’re making in the domain of AI. [TensorLabs](https://pk.linkedin.com/company/tensor-labs) group of exceptionally talented AI Engineers and Developers who transformed five concepts from mere ideas to MVPs and then to fully operational products just within 2023, want to discuss your ideas with us? Feel free to reach out and happy AI.

![](https://proxy-prod.omnivore-image-cache.app/700x725,sc7KA6M-RSRHut7c20Nb7rrDvNPH4gHdeVd-hfN6Gzek/https://miro.medium.com/v2/resize:fit:1400/1*-x-R-KNT2U6cNcL8t3eMBg.png)