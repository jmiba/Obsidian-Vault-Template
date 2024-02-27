var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => WordNetPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/EditSuggest.ts
var import_obsidian = require("obsidian");
var TheEditorSuggestor = class extends import_obsidian.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.updatePattern();
  }
  updatePattern() {
    this.pattern = new RegExp(`.*${this.plugin.settings.slashCommandShortcut}(.*)$`);
  }
  onTrigger(cursor, editor, _file) {
    if (this.plugin.settings.slashCommandEnabled === false)
      return;
    const range = editor.getRange({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: cursor.ch });
    const testResults = this.pattern.exec(range);
    if (!testResults)
      return null;
    else {
      const suggestText = testResults[1];
      this.lastEditorSuggestTriggerInfo = {
        start: { line: cursor.line, ch: cursor.ch - suggestText.length - this.plugin.settings.slashCommandShortcut.length },
        end: { line: cursor.line, ch: cursor.ch },
        query: testResults[1]
      };
      return this.lastEditorSuggestTriggerInfo;
    }
  }
  getSuggestions(context) {
    return this.plugin.dictionarySuggestor.query(context.query);
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.Term });
    el.createEl("br");
    el.appendText(item.Definition);
  }
  selectSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    this.close();
    if (evt.ctrlKey) {
      new import_obsidian.Notice(item.Term + " \n" + item.Definition, 6e4);
      currentView.editor.replaceRange(
        "",
        this.lastEditorSuggestTriggerInfo.start,
        this.lastEditorSuggestTriggerInfo.end
      );
    } else
      currentView.editor.replaceRange(
        this.plugin.renderDefinitionFromTemplate(item.Term, item.Definition),
        this.lastEditorSuggestTriggerInfo.start,
        this.lastEditorSuggestTriggerInfo.end
      );
  }
};

// src/suggester.ts
var import_obsidian2 = require("obsidian");
var DictionarySuggester = class extends import_obsidian2.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.setPlaceholder("type word to lookup in WordNet");
    setTimeout(async () => {
      const pathWordNetJson = this.plugin.manifest.dir + "/dict-WordNet.json";
      const adapter = this.app.vault.adapter;
      if (await adapter.exists(pathWordNetJson)) {
        const fileWordNet = await adapter.read(pathWordNetJson);
        this.wordNet = await JSON.parse(fileWordNet);
      } else {
        if (navigator.onLine === false) {
          new import_obsidian2.Notice("You do not have an internet connection, and the WordNet dictionary cannot be downloaded. Please restore your interent connection and resteart Obsidian", 3e4);
          this.plugin.unload();
        } else {
          const downloadMessage = new import_obsidian2.Notice("WordNet dictionary is being downloaded, this may take a few minutes. This message will disappear when the process is complete.", 0);
          try {
            const response = await (0, import_obsidian2.request)({ url: "https://github.com/TfTHacker/Obsidian-WordNet/releases/download/WordNetJson/dict-WordNet.json" });
            downloadMessage.hide();
            if (response === "Not Found" || response === `{"error":"Not Found"}`) {
              new import_obsidian2.Notice(`The WordNet dictionary file is not currently available for download. Please try again later or contact the developer on Twitter: @TfThacker for support.`, 3e4);
              this.plugin.unload();
            } else {
              this.wordNet = await JSON.parse(response);
              await adapter.write(pathWordNetJson, JSON.stringify(this.wordNet));
            }
          } catch (e) {
            console.log(`Error in WordNet dictinary: ${e}`);
            new import_obsidian2.Notice(`An error has occured with the download, please try again later: ${e}`);
            this.plugin.unload();
          }
        }
      }
      if (await adapter.exists(this.plugin.manifest.dir + "/dict-MyDict.json")) {
        const fileCustomDict = await adapter.read(this.plugin.manifest.dir + "/dict-MyDict.json");
        this.customDict = await JSON.parse(fileCustomDict);
      } else
        this.customDict = null;
    }, 10);
  }
  query(term) {
    const results = [];
    const searchTerm = term.toLocaleLowerCase();
    let countOfFoundMatches = 0;
    if (this.customDict != null) {
      for (let i = 0; i < this.customDict.length && countOfFoundMatches < 30; i++) {
        const item = this.customDict[i];
        if (item["SearchTerm"].startsWith(searchTerm)) {
          results.push(this.customDict[i]);
          countOfFoundMatches++;
        }
      }
    }
    countOfFoundMatches = 0;
    for (let i = 0; i < this.wordNet.length && countOfFoundMatches < 20; i++) {
      const item = this.wordNet[i];
      if (item["SearchTerm"].startsWith(searchTerm)) {
        results.push(this.wordNet[i]);
        countOfFoundMatches++;
      }
    }
    return results;
  }
  getItems() {
    let searchTerm = "";
    if (this.inputEl.value.trim().length == 0) {
      const currentView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
      if (currentView != null && currentView.getMode() != void 0 && currentView.editor.somethingSelected()) {
        searchTerm = currentView.editor.getSelection();
        this.inputEl.value = searchTerm;
        this.inputEl.setSelectionRange(0, searchTerm.length);
      }
    } else
      searchTerm = this.inputEl.value.trim();
    return searchTerm === "" ? [] : this.query(searchTerm);
  }
  getItemText(item) {
    return item.SearchTerm;
  }
  // @ts-ignore
  onChooseItem(item, evt) {
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.item.Term });
    el.createEl("br");
    el.appendText(item.item.Definition);
  }
  onChooseSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (currentView != null && currentView.getMode() === "source")
      currentView.editor.replaceSelection(this.plugin.renderDefinitionFromTemplate(item.item.Term, item.item.Definition));
    else
      new import_obsidian2.Notice(item.item.Term + " \n" + item.item.Definition, 1e4);
  }
};

