---
id: be130f33-e4bd-440e-972f-1ed191cd1090
title: |
  Comparing LangChain and LlamaIndex with 4 tasks
author: |
  Ming
topics:
  - "[[Programmieren]]"
  - "[[Künstliche Intelligenz]]"
aliases: 
tags:
  - Technologie/KI
  - Programmieren
  - LLM
created: 2024-01-25 07:49:31
published: 2024-01-11 05:55:39
URL: https://lmy.medium.com/comparing-langchain-and-llamaindex-with-4-tasks-2970140edf33
Omnivore-URL: https://omnivore.app/me/comparing-lang-chain-and-llama-index-with-4-tasks-by-ming-jan-20-18d3f6182d7
related:
  - "[[Was ist LangChain-]]"
  - "[[Running Mixtral 8x7 locally with LlamaIndex]]"
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
# Meine Notes
## Zum Thema "Programmieren":

Noch keine Zusammenhänge in "Meine Notes" für das Thema "Programmieren"!

## Zum Thema "Künstliche Intelligenz":

- [[Notizensammlung/Themen/Künstliche Intelligenz.md|Künstliche Intelligenz]] (17.03.2025)
- [[Notizensammlung/Obsidian-Plugin Textgenerator einrichten.md|Obsidian-Plugin Textgenerator einrichten]] (26.02.2024)
- [[Notizensammlung/Obsidian-Plugin Smart Connections einrichten.md|Obsidian-Plugin Smart Connections einrichten]] (26.02.2024)
- [[Wissensmanagement/Second Brain mit KI.md|Second Brain mit KI]] (19.02.2024)

# Relevante Literatur
## Zum Thema "Programmieren":

Noch keine Zusammenhänge in "Relevante Literatur" für das Thema "Programmieren"!

## Zum Thema "Künstliche Intelligenz":

- [[04 Literatur-Notes/Omnivore/Einsatz von KI-Systemen beim wissenschaftlichen Schreiben – netbib.md|Einsatz von KI-Systemen beim wissenschaftlichen Schreiben – netbib]] (06.02.2024)
- [[04 Literatur-Notes/Omnivore/Warum Hochschulen jetzt eigene Sprachmodelle hosten sollten - Wiarda-Blog.md|Warum Hochschulen jetzt eigene Sprachmodelle hosten sollten - Wiarda-Blog]] (26.01.2024)
%% END A %%

# Comparing LangChain and LlamaIndex with 4 tasks

> [!info] Info
> **Ming**
> 
> In Why RAG is big, I stated my support for Retrieval-Augmented Generation (RAG) as the key technology of private, offline, decentralized LLM applications. When you build something for your own use…


## Inhalt

LangChain v.s. LlamaIndex — How do they compare?

