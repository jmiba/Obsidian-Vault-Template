---
id: fb1871b5-713a-4bcb-9125-edd9b1f3323d
title: |
  Warum Hochschulen jetzt eigene Sprachmodelle hosten sollten - Wiarda-Blog
topics:
  - "[[Open Science]]"
  - "[[Künstliche Intelligenz]]"
aliases: 
tags:
  - Technologie/KI
  - LLM
  - Hochschule/Politik
  - Service
created: 2024-01-26 09:11:29
published: 2024-01-26 10:23:00
URL: https://www.jmwiarda.de/2024/01/26/warum-hochschulen-jetzt-selbst-sprachmodelle-hosten-sollten/
Omnivore-URL: https://omnivore.app/me/warum-hochschulen-jetzt-eigene-sprachmodelle-hosten-sollten-wiar-18d44d2e91e
related:
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%
# Meine Notes
## Zum Thema "Open Science":

- [[Notizensammlung/Themen/Open Science.md|Open Science]] (21.03.2025)
## Zum Thema "Künstliche Intelligenz":

- [[Notizensammlung/Themen/Künstliche Intelligenz.md|Künstliche Intelligenz]] (17.03.2025)
- [[Notizensammlung/Obsidian-Plugin Textgenerator einrichten.md|Obsidian-Plugin Textgenerator einrichten]] (26.02.2024)
- [[Notizensammlung/Obsidian-Plugin Smart Connections einrichten.md|Obsidian-Plugin Smart Connections einrichten]] (26.02.2024)
- [[Wissensmanagement/Second Brain mit KI.md|Second Brain mit KI]] (19.02.2024)

# Relevante Literatur
## Zum Thema "Open Science":

- [[04 Literatur-Notes/Omnivore/MIT OpenCourseWare - Free Online Course Materials.md|MIT OpenCourseWare - Free Online Course Materials]] (22.02.2024)
- [[04 Literatur-Notes/Zotero/Publizieren als Grundlage der Wissenschaftbewertung (2022).md|Publizieren als Grundlage der Wissenschaftbewertung (2022)]] (19.05.2022)
## Zum Thema "Künstliche Intelligenz":

Noch keine Zusammenhänge in "Relevante Literatur" für das Thema "Künstliche Intelligenz"!

%% END A %%

# Warum Hochschulen jetzt eigene Sprachmodelle hosten sollten - Wiarda-Blog

> [!info] Info
> 
> ChatGPT und Co sind eine Herausforderung für das Lernen und Lehren. Und eine einmalige Chance für die Hochschulen: Wenn sie jetzt selbst zu Anbietern freier Sprachmodelle werden, stärken sie ihre Lehre, Forschung und digitale Autonomie. Ein Gastbeitrag von Benjamin Paaßen


## Inhalt