// src/settings.ts
var import_obsidian3 = require("obsidian");
var import_obsidian4 = require("obsidian");
var DEFAULT_SETTINGS = {
  enableRibbon: true,
  slashCommandEnabled: true,
  slashCommandShortcut: ";;",
  insertTemplate: "**{term}**\n{definition}\n"
};
var WordNetSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("b", { text: "Ribbon Support" });
    new import_obsidian3.Setting(containerEl).setName("Enable Ribbon Support").setDesc("Toggle on and off the WordNet dictionary button in the ribbon.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbon);
      cb.onChange(async (value) => {
        this.plugin.settings.enableRibbon = value;
        if (this.plugin.settings.enableRibbon === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.configureRibbonCommand();
        await this.plugin.saveSettings();
      });
    });
    containerEl.createEl("b", { text: "Slash Command" });
    new import_obsidian3.Setting(containerEl).setName("Enable the Slash Command").setDesc("Toggle on and off the slash command.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.slashCommandEnabled);
      cb.onChange(async (value) => {
        this.plugin.settings.slashCommandEnabled = value;
        await this.plugin.saveSettings();
      });
    });
    let cbShortcut;
    new import_obsidian3.Setting(containerEl).setName("Slash Command Characters").setDesc(
      "The characters that will invoke the slash command. The command character cannot be a space."
    ).addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(async () => {
        this.plugin.settings.slashCommandShortcut = DEFAULT_SETTINGS.slashCommandShortcut;
        await this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
        cbShortcut.setValue(this.plugin.settings.slashCommandShortcut);
      });
    }).addText((cb) => {
      cbShortcut = cb;
      cb.setValue(this.plugin.settings.slashCommandShortcut);
      cb.onChange(async (value) => {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.slashCommandShortcut : value;
        this.plugin.settings.slashCommandShortcut = newValue;
        await this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
      });
    });
    containerEl.createEl("b", { text: "Template" });
    let cbTemplate;
    new import_obsidian3.Setting(containerEl).setName("Template for inserting a definition").setDesc(
      "The template used for inserting a WordNet definition. Use {term} for the term looked up and {definition} for the defintion of that term."
    ).addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(async () => {
        this.plugin.settings.insertTemplate = DEFAULT_SETTINGS.insertTemplate;
        await this.plugin.saveSettings();
        cbTemplate.setValue(this.plugin.settings.insertTemplate);
      });
    }).addTextArea((cb) => {
      cbTemplate = cb;
      cb.setValue(this.plugin.settings.insertTemplate);
      cb.onChange(async (value) => {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.insertTemplate : value;
        this.plugin.settings.insertTemplate = newValue;
        await this.plugin.saveSettings();
      });
      cb.inputEl.rows = 2;
      cb.inputEl.cols = 40;
    });
  }
};