![](https://proxy-prod.omnivore-image-cache.app/700x700,sCRFbaN4tbLvvQKFQqOwurMqklhj4dQuaPRnUFd-z-fc/https://miro.medium.com/v2/resize:fit:1400/0*jvbuvydDBdJvHF7e)

Generated via MidJourney. Prompt: “A llama and a chain, facing off.” Apparently, MidJourney misunderstood.

In [Why RAG is big](https://lmy.medium.com/why-rag-is-big-aa60282693dc), I stated my support for **Retrieval-Augmented Generation (RAG)** as the key technology of private, offline, decentralized LLM applications. When you build something for your own use, you’re fighting alone. You can build from scratch, but it would be more efficient to build upon an existing framework.

AFAIK, two choices exist, aiming at different scopes:

* [LangChain](https://www.langchain.com/), a **generic** framework for developing stuff with LLM.
* [LlamaIndex](https://www.llamaindex.ai/), a framework **dedicated** for building RAG systems.

Picking a framework is a big investment. You want one that enjoys strong maintainers and vibrant communities. Fortunately, both choices have incorporated last year, so the sizes are quite quantifiable. Here’s how the numbers compare:

![](https://proxy-prod.omnivore-image-cache.app/700x306,s5FIZuJci-0o5bJc9ryFw18Cke31V2dVayNVt3Fl8UIA/https://miro.medium.com/v2/resize:fit:1400/1*ITMCrR__zU-_VFZSwIP9BQ.png)

I wish Medium can have tables.

**Judging from the financials**, LlamaIndex is coming strong with a funding amount close to that of LangChain although their target market is much smaller (using GitHub stars as an approximate of community interest). This might indicate better chance of survival for LlamaIndex. That being said, LangChain offers more enterprise-oriented products that can generate revenue (LangServe, LangSmith, …), so the argument may be reversed. It’s a tough call from the monetary perspective.

My Finance 101 could only take me this far. Let’s get to what I’m actually good at and talk in Python. In this article, I’m going to **complete some basic tasks with both frameworks in parallel**. By presenting the code snippets side-by-side, I hope it helps you make a more informed decision on which to employ in your own RAG chatbot.

## Creating a chatbot with a local LLM

For the first task to implement, I chose making a local-only chatbot. This is because I don’t want to pay a cloud service for mock chat messages while learning to use these frameworks.

I chose to **keep a LLM running in a standalone inference server**, instead of having the frameworks load the multi-gigabyte model into the memory every time I run the scripts. This saves time and avoids wearing down the disk.

While there are multiple API schema for LLM inference, I chose one that is **OpenAI-compatible**, so that it most closely resembles the official OpenAI endpoint, should you want to.

This is how you would do it with **LlamaIndex**:

from llama_index.llms import ChatMessage, OpenAILike  

  llm = OpenAILike(    
    api_base="http://localhost:1234/v1",    
    timeout=600,    
    api_key="loremIpsum",    
    is_chat_model=True,    
    context_window=32768,    
)    
chat_history = [    
    ChatMessage(role="system", content="You are a bartender."),    
    ChatMessage(role="user", content="What do I enjoy drinking?"),    
]    
output = llm.chat(chat_history)    
print(output)

And this is **LangChain**:

from langchain.schema import HumanMessage, SystemMessage    
from langchain_openai import ChatOpenAI  

  llm = ChatOpenAI(    
    openai_api_base="http://localhost:1234/v1",    
    request_timeout=600,    
    openai_api_key="loremIpsum",    
    max_tokens=32768,    
)    
chat_history = [    
    SystemMessage(content="You are a bartender."),    
    HumanMessage(content="What do I enjoy drinking?"),    
]    
print(llm(chat_history))

With both, the API key can be arbitrary, but it **must present**. I guess it’s a requirement from the OpenAI SDK that is running under the hood in both frameworks.

* LangChain distinguishes between chat-able LLMs (`ChatOpenAI`) and completion-only LLMs (`OpenAI`), while LlamaIndex controls it with a `is_chat_model` parameter in the constructor.
* LlamaIndex distinguishes official `OpenAI` endpoints and `OpenAILike` endpoints, while LangChain determines where to send requests to via a `openai_api_base` parameter.
* While LlamaIndex labels chat messages with the `role` parameter, LangChain uses separate classes.

So far, things didn’t look very different across the two frameworks. Let’s carry on.

## Building a RAG system for local files

With a LLM connected, we can get to business. Let’s now build a simple RAG system that reads from a local folder of text files. Here’s how to achieve that with LlamaIndex, taken largely from [this documentation](https://docs.llamaindex.ai/en/stable/getting%5Fstarted/starter%5Fexample.html):

from llama_index import ServiceContext, SimpleDirectoryReader, VectorStoreIndex

service_context = ServiceContext.from_defaults(    
    embed_model="local",    
    llm=llm,   
)    
documents = SimpleDirectoryReader(  
    input_dir="mock_notebook/",  
).load_data()    
index = VectorStoreIndex.from_documents(    
    documents=documents,  
    service_context=service_context,  
)  
engine = index.as_query_engine(    
    service_context=service_context,    
)  
output = engine.query("What do I like to drink?")    
print(output)

With **LangChain**, number of lines would double, but it would still be manageable:

from langchain_community.document_loaders import DirectoryLoader  

    
loader = DirectoryLoader("mock_notebook/", glob="*.md")    
docs = loader.load()  

  from langchain.text_splitter import RecursiveCharacterTextSplitter  

  text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)    
splits = text_splitter.split_documents(docs)  

  from langchain_community.embeddings.fastembed import FastEmbedEmbeddings    
from langchain_community.vectorstores import Chroma  

  vectorstore = Chroma.from_documents(documents=splits, embedding=FastEmbedEmbeddings())    
retriever = vectorstore.as_retriever()  

  from langchain import hub  

    
prompt = hub.pull("rlm/rag-prompt")  

    def format_docs(docs):    
    return "\n\n".join(doc.page_content for doc in docs)  

    from langchain_core.runnables import RunnablePassthrough  

  rag_chain = (    
    {"context": retriever | format_docs, "question": RunnablePassthrough()}    
    | prompt    
    | llm   
)    
print(rag_chain.invoke("What do I like to drink?"))

These snippets clearly illustrate the different **levels of abstraction** across these two frameworks. While LlamaIndex wraps the RAG pipeline with a convenient package called “[query engines](https://docs.llamaindex.ai/en/stable/module%5Fguides/deploying/query%5Fengine/root.html)”, LangChain exposes you to the inner components. They include the concatenator for retrieved documents, the prompt template that says “based on X please answer Y”, and the chain itself (shown in [LCEL](https://python.langchain.com/docs/expression%5Flanguage/) above).

This lack of abstraction has implications on learners: **When building with LangChain, you have to know exactly what you want on the first try**. For example, compare where `from_documents` is invoked. LlamaIndex allows you to play with a Vector Store Index without explicitly choosing a storage backend, whereas LangChain seems to suggest you pick an implementation right away. (Everybody [seems to have](https://github.com/search?type=code&q=%22.from%5Fdocuments%28%22+language%3APython+langchain) explicitly picked a backend when they create Vector Indexes from documents with LangChain.) I’m not sure if I’m making an informed decision when choosing a database before I hit a scalability problem.

More interestingly, although both LangChain and LlamaIndex are providing [**Hugging Face Hub**](https://huggingface.co/)**\-like cloud services** (namely, [LangSmith Hub](https://smith.langchain.com/hub) and [LlamaHub](https://llamahub.ai/)), it’s LangChain who dialed it to 11\. Notice the `hub.pull` call with LangChain. It downloads nothing but a short, textual template that reads:

> You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don’t know the answer, just say that you don’t know. Use three sentences maximum and keep the answer concise.  
> Question: {question}  
> Context: {context}  
> Answer:

While this indeed encourages sharing eloquent prompts with the community, I feel it’s an overkill. Storing \~1kB of text doesn’t really justify the network call involved with pulling. I hope the downloaded artifacts are cached.

## Combining the two: a RAG-enabled chatbot

Up till now, we’ve been building things that aren’t very smart. In the first task, we built something that can maintain a conversation but doesn’t know you very well; in the second, we built something that knows you but doesn’t retain a chat history. Let’s **combine these two**.

With **LlamaIndex**, it’s as simple as swapping `as_query_engine` with `as_chat_engine`:

  
engine = index.as_chat_engine()  
output = engine.chat("What do I like to drink?")    
print(output)   
output = engine.chat("How do I brew it?")    
print(output) 

With **LangChain**, we need to spell things out quite a bit. Following [the official tutorial](https://python.langchain.com/docs/expression%5Flanguage/cookbook/retrieval), let’s define the memory first:

  
from langchain_core.runnables import RunnablePassthrough, RunnableLambda    
from langchain_core.messages import get_buffer_string    
from langchain_core.output_parsers import StrOutputParser    
from operator import itemgetter    
from langchain.memory import ConversationBufferMemory    
from langchain.prompts.prompt import PromptTemplate    
from langchain.schema import format_document    
from langchain_core.prompts import ChatPromptTemplate  

  memory = ConversationBufferMemory(    
    return_messages=True, output_key="answer", input_key="question"    
)

Here’s the plan:

1. At the start of LLM’s turn, we **load the chat history** from the memory.

load_history_from_memory = RunnableLambda(memory.load_memory_variables) | itemgetter(    
    "history"    
)    
load_history_from_memory_and_carry_along = RunnablePassthrough.assign(    
    chat_history=load_history_from_memory    
)

2\. We ask the LLM to **enrich the question** with context: “Taking the chat history into consideration, what should I look for in my notes to answer this question?”

rephrase_the_question = (    
    {    
        "question": itemgetter("question"),    
        "chat_history": lambda x: get_buffer_string(x["chat_history"]),    
    }    
    | PromptTemplate.from_template(    
        """You're a personal assistant to the user.    
Here's your conversation with the user so far:    
{chat_history}    
Now the user asked: {question}    
To answer this question, you need to look up from their notes about """    
    )    
    | llm    
    | StrOutputParser()    
)

(We can’t just concatenate the two, because the topics may have changed during the conversation, making most semantic information in the chat log irrelevant.)  
3\. **We run the RAG pipeline**. Notice how we have cheated the LLM by implying “_we as the user_ will be looking up the notes themselves”, but in fact we are asking the LLM to do the heavy lifting now. I feel bad.

retrieve_documents = {    
    "docs": itemgetter("standalone_question") | retriever,    
    "question": itemgetter("standalone_question"),    
}

4\. We ask the LLM: “Taking the retrieved documents as reference (and — optionally — the conversation so far), what would be your response to the user’s latest question?”

def _combine_documents(docs):    
    prompt = PromptTemplate.from_template(template="{page_content}")    
    doc_strings = [format_document(doc, prompt) for doc in docs]    
    return "\n\n".join(doc_strings)    
compose_the_final_answer = (    
    {    
        "context": lambda x: _combine_documents(x["docs"]),    
        "question": itemgetter("question"),    
    }    
    | ChatPromptTemplate.from_template(    
        """You're a personal assistant.    
With the context below:    
{context}    
To the question "{question}", you answer:"""    
    )    
    | llm    
)

5\. We append the final response to the chat history.

  
final_chain = (    
    load_history_from_memory_and_carry_along    
    | {"standalone_question": rephrase_the_question}    
    | retrieve_documents    
    | compose_the_final_answer    
)    
  
inputs = {"question": "What do I like to drink?"}    
output = final_chain.invoke(inputs)    
memory.save_context(inputs, {"answer": output.content})    
print(output)   
inputs = {"question": "How do I brew it?"}    
output = final_chain.invoke(inputs)    
memory.save_context(inputs, {"answer": output.content})    
print(output) 

That’s quite a journey! We learned a lot about how a LLM-powered application is usually built. Especially, we exploited the LLM a couple of times by **having it assume different persona**: a query generator, someone who summarizes retrieved documents, and finally the participant of our conversation. I also hope you got adequately comfortable with the LCEL by now.

## Upgrading to agents

If you treat the LLM persona that talks to you as a person, **the RAG pipeline can be thought of a tool** that the person uses. A person can have access to more than one tool, and so can a LLM. You can give it tools for searching Google, looking up Wikipedia, checking weather forecasts, etc. In this way, your chatbot can answer questions about things outside of its immediate knowledge.

It doesn’t have to be informational tools. By giving our LLM tools like searching the web, placing some shopping orders, replying to your emails, etc., you can make it **capable of affecting the reality** and making a difference to the world.

With many tools comes the need to decide which ones to use, and in what order. This ability is referred to as “[agency](https://www.ppccfl.com/blog/take-control-of-your-life-the-concept-of-agency-and-its-four-helpers/)”. The persona of your **LLM who has agency is thus called an “Agent”**.

There are multiple ways to give agency to a LLM application. The most model-generic (and thus self-host-friendly) way is perhaps [the ReAct paradigm](https://www.promptingguide.ai/techniques/react), which I wrote a bit more about in [the previous post](https://lmy.medium.com/why-rag-is-big-aa60282693dc).

To do that in **LlamaIndex**,
  
  
from llama_index.tools import ToolMetadata    
from llama_index.tools.query_engine import QueryEngineTool  

  notes_query_engine_tool = QueryEngineTool(    
    query_engine=notes_query_engine,    
    metadata=ToolMetadata(    
        name="look_up_notes",    
        description="Gives information about the user.",    
    ),    
)    
from llama_index.agent import ReActAgent  

  agent = ReActAgent.from_tools(    
    tools=[notes_query_engine_tool],    
    llm=llm,    
    service_context=service_context,    
)    
output = agent.chat("What do I like to drink?")    
print(output)   
output = agent.chat("How do I brew it?")    
print(output) 

Note that, for our follow-up question “how do I brew coffee”, **the agent answered differently** from when it was merely a query engine. This is because agents can make their own decision about whether to look up from our notes. If they feel _confident enough_ to answer the question, the agent may choose to not use any tool at all. Our question of “how do I …” can be interpreted both ways: either about generic options, or factual recollections. Apparently, the agent chose to understood it the former way, whereas our query engine (which has a duty of looking up documents from the index) had to pick the latter.

Interestingly, agents are a use case that **LangChain** decided to provide a high-level abstraction for:
  
  
from langchain.agents import AgentExecutor, Tool, create_react_agent  

  tools = [    
    Tool(    
        name="look_up_notes",    
        func=rag_chain.invoke,    
        description="Gives information about the user.",    
    ),  
]  
react_prompt = hub.pull("hwchase17/react-chat")    
agent = create_react_agent(llm, tools, react_prompt)    
agent_executor = AgentExecutor.from_agent_and_tools(agent=agent, tools=tools)  

  result = agent_executor.invoke(    
    {"input": "What do I like to drink?", "chat_history": ""}    
)    
print(result)   
result = agent_executor.invoke(    
    {    
        "input": "How do I brew it?",    
        "chat_history": "Human: What do I like to drink?\nAI: You enjoy drinking coffee.",    
    }  
)  
print(result) 

Although we still had to manually manage the chat history, it’s much easier to make an agent compared to making a RAG chain. `create_react_agent` and `AgentExecutor` cover most of the wiring work under the hood.

## Summary

LlamaIndex and LangChain are two frameworks for building LLM applications. While LlamaIndex focuses on RAG use cases, LangChain seems more widely adopted. But how do they differ in practice? In this post, I compared the two frameworks in completing four common tasks:

1. Connecting to a **local LLM** instance and build a chatbot.
2. Indexing local files and building a **RAG system**.
3. Combining the two above and making a **chatbot with RAG capabilities**.
4. Converting the chatbot into an **agent**, so that it may use more tools and do simple reasoning.

I hope they help you make an informed choice for your LLM application. Also, good luck with your journey building your own chatbot!