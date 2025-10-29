---
title: "How GraphRAG Works Step-by-Step"
aliases: "Understanding Microsoft's GraphRAG: A Step-by-Step Guide"
topics:
  - "[[Künstliche Intelligenz]]"
tags:
  - "Clipping"
lang: "en-US"
source: "Towards AI"
url: "https://pub.towardsai.net/how-microsofts-graphrag-works-step-by-step-b15cada5c209"
authors:
  - "Mariana Avelino"
published: 2025-05-06T16:17:58+02:00
created: 2025-06-12T09:16:38+02:00
description: "Explore how Microsoft’s GraphRAG works step-by-step from Graph Creation to Local and Global Search using real examples and code insights."
starred: false
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_list")
```

# How GraphRAG Works Step-by-Step

> [!info]- Abstract
> This article explores Microsoft's GraphRAG system, which enhances retrieval-augmented generation (RAG) using graph structures. It details the process from graph creation, including entity extraction and community partitioning, to querying using local and global search methods. Real-world examples, such as indexing and querying the book 'Penitencia' by Pablo Rivero, are used to illustrate the system's functionality. The article also provides insights into the configuration and potential for customization of the GraphRAG setup.


The leading AI community and content platform focused on making AI accessible to all. Check out our new course platform: [https://academy.towardsai.net/courses/beginner-to-advanced-llm-dev](https://academy.towardsai.net/courses/beginner-to-advanced-llm-dev)

[Follow publication](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fsubscribe%2Fcollection%2Ftowards-artificial-intelligence&operation=register&redirect=https%3A%2F%2Fpub.towardsai.net%2Fhow-microsofts-graphrag-works-step-by-step-b15cada5c209&collection=Towards+AI&collectionId=98111c9905da&source=post_page---post_publication_sidebar-98111c9905da-b15cada5c209---------------------post_publication_sidebar------------------)

Perhaps you’ve come across the paper [*From Local to Global: A GraphRAG Approach to Query-Focused Summarization*](https://arxiv.org/pdf/2404.16130), which is Microsoft Research’s take on Retrieval Augmented Generation (RAG) using knowledge graphs. Perhaps, you felt like some sections in the paper were vague. Perhaps, you wished the documentation more thoroughly explained how information gets retrieved from the graph. If that sounds like you, read on!

I’ve dug through the code, so you don’t have to, and in this article, I’ll describe each step of the GraphRAG process in detail. You’ll even learn a search method that the paper didn’t mention at all (Local Search).

## What Is GraphRAG?

In one sentence, GraphRAG is an enhancement to retrieval-augmented generation that leverages graph structures.

There are different implementations of it, here we focus on Microsoft’s approach. It can be broken down into two main steps: **Graph Creation** (i.e. Indexing)and **Querying** (of which there are three possibilities: **Local Search**, **Global Search** and **Drift Search**).

I’m going to use a real-world example to walk you through Graph Creation, Local Search, and Global Search. So without further ado, let’s index and query the book *Penitencia* by Pablo Rivero using GraphRAG.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*__ksMA_1nQzEPmMWY4f82A.png)

Key GraphRAG steps: Graph creation and graph querying

## Set-Up

The GraphRAG [documentation](https://microsoft.github.io/graphrag/get_started/) walks you through project set-up. Once you initialize your workspace, you’ll find a configuration file (settings.yaml) in the ragtest directory.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*fdGLwAsqviPoV_3F2YcmGQ.png)

Project structure

I’ve added the book Penitencia to the input folder. For this article, I’ve left the config file untouched to use the default settings and indexing method (IndexingMethod.Standard).

## Graph Creation

To create the graph, run:

```hs
graphrag index --root ./ragtest
```

This triggers two key actions, **Entity Extraction from Source Document(s)** and **Graph Partitioning into Communities**, as defined in modules of the [workflows](https://github.com/microsoft/graphrag/tree/main/graphrag/index/workflows) directory of the GraphRAG project.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*236hUgsiyzDRSzfDco9ExA.png)

Modules implementing entity extraction and graph partitioning into communities. The numbers (yellow) show the order of execution.

## Entity Extraction

1.. In the *create\_base\_text\_units* module,documents (in our case, the book *Penitencia*) are split into smaller chunks of N tokens.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*rnXOFtT4nrW9W2ZT25b-7A.png)

The first five chunks of the book Penitencia. Each chunk is 1200 tokens long and has a unique ID.

2\. In *create\_final\_documents*, a lookup table is created to map documents to their associated text units. Each row represents a document and since we are only working with one document, there is only one row.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*O5OVQQEqU_69Hbo9_IqFQQ.png)

Table showing all documents by their IDs. For each document, all the associated chunks (i.e. text units) are listed by their IDs.

3\. In *extract\_graph*, each chunk is analyzed using an LLM (from OpenAI) to extract entities and relationships guided by this [prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/index/extract_graph.py).

During this process, duplicate entities and relationships may appear. For example, the main character *Jon* is mentioned in 82 different text chunks, so he was extracted 82 times — once for each chunk.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*vWvVKo_03ymKYkFYVhflPg.png)

Snapshot of the entity table. Entities are grouped by entity title and type. The entity Jon was extracted 82 times, as observable from the frequency column. The text\_unit\_ids and description columns contain a list of 82 IDs and descriptions, respectively, showing in which chunks Jon was identified and described from. By default, there are four entity types (Geo, Person, Event, and Organization).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*9U7ZqJshLNwbXXKNe_bdkw.png)

Snapshot of the relationship table. Relationships are grouped by source and target entities. For Jon and Celia, the description and text\_unit\_ids columns contain lists with 14 entries each, revealing that these two characters had relationships identified in 14 distinct text chunks. The weight columns shows the sum of the LLM-assigned relationship strength (weight is not the number of connections between source and target nodes!).

An attempt at deduplication is made by grouping together entities based on their title and type, and grouping together relationships based on their source and target nodes. Then, the LLM is prompted to write a detailed description for each unique entity and unique relationship by analyzing the shorter descriptions from all occurrences (see [prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/index/summarize_descriptions.py)).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*97HonYDX3XrCI9u-MwBMGA.png)

Snapshot of the entity table with the final entity description (composed from all extracted short descriptions).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*yyi64HbKmk1M9Ec7zWRMBQ.png)

Snapshot of the relationship table with the final relationship description (composed from all extracted short descriptions).

As you can see, deduplication is sometimes imperfect. Furthermore, GraphRAG does not handle entity disambiguation (e.g. *Jon* and *Jon Márquez* will be separate nodes despite referring to the same individual).

4\. In *finalize\_graph*, the NetworkX library is used to represent the entities and relationships as the nodes and edges of a graph, including structural information like node degree.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*4u1MwbEIaO7Me5XPmAlGLg.png)

Snapshot of the final entity table where each entity represents a node in the graph. A node’s degree is the number of edges it has (i.e. the number of other nodes that it connects to).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*1ElqWqY-y0O634-HiTjuGQ.png)

Snapshot of the final relationship table where each relationship represents an edge in the graph. An edge’s combined\_degree represents the sum of source and target node degrees. An edge with a high combined\_degree is important because it links highly-connected nodes.

I find it helpful for understanding to actually see the graph, so I have visualized the result using Neo4j ([notebook](https://github.com/tomasonjo/blogs/blob/master/msft_graphrag/ms_graphrag_import.ipynb)):

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*rLptZuBxYSQKLvnOQ11Adg.png)

The book Penitencia visualized as a graph using Neo4j

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*O2MWOcAc9tPHFkmQ3xRseg.png)

The entity Jon and his relationships visualized using Neo4j

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*4TJdxg0LS2yGfrgo3poOfw.png)

The relationship between Laura and Mario visualized as a graph edge using Neo4j

## Graph Partitioning into Communities

5\. In *create\_communities*, the graph is partitioned into communities using the **Leiden algorithm**, a hierarchical clustering algorithm.

A community is a group of nodes that are more closely related to each other than to the rest of the graph. The hierarchical nature of the Leiden algorithm allows for communities of varying specificityto be detected, which is reflected in their level. The higher the level, the more specific the community (e.g. level 3 is quite specific, whereas level 0 is a root community and very generic).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*fvPLD-9pbMZe2R-HrP0sEQ.png)

Snapshot of the community table. Community 0 is a level 0 community, making it a root community (has no parent). It has two sub-communities, as seen in the children column. All the relationships, text units, and entities encapsulated by the community are listed in respective columns. The size columns shows the community is made up of 131 entities.

If we visualize each community as a node, including the entities belonging to the community, we can make out clusters.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*zVqfVLhVdDD3poDz3-Ekhg.png)

The Penitencia graph filtered for IN\_COMMUNITY relationships reveals 15 root level communities (red circles)

The value of communities lies in their ability to unite information from a wide range of sources, like entities and relationships, thereby providing big-picture insights. For books, communities can reveal overarching themes or topics within the text, as well will see in Step 8.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*PeWXt1RIj6kzehjB2C9GBQ.png)

Neo4j visualization of three hierarchically connected communities: Community 2 (Celia Gómez and the Tetuán Incident) — \[parent of\]→ Community 23 (Celia’s Desperation and Familial Violence) — \[parent of\]→ Community 42 (Celia’s Struggle with Laura). Rank is the LLM-assigned importance of the community from 1 (lowest importance) to 10 (highest importance).

6\. In *create\_final\_text\_units*, the text unit table from Step 1 has the entity IDs, relationship IDs and covariate IDs (if any) mapped to each text unit ID for easier lookup.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*e_fhIIut72xoTJwi5-pypw.png)

Snapshot of final text units table

Covariates are essentially claims. For example, “Celia murdered her husband and child (suspected).” The LLM deduces them from the text units guided by this [prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/index/extract_claims.py). By default, covariates are not extracted.

7\. In *create\_community\_reports*, the LLM writes a report for each community, detailing its main events or themes, and a summary of the report. The LLM is guided by this [prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/index/community_report.py) and receives as context all the entities, relationships and claims from the community.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*r17jR5sbKV8i87d_hogLOg.png)

Snapshot of a table showing an intermediate step before report generation. For each community, all entities and relationships are collected, then structured into a string to be passed to the LLM as context. The column context\_exceed\_limit alerts the algorithm when the context\_string needs to be shortened.

For large communities, the context string (which includes entities, relationships and, possibly, covariates) might exceed the *max\_input\_length* specified in the config file. If that happens, the algorithm has a method to reduce the amount of text in the context, involving **Hierarch Substitution** and, if necessary, **Trimming**.

In Hierarchal Substitution, the raw text from entities, relationships, claims is replaced by the community reports of sub-communities.

For example, suppose Community C (level 0) has the sub-communities S1 and S2 (both level 1). Community S1 is larger in size (has more entities) than S2. Given this situation, all entities, relationships, and claims in C which are also in S1 are replaced by the community report of S1. This prioritizes the biggest reduction in token count. If context length still exceeds *max\_input\_length* after this change, then S2 is used to replace relevant entities and relationships in C.

If after hierarchal substitution, the context is still too long (or the community had no sub-communities to begin with), then the context string needs **Trimming —** less relevant data is simply excluded. Entities and relationships are sorted by their node degrees and combined degrees, respectively, and those with the lowest values are removed.

Ultimately, the LLM uses the provided context string to generate findings about the community (a list of 5–10 key insights) and a summary. These are joined to form the community report.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*N2BOIkoSoSDe0B6Ew-HLiQ.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*AmfBbhJB9Qgisc1cGE4lFQ.png)

Snapshot of the community table including LLM-generated reports (full\_content column) and report summaries (summary column). The report text is a combination of the summary (red) and findings (blue). The columns rank and rating\_explanation contain an LLM-assigned value of importance for the community (between 1 and 10) and a justification for the chosen value, respectively.

8\. Finally, in *generate\_embeddings*, embeddings for all text units, entity descriptions, and full\_content texts (community title + community summary + community report + rank + rating explanation) are created using the Open AI embedding model specified in the config. The vector embeddings allow for efficient semantic searching of the graph based on a user query, which will be necessary during Local and Global Search.

## Querying

Once the graph is built, we can start querying it. The implementation of the search functionalities can be found in the [structure\_search](https://github.com/microsoft/graphrag/tree/main/graphrag/query/structured_search) directory of the GraphRAG project.

## Local Search

If you have a specific question, use the **Local Search** function provided by GraphRAG (additional example usage in [notebook](https://microsoft.github.io/graphrag/examples_notebooks/local_search/)).

```hs
graphrag query \
--root ./ragtest \
--method local \
--query "What kind of retribution is Laura seeking, and why?"
```
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*3c4GgCQh-ZgKq-4NV4nP4A.png)

Key step in Local Search

1.. Community reports, text units, entities, relationships and covariates (if any) are loaded from the parquet files in ragtest/output/, where they have been saved automatically following graph creation.

Then, the user query is embedded and its semantic similarity to the embedding of each entity description is calculated.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*E5h_BYDvMqHmASEUQeMmLw.png)

Snapshot of entities and their cosine distance to the user query

The N most semantically similar entities are retrieved. The value of N is defined by the hyperparameter *top\_k\_mapped\_entities* in the config*.*

Oddly, GraphRAG oversamples by a factor of 2, effectively retrieving 2 \* top\_k\_mapped\_entitiesentities. This is done to ensure that sufficient entities are extracted, because sometimes the retrieved entity has an invalid ID.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*PRI78P_tUSlvZKLl4TgjZg.png)

Snapshot of the entities that are most semantically similar to the user query. In this example, top\_k\_mapped\_entities=10, so 20 entities should have been retrieved with oversampling but only 17 had valid IDs, so 17 entities were actually retrieved. The rank column displays the entity node’s degree.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*EX-zFRosP8PMvCP8Qr-thg.png)

Summary diagram: Retrieval of extracted entities in Local Search

2\. All extracted entities become **candidate entities.** The communities, relationships, and text units of extracted entities become **candidate communities, candidate relationships**, and **candidate text units**.

Specifically:

- Candidate communities are all communities that include at least one extracted entity.
- Candidate relationships are all graph edges where an extracted entities is either a source or a target node.
- Candidate text units are the chunks from the book that contain at least one extracted entity.
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*c66Ow0dUSa5Atkjc6rf1bQ.png)

Summary diagram: Selection of candidate communities, entities, relationships and text units in Local Search

3\. The candidates are sorted, with the most relevant items placed at the top of their respective lists. This ensures that the most important information is prioritized for answering the query.

Prioritization is necessary, because LLM context length is not infinite. There is a limit to how much information can be passed to the model. Hyperparameters set in the config determine how many context window tokens are allocated to entities, relationships, text units, and communities. By default, *text\_unit\_prop* =0.5 and *community\_prop* =0.1, meaning that 50% of the *max\_tokens* specified in the config will be occupied by text units, 10% by community reports, leaving 40% for descriptions from entities and relationships. *max\_tokens* defaults to 12 000.

- Communities are sorted by their number of *matches*, that is the number of distinct text units in which extracted entities of the community appear. In case of a tie, they are sorted by their *rank* (LLM-assigned importance). Given *max\_tokens* =12000 and *community\_prop* =0.1, then community reports can occupy up to 1200 tokens. Only entire community reports are allowed, meaning there is no truncation — either a community report is included in its entirety or not at all.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*7mRyNy895X0ilzMbJSmgEQ.png)

Snapshot of candidate communities sorted by matches and rank. Matches are the number of distinct text units in which extracted entities appear. Rank is the importance score of the community, as decided by the LLM.

- Candidate entities are not sorted, keeping the entities in the order of their semantic similarity to the user query. As many candidate entities as possible are added to the context. If 40% of *max\_tokens* are allocated to entities and relationships that means up to 4800 tokens are available.
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*OXthljuxinTJiZIEwJCyQw.png)

Snapshot of candidate entities

- Candidate relationships are prioritized differently depending on whether they are *in-network* or *out-network* relationships. In-network being relationships between two extracted entities. Out-network being relationships between an extracted entity and another one that is not part of the extracted entity set. Candidate relationships that are in-network are sorted by their *combined\_degree* (sum of source and target node degrees). Candidate relationships that are out-network are sorted first by the number of *links* that the out-entity has to in-entities, then by *combined\_degree* in case of a tie.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*Ac-dm7dUkLYv7jkUUcCcLA.png)

Table showing in-network relationships. The rank columns shows the combined\_degree.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*DTsm0i2JrXYSa2HsrRxscg.png)

Snapshot of table showing out-network relationships. The rank column shows the combined\_degree and the attributes columns shows the number of links of the out-entity to in-entities (Crímenes, Papás de Laura, and Laura).

Finding in- and out-network relationships is an iterative process that stops as soon as the available token space is filled (in our example, *available\_tokens = 4800 — entity\_descriptions*). In-network relationships are added to the context first, as they are considered more important. Then, space allowing, the out-network relationships are added.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*uDovY2iPBrLb83JnJU9m6g.png)

Snapshot of prioritized candidate relationships. Observe that the two first rows are the in-network relationships. Weight is not used by default and links are outdated/ incorrect for in-network relationships.

- Candidate text units are sorted by extracted entity order, followed by the number of extracted entity relationships associated with the text unit. Entity order ensures that the text units mentioning entities that are the most semantically similar to the user query get prioritized. For example, if Crímenes is the most semantically similar entity to the user query and text unit CB6F… is a chunk where Crímenes was extracted from, then CB6F… will be at the top of the list, even if there are few extracted entity relationships associated with it.
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*yOspJ4aXQE7iK8yxFJFZKA.png)

Snapshot of table showing prioritized text units

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*60c15kuj0M4TeuGO9FWVeQ.png)

Every graph edge (relationship) has a property which informs from which text units it was extracted. This property makes it possible to trace the relationship of an extracted entity to the text units where it was detected.

Given *max\_tokens* =12000 and *text\_unit\_prop* =0.5, then community reports can occupy up to 6000 tokens. As in the case of community reports, text units are appended to the context until the token limit is reached, without truncation.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*YmLBNUWbTXCBNV6BWoxE2Q.png)

Summary diagram: Sorting of candidate communities, entities, relationships and text units in Local Search

4\. Finally, the descriptions of the prioritized community reports, entities, relationships, and text units — in this order — are concatenated and provided as context to the LLM, which generates a detailed response to the user query.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*0YWOQbh0ZzssURov1f9OoA.png)

Summary diagram: Response generation to the user query in Local Search

## Global Search

If you have a general question, use the **Global Search** function (additional example usage in [notebook](https://microsoft.github.io/graphrag/examples_notebooks/global_search/)).

```hs
graphrag query \
--root ./ragtest \
--method global \
--query "What themes are explored in the book?"
```

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*oH6Ypt8EyaVd-OP-3CphZQ.png)

Key steps in Global Search

1.. Community reports and entities are loaded from the parquet files where they have been saved.

For each community, an *occurence\_weight* is calculated. *occurence\_weight* represents the normalized count of distinct text units where entities associated with the community appear. The value reflects how prevalent the community is throughout the document(s).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*3_K-iPJkpsMOhugKRL3NKA.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*nVcVVBAgTkGfg0J9M0S72A.png)

Snapshot of community table

2\. All communities are shuffled, then batched. Shuffling reduces bias by ensuring that not all the most relevant communities are collected in the same batch.

Each batch has its communities sorted by their *community\_weight*. Essentially, communities whose entities appear in multiple text chunks are prioritized.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*h5tO8eEJWB76pExdfO1D9A.png)

Summary diagram: Batching of communities in Global Search

3\. For each batch, the LLM generates multiple responses to the user query using the community reports as context and assigns a score to each response to reflects how helpful it is in answering the user’s question ([prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/query/global_search_map_system_prompt.py)). Usually 5 responses are generated per batch.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*AY8SQdxlqNmDDdr1qjKtvg.png)

Summary diagram: Response generation for each batch in Global Search

All responses are ranked by their scores and any response with a score of zero is discarded.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*I61rPlUYZxXlzuqnyjf8Ag.png)

Table showing all responses to the user question sorted by their score. The analyst column represents the batch ID.

4\. The texts of the sorted responses are concatenated into a single input, which is passed to the LLM as context to produce a final answer to the user’s question ([prompt](https://github.com/microsoft/graphrag/blob/main/graphrag/prompts/query/global_search_reduce_system_prompt.py)).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*vtqNDw0v3GCyZgly4LKk6g.png)

Summary diagram: Final response generation in Global Search

## Conclusion

This article has walked you step-by-step through Graph Creation, Local Search, and Global Search as implemented by Microsoft GraphRAG using real data and code-level insights. While the official [documentation](https://microsoft.github.io/graphrag/get_started/) has improved significantly since I started using the project in early 2024, this deep dive fills in knowledge gaps and shines a light on what’s happening under the hood. To date, it’s the most detailed and up-to-date resource on GraphRAG that I’ve encountered and I hope you’ve found it useful.

Now, I encourage you to go beyond the default configuartion: Try tweaking parameters, fine-tuning the entity extraction prompt, or using a different indexing method. Experiment and harness the power of GraphRAG for your own projects!