// src/main.ts
var WordNetPlugin = class extends import_obsidian5.Plugin {
  configureRibbonCommand() {
    this.ribbonIcon = this.addRibbonIcon("book-open-check", "WordNet Dictionary", async () => {
      this.dictionarySuggestor.open();
    });
  }
  async onload() {
    console.log("loading WordNet plugin");
    await this.loadSettings();
    this.addSettingTab(new WordNetSettingTab(this.app, this));
    this.dictionarySuggestor = new DictionarySuggester(this);
    if (this.settings.enableRibbon)
      this.configureRibbonCommand();
    this.addCommand({
      id: "open-wordnet-suggestor",
      name: "Look up a word",
      callback: () => {
        this.dictionarySuggestor.open();
      }
    });
    this.editSuggester = new TheEditorSuggestor(this);
    this.registerEditorSuggest(this.editSuggester);
  }
  onunload() {
    console.log("unloading WordNet plugin");
  }
  renderDefinitionFromTemplate(term, definition) {
    return this.settings.insertTemplate.replace("{term}", term).replace("{definition}", definition);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiLCAiLi4vc3JjL0VkaXRTdWdnZXN0LnRzIiwgIi4uL3NyYy9zdWdnZXN0ZXIudHMiLCAiLi4vc3JjL3NldHRpbmdzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBQbHVnaW4gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBUaGVFZGl0b3JTdWdnZXN0b3IgZnJvbSBcIi4vRWRpdFN1Z2dlc3RcIjtcbmltcG9ydCBEaWN0aW9uYXJ5U3VnZ2VzdGVyIGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuaW1wb3J0IHsgV29yZE5ldFNldHRpbmdUYWIsIFdvcmROZXRTZXR0aW5ncywgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmROZXRQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogV29yZE5ldFNldHRpbmdzO1xuXHRyaWJib25JY29uOiBIVE1MRWxlbWVudDtcblx0ZGljdGlvbmFyeVN1Z2dlc3RvcjogRGljdGlvbmFyeVN1Z2dlc3Rlcjtcblx0ZWRpdFN1Z2dlc3RlcjogVGhlRWRpdG9yU3VnZ2VzdG9yO1xuXG5cdGNvbmZpZ3VyZVJpYmJvbkNvbW1hbmQoKTogdm9pZCB7XG5cdFx0dGhpcy5yaWJib25JY29uID0gdGhpcy5hZGRSaWJib25JY29uKFwiYm9vay1vcGVuLWNoZWNrXCIsIFwiV29yZE5ldCBEaWN0aW9uYXJ5XCIsIGFzeW5jICgpID0+IHtcblx0XHRcdHRoaXMuZGljdGlvbmFyeVN1Z2dlc3Rvci5vcGVuKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7IFxuXHRcdGNvbnNvbGUubG9nKFwibG9hZGluZyBXb3JkTmV0IHBsdWdpblwiKTtcblxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFdvcmROZXRTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cblx0XHR0aGlzLmRpY3Rpb25hcnlTdWdnZXN0b3IgPSBuZXcgRGljdGlvbmFyeVN1Z2dlc3Rlcih0aGlzKTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVJpYmJvbilcblx0XHRcdHRoaXMuY29uZmlndXJlUmliYm9uQ29tbWFuZCgpO1xuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiBcIm9wZW4td29yZG5ldC1zdWdnZXN0b3JcIixcblx0XHRcdG5hbWU6IFwiTG9vayB1cCBhIHdvcmRcIixcblx0XHRcdGNhbGxiYWNrOiAoKT0+IHsgdGhpcy5kaWN0aW9uYXJ5U3VnZ2VzdG9yLm9wZW4oKSB9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmVkaXRTdWdnZXN0ZXIgPSBuZXcgVGhlRWRpdG9yU3VnZ2VzdG9yKHRoaXMpO1xuXHRcdHRoaXMucmVnaXN0ZXJFZGl0b3JTdWdnZXN0KHRoaXMuZWRpdFN1Z2dlc3Rlcik7IFxuXHR9XG5cblx0b251bmxvYWQoKTogdm9pZCB7XG5cdFx0Y29uc29sZS5sb2coXCJ1bmxvYWRpbmcgV29yZE5ldCBwbHVnaW5cIik7XG5cdH1cblxuXHRyZW5kZXJEZWZpbml0aW9uRnJvbVRlbXBsYXRlKHRlcm06IHN0cmluZywgZGVmaW5pdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5zZXR0aW5ncy5pbnNlcnRUZW1wbGF0ZS5yZXBsYWNlKFwie3Rlcm19XCIsdGVybSkucmVwbGFjZShcIntkZWZpbml0aW9ufVwiLGRlZmluaXRpb24pO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn0iLCAiaW1wb3J0IHsgRWRpdG9yLCBFZGl0b3JQb3NpdGlvbiwgRWRpdG9yU3VnZ2VzdCwgRWRpdG9yU3VnZ2VzdENvbnRleHQsIEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbywgTWFya2Rvd25WaWV3LCBOb3RpY2UsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgV29yZE5ldFBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBEZWZpbml0aW9uIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoZUVkaXRvclN1Z2dlc3RvciBleHRlbmRzIEVkaXRvclN1Z2dlc3Q8RGVmaW5pdGlvbj4ge1xuICAgIHBsdWdpbjogV29yZE5ldFBsdWdpbjtcbiAgICBwYXR0ZXJuOiBSZWdFeHA7XG4gICAgbGFzdEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbzogRWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvO1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBXb3JkTmV0UGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKHBsdWdpbi5hcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy51cGRhdGVQYXR0ZXJuKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGF0dGVybigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuID0gbmV3IFJlZ0V4cChgLioke3RoaXMucGx1Z2luLnNldHRpbmdzLnNsYXNoQ29tbWFuZFNob3J0Y3V0fSguKikkYCk7XG4gICAgfVxuXG4gICAgb25UcmlnZ2VyKGN1cnNvcjogRWRpdG9yUG9zaXRpb24sIGVkaXRvcjogRWRpdG9yLCBfZmlsZTogVEZpbGUpOiBFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8ge1xuICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2xhc2hDb21tYW5kRW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBlZGl0b3IuZ2V0UmFuZ2UoeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IDAgfSwgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvci5jaCB9KTtcbiAgICAgICAgY29uc3QgdGVzdFJlc3VsdHMgPSB0aGlzLnBhdHRlcm4uZXhlYyhyYW5nZSk7XG4gICAgICAgIGlmICghdGVzdFJlc3VsdHMpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzdWdnZXN0VGV4dCA9IHRlc3RSZXN1bHRzWzFdO1xuICAgICAgICAgICAgdGhpcy5sYXN0RWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY3Vyc29yLmNoIC0gc3VnZ2VzdFRleHQubGVuZ3RoIC0gdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2xhc2hDb21tYW5kU2hvcnRjdXQubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY3Vyc29yLmNoIH0sXG4gICAgICAgICAgICAgICAgcXVlcnk6IHRlc3RSZXN1bHRzWzFdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0RWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3VnZ2VzdGlvbnMoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQpOiBQcm9taXNlPERlZmluaXRpb25bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4uZGljdGlvbmFyeVN1Z2dlc3Rvci5xdWVyeShjb250ZXh0LnF1ZXJ5KVxuICAgIH1cblxuICAgIHJlbmRlclN1Z2dlc3Rpb24oaXRlbTogRGVmaW5pdGlvbiwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGVsLmNyZWF0ZUVsKFwiYlwiLCB7IHRleHQ6IGl0ZW0uVGVybSB9KTtcbiAgICAgICAgZWwuY3JlYXRlRWwoXCJiclwiKTtcbiAgICAgICAgZWwuYXBwZW5kVGV4dChpdGVtLkRlZmluaXRpb24pO1xuICAgIH1cblxuICAgIHNlbGVjdFN1Z2dlc3Rpb24oaXRlbTogRGVmaW5pdGlvbiwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMucGx1Z2luLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIGlmIChldnQuY3RybEtleSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShpdGVtLlRlcm0gKyBcIiBcXG5cIiArIGl0ZW0uRGVmaW5pdGlvbiwgNjAwMDApO1xuICAgICAgICAgICAgY3VycmVudFZpZXcuZWRpdG9yLnJlcGxhY2VSYW5nZShcIlwiLFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mby5zdGFydCxcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8uZW5kKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjdXJyZW50Vmlldy5lZGl0b3IucmVwbGFjZVJhbmdlKFxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlbmRlckRlZmluaXRpb25Gcm9tVGVtcGxhdGUoaXRlbS5UZXJtLCBpdGVtLkRlZmluaXRpb24pLFxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mby5zdGFydCxcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8uZW5kKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgRGF0YUFkYXB0ZXIsIEZ1enp5TWF0Y2gsIEZ1enp5U3VnZ2VzdE1vZGFsLCBNYXJrZG93blZpZXcsIE5vdGljZSwgcmVxdWVzdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBXb3JkTmV0UGx1Z2luIGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVmaW5pdGlvbiB7XG4gICAgU2VhcmNoVGVybTogc3RyaW5nLFxuICAgIFRlcm06IHN0cmluZyxcbiAgICBEZWZpbml0aW9uOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeVN1Z2dlc3RlciBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPERlZmluaXRpb24+e1xuICAgIHBsdWdpbjogV29yZE5ldFBsdWdpbjtcbiAgICBhZGFwdGVyOiBEYXRhQWRhcHRlcjtcbiAgICB3b3JkTmV0OiBEZWZpbml0aW9uW107XG4gICAgY3VzdG9tRGljdDogRGVmaW5pdGlvbltdO1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBXb3JkTmV0UGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKHBsdWdpbi5hcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyKCd0eXBlIHdvcmQgdG8gbG9va3VwIGluIFdvcmROZXQnKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vbG9hZCB0aGUgV29yZE5ldCBkaWN0aW9uYXJ5XG4gICAgICAgICAgICBjb25zdCBwYXRoV29yZE5ldEpzb24gPSB0aGlzLnBsdWdpbi5tYW5pZmVzdC5kaXIgKyAnL2RpY3QtV29yZE5ldC5qc29uJztcbiAgICAgICAgICAgIGNvbnN0IGFkYXB0ZXIgPSB0aGlzLmFwcC52YXVsdC5hZGFwdGVyXG5cbiAgICAgICAgICAgIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoV29yZE5ldEpzb24pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVdvcmROZXQgPSBhd2FpdCBhZGFwdGVyLnJlYWQocGF0aFdvcmROZXRKc29uKTtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmROZXQgPSBhd2FpdCBKU09OLnBhcnNlKGZpbGVXb3JkTmV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYobmF2aWdhdG9yLm9uTGluZT09PWZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1lvdSBkbyBub3QgaGF2ZSBhbiBpbnRlcm5ldCBjb25uZWN0aW9uLCBhbmQgdGhlIFdvcmROZXQgZGljdGlvbmFyeSBjYW5ub3QgYmUgZG93bmxvYWRlZC4gUGxlYXNlIHJlc3RvcmUgeW91ciBpbnRlcmVudCBjb25uZWN0aW9uIGFuZCByZXN0ZWFydCBPYnNpZGlhbicsIDMwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4udW5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRNZXNzYWdlID0gbmV3IE5vdGljZShcIldvcmROZXQgZGljdGlvbmFyeSBpcyBiZWluZyBkb3dubG9hZGVkLCB0aGlzIG1heSB0YWtlIGEgZmV3IG1pbnV0ZXMuIFRoaXMgbWVzc2FnZSB3aWxsIGRpc2FwcGVhciB3aGVuIHRoZSBwcm9jZXNzIGlzIGNvbXBsZXRlLlwiLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdCh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9UZlRIYWNrZXIvT2JzaWRpYW4tV29yZE5ldC9yZWxlYXNlcy9kb3dubG9hZC9Xb3JkTmV0SnNvbi9kaWN0LVdvcmROZXQuanNvbicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZE1lc3NhZ2UuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZSA9PT0gXCJOb3QgRm91bmRcIiB8fCByZXNwb25zZSA9PT0gYHtcImVycm9yXCI6XCJOb3QgRm91bmRcIn1gKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFRoZSBXb3JkTmV0IGRpY3Rpb25hcnkgZmlsZSBpcyBub3QgY3VycmVudGx5IGF2YWlsYWJsZSBmb3IgZG93bmxvYWQuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIgb3IgY29udGFjdCB0aGUgZGV2ZWxvcGVyIG9uIFR3aXR0ZXI6IEBUZlRoYWNrZXIgZm9yIHN1cHBvcnQuYCwzMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4udW5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29yZE5ldCA9IGF3YWl0IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGFkYXB0ZXIud3JpdGUocGF0aFdvcmROZXRKc29uLCBKU09OLnN0cmluZ2lmeSh0aGlzLndvcmROZXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGluIFdvcmROZXQgZGljdGluYXJ5OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBBbiBlcnJvciBoYXMgb2NjdXJlZCB3aXRoIHRoZSBkb3dubG9hZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcjogJHtlfWApOyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnVubG9hZCgpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1c2VycyBjYW4gZGVmaW5lIHRoZWlyIG93biBjdXN0b20gZGljdGlvbmFyeSBhbmQgcGxhY2UgaXQgaW4gdGhlIHBsdWdpbnMgZGlyZWN0b3J5LiBcbiAgICAgICAgICAgIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyh0aGlzLnBsdWdpbi5tYW5pZmVzdC5kaXIgKyAnL2RpY3QtTXlEaWN0Lmpzb24nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVDdXN0b21EaWN0ID0gYXdhaXQgYWRhcHRlci5yZWFkKHRoaXMucGx1Z2luLm1hbmlmZXN0LmRpciArICcvZGljdC1NeURpY3QuanNvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGljdCA9IGF3YWl0IEpTT04ucGFyc2UoZmlsZUN1c3RvbURpY3QpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21EaWN0ID0gbnVsbDtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIHF1ZXJ5KHRlcm06IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRlcm0udG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGNvdW50T2ZGb3VuZE1hdGNoZXMgPSAwO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21EaWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyAoaSA8IHRoaXMuY3VzdG9tRGljdC5sZW5ndGggJiYgY291bnRPZkZvdW5kTWF0Y2hlcyA8IDMwKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3VzdG9tRGljdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVsnU2VhcmNoVGVybSddLnN0YXJ0c1dpdGgoc2VhcmNoVGVybSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuY3VzdG9tRGljdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50T2ZGb3VuZE1hdGNoZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY291bnRPZkZvdW5kTWF0Y2hlcyA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyAoaSA8IHRoaXMud29yZE5ldC5sZW5ndGggJiYgY291bnRPZkZvdW5kTWF0Y2hlcyA8IDIwKTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy53b3JkTmV0W2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW1bJ1NlYXJjaFRlcm0nXS5zdGFydHNXaXRoKHNlYXJjaFRlcm0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMud29yZE5ldFtpXSk7XG4gICAgICAgICAgICAgICAgY291bnRPZkZvdW5kTWF0Y2hlcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6IERlZmluaXRpb25bXSB7XG4gICAgICAgIGxldCBzZWFyY2hUZXJtID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXRFbC52YWx1ZS50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBhbnkgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWaWV3ICE9IG51bGwgJiYgY3VycmVudFZpZXcuZ2V0TW9kZSgpICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICYmIGN1cnJlbnRWaWV3LmVkaXRvci5zb21ldGhpbmdTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSA9IGN1cnJlbnRWaWV3LmVkaXRvci5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBzZWFyY2hUZXJtO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFbC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBzZWFyY2hUZXJtLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgc2VhcmNoVGVybSA9IHRoaXMuaW5wdXRFbC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlYXJjaFRlcm0gPT09ICcnID8gW10gOiB0aGlzLnF1ZXJ5KHNlYXJjaFRlcm0pO1xuICAgIH1cblxuICAgIGdldEl0ZW1UZXh0KGl0ZW06IERlZmluaXRpb24pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXRlbS5TZWFyY2hUZXJtO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvbkNob29zZUl0ZW0oaXRlbTogRGVmaW5pdGlvbiwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQgeyB9XG5cbiAgICByZW5kZXJTdWdnZXN0aW9uKGl0ZW06IEZ1enp5TWF0Y2g8RGVmaW5pdGlvbj4sIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBlbC5jcmVhdGVFbCgnYicsIHt0ZXh0OiBpdGVtLml0ZW0uVGVybX0pO1xuICAgICAgICBlbC5jcmVhdGVFbCgnYnInKTtcbiAgICAgICAgZWwuYXBwZW5kVGV4dChpdGVtLml0ZW0uRGVmaW5pdGlvbik7XG4gICAgfVxuXG4gICAgb25DaG9vc2VTdWdnZXN0aW9uKGl0ZW06IEZ1enp5TWF0Y2g8RGVmaW5pdGlvbj4sIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZXc6IGFueSA9IHRoaXMucGx1Z2luLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAoY3VycmVudFZpZXcgIT0gbnVsbCAmJiBjdXJyZW50Vmlldy5nZXRNb2RlKCkgPT09ICdzb3VyY2UnKSBcbiAgICAgICAgICAgIGN1cnJlbnRWaWV3LmVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKCB0aGlzLnBsdWdpbi5yZW5kZXJEZWZpbml0aW9uRnJvbVRlbXBsYXRlKGl0ZW0uaXRlbS5UZXJtLCBpdGVtLml0ZW0uRGVmaW5pdGlvbikgKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3IE5vdGljZShpdGVtLml0ZW0uVGVybSArICcgXFxuJyArIGl0ZW0uaXRlbS5EZWZpbml0aW9uLCAxMDAwMCk7XG4gICAgfVxuXG59IiwgImltcG9ydCB7XG4gIEFwcCxcbiAgU2V0dGluZyxcbiAgVGV4dEFyZWFDb21wb25lbnQsXG4gIFRleHRDb21wb25lbnQsXG4gIFRvZ2dsZUNvbXBvbmVudCxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgV29yZE5ldFBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBQbHVnaW5TZXR0aW5nVGFiIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29yZE5ldFNldHRpbmdzIHtcbiAgZW5hYmxlUmliYm9uOiBib29sZWFuO1xuICBzbGFzaENvbW1hbmRFbmFibGVkOiBib29sZWFuO1xuICBzbGFzaENvbW1hbmRTaG9ydGN1dDogc3RyaW5nO1xuICBpbnNlcnRUZW1wbGF0ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogV29yZE5ldFNldHRpbmdzID0ge1xuICBlbmFibGVSaWJib246IHRydWUsXG4gIHNsYXNoQ29tbWFuZEVuYWJsZWQ6IHRydWUsXG4gIHNsYXNoQ29tbWFuZFNob3J0Y3V0OiBcIjs7XCIsXG4gIGluc2VydFRlbXBsYXRlOiBcIioqe3Rlcm19KipcXG57ZGVmaW5pdGlvbn1cXG5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBXb3JkTmV0U2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IFdvcmROZXRQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogV29yZE5ldFBsdWdpbikge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuICAgIC8vIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIk9ic2lkaWFuNDIgLSBXb3JkTmV0IERpY3Rpb25hcnkgU2V0dGluZ1wiIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJiXCIsIHsgdGV4dDogXCJSaWJib24gU3VwcG9ydFwiIH0pO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgUmliYm9uIFN1cHBvcnRcIilcbiAgICAgIC5zZXREZXNjKFwiVG9nZ2xlIG9uIGFuZCBvZmYgdGhlIFdvcmROZXQgZGljdGlvbmFyeSBidXR0b24gaW4gdGhlIHJpYmJvbi5cIilcbiAgICAgIC5hZGRUb2dnbGUoKGNiOiBUb2dnbGVDb21wb25lbnQpID0+IHtcbiAgICAgICAgY2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlUmliYm9uKTtcbiAgICAgICAgY2Iub25DaGFuZ2UoYXN5bmMgKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlUmliYm9uID0gdmFsdWU7XG4gICAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZVJpYmJvbiA9PT0gZmFsc2UpXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yaWJib25JY29uLnJlbW92ZSgpO1xuICAgICAgICAgIGVsc2UgdGhpcy5wbHVnaW4uY29uZmlndXJlUmliYm9uQ29tbWFuZCgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJiXCIsIHsgdGV4dDogXCJTbGFzaCBDb21tYW5kXCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRW5hYmxlIHRoZSBTbGFzaCBDb21tYW5kXCIpXG4gICAgICAuc2V0RGVzYyhcIlRvZ2dsZSBvbiBhbmQgb2ZmIHRoZSBzbGFzaCBjb21tYW5kLlwiKVxuICAgICAgLmFkZFRvZ2dsZSgoY2I6IFRvZ2dsZUNvbXBvbmVudCkgPT4ge1xuICAgICAgICBjYi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbGFzaENvbW1hbmRFbmFibGVkKTtcbiAgICAgICAgY2Iub25DaGFuZ2UoYXN5bmMgKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2xhc2hDb21tYW5kRW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IGNiU2hvcnRjdXQ6IFRleHRDb21wb25lbnQ7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNsYXNoIENvbW1hbmQgQ2hhcmFjdGVyc1wiKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgIFwiVGhlIGNoYXJhY3RlcnMgdGhhdCB3aWxsIGludm9rZSB0aGUgc2xhc2ggY29tbWFuZC4gVGhlIGNvbW1hbmQgY2hhcmFjdGVyIGNhbm5vdCBiZSBhIHNwYWNlLlwiXG4gICAgICApXG4gICAgICAuYWRkRXh0cmFCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRJY29uKFwicmVzZXRcIilcbiAgICAgICAgICAuc2V0VG9vbHRpcChcIlJlc2V0IHRvIGRlZmF1bHRcIilcbiAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbGFzaENvbW1hbmRTaG9ydGN1dCA9XG4gICAgICAgICAgICAgIERFRkFVTFRfU0VUVElOR1Muc2xhc2hDb21tYW5kU2hvcnRjdXQ7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmVkaXRTdWdnZXN0ZXIudXBkYXRlUGF0dGVybigpO1xuICAgICAgICAgICAgY2JTaG9ydGN1dC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbGFzaENvbW1hbmRTaG9ydGN1dCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZFRleHQoKGNiOiBUZXh0Q29tcG9uZW50KSA9PiB7XG4gICAgICAgIGNiU2hvcnRjdXQgPSBjYjtcbiAgICAgICAgY2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2xhc2hDb21tYW5kU2hvcnRjdXQpO1xuICAgICAgICBjYi5vbkNoYW5nZShhc3luYyAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID1cbiAgICAgICAgICAgIHZhbHVlLnRyaW0oKS5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgPyBERUZBVUxUX1NFVFRJTkdTLnNsYXNoQ29tbWFuZFNob3J0Y3V0XG4gICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2xhc2hDb21tYW5kU2hvcnRjdXQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5lZGl0U3VnZ2VzdGVyLnVwZGF0ZVBhdHRlcm4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiYlwiLCB7IHRleHQ6IFwiVGVtcGxhdGVcIiB9KTtcbiAgICBsZXQgY2JUZW1wbGF0ZTogVGV4dEFyZWFDb21wb25lbnQ7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlRlbXBsYXRlIGZvciBpbnNlcnRpbmcgYSBkZWZpbml0aW9uXCIpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgXCJUaGUgdGVtcGxhdGUgdXNlZCBmb3IgaW5zZXJ0aW5nIGEgV29yZE5ldCBkZWZpbml0aW9uLiBVc2Uge3Rlcm19IGZvciB0aGUgdGVybSBsb29rZWQgdXAgYW5kIHtkZWZpbml0aW9ufSBmb3IgdGhlIGRlZmludGlvbiBvZiB0aGF0IHRlcm0uXCJcbiAgICAgIClcbiAgICAgIC5hZGRFeHRyYUJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEljb24oXCJyZXNldFwiKVxuICAgICAgICAgIC5zZXRUb29sdGlwKFwiUmVzZXQgdG8gZGVmYXVsdFwiKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmluc2VydFRlbXBsYXRlID1cbiAgICAgICAgICAgICAgREVGQVVMVF9TRVRUSU5HUy5pbnNlcnRUZW1wbGF0ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgY2JUZW1wbGF0ZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRUZW1wbGF0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZFRleHRBcmVhKChjYjogVGV4dEFyZWFDb21wb25lbnQpID0+IHtcbiAgICAgICAgY2JUZW1wbGF0ZSA9IGNiO1xuICAgICAgICBjYi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRUZW1wbGF0ZSk7XG4gICAgICAgIGNiLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPVxuICAgICAgICAgICAgdmFsdWUudHJpbSgpLmxlbmd0aCA9PT0gMCA/IERFRkFVTFRfU0VUVElOR1MuaW5zZXJ0VGVtcGxhdGUgOiB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRUZW1wbGF0ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2IuaW5wdXRFbC5yb3dzID0gMjtcbiAgICAgICAgY2IuaW5wdXRFbC5jb2xzID0gNDA7XG4gICAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSxtQkFBdUI7OztBQ0F2QixzQkFBbUk7QUFJbkksSUFBcUIscUJBQXJCLGNBQWdELDhCQUEwQjtBQUFBLEVBS3RFLFlBQVksUUFBdUI7QUFDL0IsVUFBTSxPQUFPLEdBQUc7QUFDaEIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxjQUFjO0FBQUEsRUFDdkI7QUFBQSxFQUVBLGdCQUFzQjtBQUNsQixTQUFLLFVBQVUsSUFBSSxPQUFPLEtBQUssS0FBSyxPQUFPLFNBQVMsb0JBQW9CLE9BQU87QUFBQSxFQUNuRjtBQUFBLEVBRUEsVUFBVSxRQUF3QixRQUFnQixPQUF3QztBQUN0RixRQUFJLEtBQUssT0FBTyxTQUFTLHdCQUF3QjtBQUFPO0FBQ3hELFVBQU0sUUFBUSxPQUFPLFNBQVMsRUFBRSxNQUFNLE9BQU8sTUFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxNQUFNLElBQUksT0FBTyxHQUFHLENBQUM7QUFDaEcsVUFBTSxjQUFjLEtBQUssUUFBUSxLQUFLLEtBQUs7QUFDM0MsUUFBSSxDQUFDO0FBQ0QsYUFBTztBQUFBLFNBQ047QUFDRCxZQUFNLGNBQWMsWUFBWSxDQUFDO0FBQ2pDLFdBQUssK0JBQStCO0FBQUEsUUFDaEMsT0FB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