![](https://proxy-prod.omnivore-image-cache.app/0x0,s0YEsoICdCQdOpiQHbRu-IvrI_FkrIhCx_8eE7EjAb0M/https://image.jimcdn.com/app/cms/image/transf/dimension=683x10000:format=jpg/path/sa713b979cfc135b5/image/i937a87cab93591bf/version/1706171072/image.jpg) 

**Benjamin Paaßen** ist Juniorprofessor für Wissensrepräsentation und Maschinelles Lernen an der Universität Bielefeld und Senior Researcher im Educational Technology Lab des Deutschen Forschungszentrums für Künstliche Intelligenz (DFKI). Foto: Studio Monbijou. 

 SEIT ZEHN JAHREN forsche ich zum Einsatz von Methoden der Künstlichen Intelligenz (KI) in der Bildung – bislang ein Nischenthema, denn die Digitalisierung in der Bildung, von Künstlicher Intelligenz ganz zu schweigen, [schreitet hierzulande nur langsam voran](https://www.bmbf.de/SharedDocs/Publikationen/de/bmbf/3/31715%5FFortschrittsbericht%5FDigitalPakt%5FSchule%5F2019%5Fbis%5F2022.pdf "https://www.bmbf.de/SharedDocs/Publikationen/de/bmbf/3/31715_Fortschrittsbericht_DigitalPakt_Schule_2019_bis_2022.pdf"). Im Jahr 2023 konnte ich mich plötzlich vor Vortrags- und Interviewanfragen kaum retten: ChatGPT war über das deutsche Bildungssystem hereingebrochen, und nun wünschte man sich seitens der KI-Expert\*innen Einordnung und Rat. 

 Mein Eindruck aus all diesen Gesprächen und Begegnungen: Lehrende und Lernende sind sich im Wesentlichen einig, dass es keinen Sinn ergibt, Sprachmodelle wie ChatGPT (englisch: _large language models_ oder LLM) zu verbieten. Zum ersten, weil ein solches Verbot ohnehin nicht durchsetzbar wäre, denn es gibt bis dato keinen verlässlichen Weg, Erzeugnisse von LLM von menschlichen Texten zu unterscheiden. Zum zweiten (und wichtiger), weil wir den Anspruch haben sollten, Lernenden beizubringen, wie mit den neuen Technologien verantwortungsvoll umzugehen ist. Zum dritten, weil LLM als Werkzeuge für das Lernen und Lehren [große Potenziale haben](https://www.sciencedirect.com/science/article/abs/pii/S1041608023000195?via%3Dihub "https://www.sciencedirect.com/science/article/abs/pii/S1041608023000195?via%3Dihub"). Die ständige wissenschaftliche Kommission (SWK) der Kultusministerkonferenz beispielsweise [plädierte kürzlich](https://www.jmwiarda.de/2024/01/17/wir-brauchen-eine-kultur-des-ausprobierens/ "https://www.jmwiarda.de/2024/01/17/wir-brauchen-eine-kultur-des-ausprobierens/") erst für die Nutzung von LLM im Unterricht.

 Um diese Potenziale zu erschließen, müssen sie Lernenden und Lehrenden allerdings so zur Verfügung gestellt werden, dass eine verantwortungsvolle Nutzung überhaupt möglich wird. Überspitzt gefragt: Können wir Lehrkräften guten Gewissens empfehlen, die Daten der eigenen Lernenden auf die Server eines US-Konzerns zu übertragen? Können wir gleiche Bedingungen zwischen Lernenden sicherstellen, wenn der Zugang zu den Modellen kostenpflichtig ist? Und wollen wir uns im Bildungssystem überhaupt davon abhängig machen, dass Unternehmen die Modelle verlässlich zu akzeptablen Bedingungen zur Verfügung stellen? Viele würden diese drei Fragen verneinen.

 Glücklicherweise haben die Hochschulen jetzt die einmalige Chance, dem gesamten Bildungssystem eine Alternative anzubieten – und zwar, indem sie sich strategisch dazu entscheiden, selbst LLM bereitzustellen. Transparent, kostengünstig und verlässlich.

Drei Zutaten für  
 eigene Sprachmodelle 

 Dafür braucht es drei Zutaten: Erstens die trainierten Modelle selbst. Diese sind unter freier Lizenz ("open source") auf Seiten wie huggingface.co zu finden. Zweitens die Recheninfrastruktur, um die Modelle zu betreiben, vor allem Server mit starken Grafikkarten. Drittens, am wichtigsten, die Expertise, um die aktuell leistungsfähigsten LLM auszuwählen, auf die eigene Infrastruktur zu bringen und einfache Benutzungsschnittstellen für Lernende und Lehrende bereit zu stellen.

 Viele Institutionen verfügen über Zutaten eins und zwei – aber kaum jemand ist im Hinblick auf die dritte Zutat so gut aufgestellt wie die Hochschulen. Eine besonders gute Ausgangslage haben Standorte mit einer starken LLM-Forschung, etwa die TU Darmstadt oder die LMU München. Aber auch an vielen anderen Hochschulen (meine Universität eingeschlossen) wurde seit 2022 rapide Expertise zu LLM-Forschung aufgebaut – und im gleichen Zuge die nötige Recheninfrastruktur beschafft.

 Ganz ohne Investitionen wird es freilich nicht gehen. LLM für die Forschung zu betreiben ist naturgemäß etwas Anderes, als sie im Rahmen eines Web-Service für Millionen von Lernenden und Lehrenden bereit zu stellen. Daher wird es voraussichtlich nötig sein, Serverkapazitäten auszudehnen und Personal auf Dauerstellen dafür einzusetzen, die Server, Modelle und Schnittstellen stets aktuell zu halten und die Nutzenden zu betreuen. Dafür braucht es Fördermittel von Bund und Ländern. Aber in überschaubarer Höhe. Pro teilnehmende Hochschule belaufen sich die Kosten für den Hochlauf im ersten Jahr voraussichtlich auf nicht mehr als eine Million Euro.

 Ziel sollte es sein, in jedem Bundesland mindestens eine Hochschule zu finden, die frei lizensierte LLM für alle Hochschulen und Schulen (mindestens für die Sekundarstufe, wie v[on der KMK empfohlen](https://www.jmwiarda.de/2024/01/17/wir-brauchen-eine-kultur-des-ausprobierens/ "https://www.jmwiarda.de/2024/01/17/wir-brauchen-eine-kultur-des-ausprobierens/")\]) im Bundesland bereitstellt. Mit diesen LLM können Lernende und Lehrende den verantwortungsvollen Umgang lernen bzw. eigene pädagogische Konzepte entwickeln. Nicht nur das: Die Hochschulen können mit den Daten der Lernenden und Lehrenden – informiertes Einverständnis vorausgesetzt – an der Entwicklung neuer Bildungstechnologien forschen, etwa weiter trainierter LLM oder neuer Nutzenden-Schnittstellen für das Bildungssystem. Forschung und Lehre könnten hier also Hand in Hand gehen.

 Schon in wenigen Monaten könnten wir technologisch oder vertraglich auf proprietäre Modelle festgelegt sein. Insofern ist die digitale Autonomie im Bildungssystem gefährdet, wovor Amrei Bahr und Maximilian Mayer in einem Gastbeitrag in der [_FAZ_](https://www.faz.net/aktuell/karriere-hochschule/hoersaal/ki-modelle-an-hochschulen-ausgang-aus-der-digitalen-unmuendigkeit-19434782.html "https://www.faz.net/aktuell/karriere-hochschule/hoersaal/ki-modelle-an-hochschulen-ausgang-aus-der-digitalen-unmuendigkeit-19434782.html") zu Recht gewarnt haben. Auch der [Wissenschaftsrat betont die Relevanz digitaler Souveränität in der Wissenschaft](https://www.wissenschaftsrat.de/download/2023/1580-23.html "https://www.wissenschaftsrat.de/download/2023/1580-23.html"). Um diese Souveränität zu wahren, ist es jetzt an den Hochschulen, die Initiative zu ergreifen. Es ist eine einmalige Chance, die die Hochschulen nutzen sollten – für ein starkes und zukunftsfähiges Bildungssystem, das sich nicht ohne Not von Privatunternehmen abhängig macht.

In eigener Sache: Blog-Finanzierung 

![](https://proxy-prod.omnivore-image-cache.app/0x0,syIOAHX7ZRo8AWz5Jh2-XtM1njggSbGb2-w6Bzl0fNRo/https://image.jimcdn.com/app/cms/image/transf/dimension=683x10000:format=jpg/path/sa713b979cfc135b5/image/iffa0a4f14f359f9b/version/1706080002/image.jpg) 

Welche guten Nachrichten ich in Sachen Blogfinanzierung habe, warum ich weiter dringend Ihre Unterstützung brauche – und welche Artikel im Dezember am meisten gelesen wurden. 

[_Mehr lesen..._](https://www.jmwiarda.de/2024/01/09/in-eigener-sache/ "https://www.jmwiarda.de/2024/01/09/in-eigener-sache/") 