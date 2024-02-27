---
id: f393b7ef-8395-444f-b65f-5ac315ea9daf
title: |
  Update Properties of Files from Search Results in Bulk - Help - Obsidian Forum
topics: 
aliases: 
tags:
  - Obsidian
  - Programmieren
created: 2024-01-20 13:05:40
published: 2023-12-05 17:38:51
URL: https://forum.obsidian.md/t/update-properties-of-files-from-search-results-in-bulk/72510/2
Omnivore-URL: https://omnivore.app/me/update-properties-of-files-from-search-results-in-bulk-help-obsi-18d26c3283d
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%%% END A %%

# Update Properties of Files from Search Results in Bulk - Help - Obsidian Forum

> [!info] Info
> 
> This could be something people might be interested in.  There are things you can query within Obsidian only, e.g. (lack/number of) backlinks. You cannot do this in VSCode or other text editors.  So how to update Properties (YAML fields) only in certain files, in the results of a query (in this case, a DataView query)?  Late last night, I fiddled with the Projects community plugin, looking for a solution.  (As far as I know, the MetaData Menu plugin makes it possible to update DataView table prop...


## Inhalt

I think the main problem is that your query returns a list of links, and a second column, instead of a single list of file links. This means that the `f.path` isn’t valid and it v seems to create some havoc elsewhere.

So you either need to change your query so that it is using `LIST` on a single level, or you need to change and add another level of looping around the file&frontmatter stuff.

Yes, I was thinking that too. But when hours before I was using other types of queries (which may not have qualified either, granted) and it was those which spewed the other error.

As for the other thing, create vs. update (update is like rename: delete + create, right, says the non-programmer in me), minutes after my post I got thinking I shouldn’t use the tags I’m using; rather I should use status key with one field. Tags have their own advantages and before Properties came along, we could only list tags. I could convert those tags to status fields to more easily manipulate them (without having to resign myself to search&replace jobs), but that would entail rewriting some 10-12 Templater scripts (wouldn’t take long, of course).

I will do that tomorrow (today; in Europe), and will get back to you.

Cheers

After rereading your script I do see that you’re setting the value of `fm["tags"]`, not changing the list which would be needed to preserve other tags.

With that in mind I think it’s safer to use a dedicated status property to avoud interference with other tags. Then you can change it to your hearts desire and not worry about side effects related to other potential tags.

If you want to keep using the tags property you’ll also need to do the remove and insert operations in order to preserve other tags.

Yep.

And I don’t really need to rewrite my Templater scripts as they are all search and replace operations.  
Only need to do regex replace for whole vault, but I’ve done that like 15 times over the last year… 

I converted the tags in question to status fields, then I tried the script, to no avail.

Even the example script using test files in yesterday’s test vault didn’t work.  
I tried making a Templater Js script with the DV API, but couldn’t make it work. For that I needed to move the file into my Templater folder. When I reverted to the DVJs version, and moved back the file into the folder where the test files resided, it worked again.

It is some kind of bug with DataView. I tried on Linux, then on Windows, and then I found this thread:

So in any case, the logic sticks and it works, but there are many ifs and inconsistencies.

There is usually a better explanation than it’s just a bug, but hard to tell when we don’t see any query.

Your query, your properties, even the file names were the same.  
It is some kind of indexing issue (both Linux and Windows environments were freshly indexed after making full-vault changes). Strange thing is, the testing was done in a separate test vault.

I tried a non-tp way (Obsidian API) as well, with similar reading error.

I like to end all things on a good note. In spite of trying and failing to iron out the kinks of the programmatic solution, and still saying it is a neat but not too user-friendly way of handling it, and bearing it mind I had the general user base in mind when I started out making this thread, I’d like to refer back to the GUI solution with the Projects plugin (which seems far more integrated to core Obsidian than the other plugin mentioned by me above).  
Unfortunately, it doesn’t have a docs or how-to page, and I don’t mean to go into details, either.

But the usage is simple: you can use it without DataView installed or enabled but the real power is with DataView and even if a red rectangle appears about it being a read-only status, you can create and even update fields in batch safely, with the same `Add field` button.  
Status fields are updated without creating duplicate YAML keys (or properties). A slight beef is that you cannot create new tags if there is one already in your list of tags. It will be updated with the new one given.

I’m wondering, but it’s hard to test and debug when it’s not happening in my vault, that your error is caused not by a bug in _dataview_ but rather by trying to access file details of part of a non-existing file. At least that is what the error message eludes at…

I am using the Obsidian program as interface. In the folder structure, the files are there. Plugins are installed and enabled. DataviewJs example script kindly shared by you (and working twice before) is there, example files with properties used by you are there. I even went out of my way to put in all properties used in if clauses in the script, although even I know how if clauses work: if there is no match, it goes to the next step.

So the file read issue comes from somewhere and after 2-3 hours of trying to find a cause so I can get past this and maybe file away a nice snippet I could use sometime later, I had to leave this behind, being out of ideas now.

Even the trick of moving the file out of the folder and moving it back (as a way to update the index?) didn’t work a second or third time. There is something off.

If you’ve localised the issue to be within a given folder of files and queries, would it be an option to zip that stuff together and post it here, so someone could look at it?

(And I have to ask, you are on the last version of Obsidian and _Dataview_ and so on? )

I could do that, actually, but I probably won’t.

As for the second question, after doing my bit with the chat robot trying to find the problem, the latter part of the day was spent on GH issues pages of the Metadata Menu, Projects and DataView plugins, and I actually copied out some URL’s where there is talk of issues or stuff not working, etc., but I am simply not cut out for investigating – simply because my main vault rarely needs needs update jobs and I’m not too personally interested in the quirks of databases, etc.

So yes, I even thought about rolling back versions of DataView and Templater as I have latest versions.

I rolled back DataView version for a try – nothing.

I used the script in a Sandbox vault, on four files having the exact same properties in files – same error.

I forgot to mention with Chat-GPT I made various scripts with console logs after each line and checked the Obsidian console for progress. It found the files but cannot update frontmatter.  
I am doing this again in Sandbox vault:  

[![Screenshot from 2023-12-08 15-11-48](https://proxy-prod.omnivore-image-cache.app/690x219,sxoXWWjN7AJWZIAkpJx4KJwrFvuJhpDwKjVH-3TOfbyQ/https://forum.obsidian.md/uploads/default/optimized/3X/5/f/5fdbe9e33f8577baebce6eb3df25348671edc5d2_2_690x219.png)](https://forum.obsidian.md/uploads/default/original/3X/5/f/5fdbe9e33f8577baebce6eb3df25348671edc5d2.png "Screenshot from 2023-12-08 15-11-48")

Script used:

```stata
```dataviewjs
const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;

// Get files from a specific folder or directory
const folderPath = "Script try";
const files = app.vault.getMarkdownFiles().filter(file => file.path.startsWith(folderPath));

console.log('Number of files to process:', files.length);

for (const file of files) {
  console.log('Processing file:', file.path);

  const tFile = await tp.file.find_tfile(file.path);
  if (tFile) {
    console.log('Found file:', tFile.path);

    try {
      await app.fileManager.processFrontMatter(tFile, (frontmatter) => {
        console.log('Existing frontmatter:', frontmatter);

        // Update the 'one' property
        frontmatter['one'] = 'second';

        console.log('Updated frontmatter:', frontmatter);
      });
    } catch (error) {
      console.error('Error processing frontmatter:', error);
    }
  } else {
    console.log('File not found:', file.path);
  }
}
```

```