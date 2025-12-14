"use strict";
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
  default: () => SmartConnectionsLmStudioEmbeddings
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/lmstudio.ts
var settings = {
  baseUrl: "http://127.0.0.1:1234",
  requestTimeoutMs: 12e4,
  maxTokens: 512,
  batchSize: 16
};
function setLmStudioSettings(next) {
  settings = { ...settings, ...next };
}
function normalizeBaseUrl(url) {
  return String(url).trim().replace(/\/$/, "");
}
async function fetchJson(urlPath, init) {
  const baseUrl = normalizeBaseUrl(settings.baseUrl);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), settings.requestTimeoutMs);
  try {
    const res = await fetch(`${baseUrl}${urlPath}`, { ...init, signal: controller.signal });
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      throw new Error(`LM Studio HTTP ${res.status} ${res.statusText}${text ? `: ${text}` : ""}`);
    }
    return text ? JSON.parse(text) : null;
  } finally {
    window.clearTimeout(timeout);
  }
}
var cachedModels = {};
var lastFetchedAt = 0;
async function listModels(refresh = false) {
  const now = Date.now();
  if (!refresh && now - lastFetchedAt < 15e3 && Object.keys(cachedModels).length) return cachedModels;
  const data = await fetchJson("/v1/models");
  const models = Array.isArray(data?.data) ? data.data : [];
  const next = {};
  for (const m of models) {
    const id = String(m?.id ?? "").trim();
    if (!id) continue;
    next[id] = {
      id,
      name: id,
      model_key: id,
      model: id,
      description: "LM Studio local embedding model",
      max_tokens: settings.maxTokens,
      batch_size: settings.batchSize,
      use_gpu: false,
      adapter: "lmstudio"
    };
  }
  cachedModels = next;
  lastFetchedAt = now;
  return cachedModels;
}
function coerceToText(item) {
  if (typeof item === "string") return item;
  const candidate = item?.embed_input ?? item?.text ?? item?.content ?? item?.input ?? item?.data?.embed_input ?? item?.data?.text ?? item?.data?.content ?? null;
  if (typeof candidate === "string") return candidate;
  return "";
}
function normalizeBatchInputs(inputs) {
  return inputs.map((item) => {
    const text = coerceToText(item);
    const trimmed = text.trim();
    return trimmed ? trimmed : " ";
  });
}
async function createEmbeddings(model, input) {
  const body = JSON.stringify({ model, input, encoding_format: "float" });
  return await fetchJson("/v1/embeddings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body
  });
}
function extractEmbeddings(data) {
  const items = Array.isArray(data?.data) ? data.data : [];
  const out = [];
  for (const it of items) {
    const emb = it?.embedding;
    if (!Array.isArray(emb)) throw new Error("LM Studio: invalid embedding response");
    out.push(emb);
  }
  return out;
}
async function embedOne(modelKey, text) {
  const data = await createEmbeddings(modelKey, text);
  const embeddings = extractEmbeddings(data);
  if (!embeddings[0]) throw new Error("LM Studio: empty embedding response");
  return embeddings[0];
}
function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
function estimateTokens(text) {
  const len = typeof text === "string" ? text.length : 0;
  return Math.max(1, Math.ceil(len / 4));
}
var LmStudioEmbeddingAdapter = class {
  static adapter = "lmstudio";
  static key = "lm_studio";
  // Used by Smart Connections to identify this adapter
  static batch_size = 16;
  static defaults = {
    adapter: "lm_studio",
    description: "LM Studio local embedding model",
    default_model: ""
  };
  model;
  state = "unloaded";
  constructor(model) {
    this.model = model;
  }
  /**
   * The model_key getter is critical for Smart Connections.
   * SC uses this to form the `embed_model_key` which is used to store/retrieve embeddings.
   * Format: `{adapter_key}-{model_key}` e.g., "lm_studio-text-embedding-nomic-embed-text-v1.5"
   * 
   * This MUST return the same value across restarts for existing embeddings to be recognized.
   */
  get model_key() {
    const stored = this?.model?.data?.model_key ?? this?.model?.data?.model ?? this?.model?.settings?.model_key;
    if (typeof stored === "string" && stored.trim()) {
      return stored.trim();
    }
    const modelLevel = this?.model?.model_key ?? this?.model?.id;
    if (typeof modelLevel === "string" && modelLevel.trim()) {
      return modelLevel.trim();
    }
    const firstModel = Object.keys(cachedModels)[0];
    return firstModel ?? "";
  }
  /**
   * Required by Smart Connections to check if model is ready.
   * Must return true for embeddings to be recognized on startup.
   */
  get is_loaded() {
    return this.state === "loaded";
  }
  get models() {
    return cachedModels;
  }
  coerceRefreshArg(arg) {
    if (typeof arg === "boolean") return arg;
    if (arg && typeof arg === "object" && "refresh" in arg) return Boolean(arg.refresh);
    return false;
  }
  async get_models(refreshOrOpts = false) {
    const refresh = this.coerceRefreshArg(refreshOrOpts);
    const models = await listModels(refresh);
    if (this?.model?.data && (!this.model.data.provider_models || Object.keys(this.model.data.provider_models).length === 0)) {
      this.model.data.provider_models = models;
    }
    return models;
  }
  async load(refreshOrOpts = false) {
    await this.get_models(refreshOrOpts);
    this.state = "loaded";
    return this;
  }
  async ensureModelKey() {
    const currentKey = this.model_key;
    if (currentKey) return currentKey;
    await this.get_models(true);
    const fallback = Object.keys(cachedModels)[0]?.trim() ?? "";
    if (!fallback) throw new Error("LM Studio: no models available (GET /v1/models returned empty)");
    if (this?.model?.data) {
      this.model.data.model_key = fallback;
      this.model.data.model = fallback;
      this.model.data.adapter = "lm_studio";
      this.model.debounce_save?.();
    }
    return fallback;
  }
  /**
   * Set the model key explicitly. Called when user selects a model.
   * This ensures the key is persisted for recognition across restarts.
   */
  set_model_key(key) {
    if (this?.model?.data) {
      this.model.data.model_key = key;
      this.model.data.model = key;
      this.model.data.adapter = "lm_studio";
      this.model.debounce_save?.();
    }
  }
  padToLength(vectors, targetLength) {
    if (vectors.length >= targetLength) return vectors.slice(0, targetLength);
    const dims = (Number.isFinite(this?.model?.data?.dims) ? this.model.data.dims : null) ?? (Number.isFinite(vectors[0]?.length) ? vectors[0].length : null) ?? 1536;
    const out = vectors.slice();
    for (let i = vectors.length; i < targetLength; i++) out.push(Array.from({ length: dims }, () => 0));
    return out;
  }
  ensureBatchSize() {
    const fallback = settings.batchSize ?? 16;
    const candidate = Number(this?.model?.data?.batch_size);
    const valid = Number.isFinite(candidate) && candidate > 0 ? candidate : fallback;
    try {
      if (this?.model?.data) {
        if (!Number.isFinite(this.model.data.batch_size) || this.model.data.batch_size <= 0) this.model.data.batch_size = valid;
        if (!Number.isFinite(this.model.data.max_batch_size) || this.model.data.max_batch_size <= 0) this.model.data.max_batch_size = valid;
        this.model.debounce_save?.();
      }
    } catch {
    }
    return valid;
  }
  get batch_size() {
    return this.ensureBatchSize();
  }
  coerceBatchInputs(arg0, arg1) {
    if (Array.isArray(arg0) && arg0.length) return arg0;
    if (Array.isArray(arg1) && arg1.length) return arg1;
    if (Array.isArray(arg0)) return arg0;
    if (Array.isArray(arg1)) return arg1;
    const fromObj = arg0?.texts ?? arg0?.text ?? arg0?.inputs ?? arg0?.input ?? arg0?.items ?? arg1?.texts ?? arg1?.inputs ?? arg1?.items ?? null;
    return Array.isArray(fromObj) ? fromObj : [];
  }
  coerceBatchInputsFromArgs(args) {
    for (const a of args) {
      if (Array.isArray(a) && a.length) return a;
    }
    for (const a of args) {
      if (a && typeof a === "object") {
        const candidate = a.texts ?? a.inputs ?? a.items ?? a.data?.texts ?? a.data?.inputs ?? a.data?.items ?? null;
        if (Array.isArray(candidate) && candidate.length) return candidate;
      }
    }
    for (const a of args) {
      if (Array.isArray(a)) return a;
    }
    return [];
  }
  async embed_batch(...args) {
    const [arg0, arg1, arg2] = args;
    const coerced = this.coerceBatchInputsFromArgs(args);
    if (coerced.length === 0) return [];
    const batchSize = this.ensureBatchSize();
    const modelKey = await this.ensureModelKey();
    const normalized = normalizeBatchInputs(coerced);
    if (normalized.length === 0) return [];
    const vectors = [];
    for (const group of chunk(normalized, batchSize)) {
      try {
        const data = await createEmbeddings(modelKey, group);
        const embeddings = extractEmbeddings(data);
        if (embeddings.length !== group.length) {
          console.log(
            "[LM Studio Embeddings] embedding count mismatch; recovering",
            "expected=",
            group.length,
            "got=",
            embeddings.length
          );
          const recovered = [];
          for (const one of group) recovered.push(await embedOne(modelKey, one));
          vectors.push(...recovered);
        } else {
          vectors.push(...embeddings.slice(0, group.length));
        }
      } catch (err) {
        const recovered = [];
        for (const one of group) recovered.push(await embedOne(modelKey, one));
        vectors.push(...recovered);
      }
      const inferredDims = vectors[0]?.length;
      if (Number.isFinite(inferredDims) && this?.model?.data && !Number.isFinite(this.model.data.dims)) {
        this.model.data.dims = inferredDims;
        this.model.debounce_save?.();
      }
    }
    const padded = this.padToLength(vectors, normalized.length);
    return padded.map((vec, idx) => ({ vec, tokens: estimateTokens(normalized[idx] ?? "") }));
  }
  async embed(texts) {
    const inputs = Array.isArray(texts) ? texts : [texts];
    const items = await this.embed_batch(inputs);
    return items[0] ?? { vec: [] };
  }
  async embed_documents(texts) {
    return this.embed_batch(texts);
  }
  async embed_query(text) {
    const items = await this.embed_batch([text]);
    return items[0] ?? { vec: [] };
  }
  async unload() {
    this.state = "unloaded";
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  baseUrl: "http://127.0.0.1:1234",
  requestTimeoutMs: 12e4,
  maxTokens: 512,
  batchSize: 16
};
var ADAPTER_KEYS = ["lm_studio", "lmstudio", "lm-studio"];
function findSmartConnectionsPlugin(app) {
  try {
    const appAny = app;
    return appAny?.plugins?.getPlugin?.("smart-connections") ?? appAny?.plugins?.plugins?.["smart-connections"] ?? null;
  } catch {
    return null;
  }
}
function isRecord(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function findProvidersRegistry(env) {
  const candidates = [
    env?.config?.collections?.embedding_models?.providers,
    env?.config?.embedding_models?.providers,
    env?.embedding_models?.providers,
    env?.embedding_models?.config?.providers
  ];
  for (const c of candidates) {
    if (isRecord(c)) return c;
  }
  const collections = env?.config?.collections;
  if (isRecord(collections)) {
    for (const value of Object.values(collections)) {
      const maybeProviders = value?.embedding_models?.providers ?? value?.providers;
      if (isRecord(maybeProviders)) return maybeProviders;
    }
  }
  return null;
}
async function waitForSmartConnectionsEnv(app, timeoutMs = 6e4) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const sc = findSmartConnectionsPlugin(app);
    const env = sc?.env;
    if (sc && env && (findProvidersRegistry(env) || env?.embedding_models)) return { sc, env };
    await new Promise((r) => window.setTimeout(r, 500));
  }
  throw new Error("Timed out waiting for Smart Connections env");
}
function registerLmStudioProvider(sc, env, settings2) {
  const providers = findProvidersRegistry(env);
  if (!providers) throw new Error("Smart Connections providers registry missing");
  const keys = Object.keys(providers);
  let targetKey = keys.find((k) => k === "lm_studio" || k === "lmstudio" || k === "lm-studio") ?? keys.find((k) => /studio/i.test(k)) ?? null;
  if (!targetKey) {
    for (const [k, v] of Object.entries(providers)) {
      const name = String(v?.name ?? v?.label ?? "").toLowerCase();
      if (name.includes("lm studio")) {
        targetKey = k;
        break;
      }
    }
  }
  targetKey = targetKey ?? "lm_studio";
  const existing = providers[targetKey];
  if (existing?.class === LmStudioEmbeddingAdapter) return;
  const transformersTemplate = providers.transformers ?? Object.values(providers)[0] ?? {};
  const batchSize = settings2?.batchSize ?? DEFAULT_SETTINGS.batchSize;
  const providerConfig = {
    ...transformersTemplate,
    ...existing ?? {},
    id: targetKey,
    name: "LM Studio",
    label: "LM Studio",
    description: "local, requires LM Studio app",
    adapter: "lm_studio",
    adapter_key: "lm_studio",
    adapterKey: "lm_studio",
    batch_size: batchSize,
    max_batch_size: batchSize,
    // These flags control whether SC marks the provider as PRO/disabled in some versions.
    pro: false,
    is_pro: false,
    isPro: false,
    requires_pro: false,
    requiresPro: false,
    available: true,
    enabled: true,
    class: LmStudioEmbeddingAdapter
  };
  for (const key of ADAPTER_KEYS) {
    providers[key] = providerConfig;
  }
  try {
    const alt = env?.embedding_models?.providers;
    if (isRecord(alt)) {
      for (const key of ADAPTER_KEYS) {
        alt[key] = providerConfig;
      }
    }
  } catch {
  }
  registerAdapterClass(env);
  try {
    env?.embedding_models?.emit_event?.("providers-updated");
    env?.embedding_models?.emit?.("providers-updated");
    sc?.events?.emit?.("providers-updated");
  } catch {
  }
}
function registerAdapterClass(env) {
  const registries = [
    env?.embedding_models?.adapters,
    env?.embedding_models?.adapter_classes,
    env?.embedding_models?.adapterClasses,
    env?.embedding_models?.adapter_registry,
    env?.embedding_models?.adapterRegistry,
    env?.embedding_models?.embedding_adapters,
    env?.embedding_models?.embeddingAdapters,
    env?.config?.modules?.smart_embed_model?.adapters,
    env?.config?.embedding_models?.adapters,
    // Direct on embed model
    env?.smart_sources?.embed_model?.adapters,
    env?.smart_blocks?.embed_model?.adapters
  ];
  for (const reg of registries) {
    if (!isRecord(reg)) continue;
    for (const key of ADAPTER_KEYS) {
      reg[key] = LmStudioEmbeddingAdapter;
    }
  }
  try {
    const SmartEmbedModel = env?.config?.modules?.smart_embed_model?.class;
    if (SmartEmbedModel?.adapters && isRecord(SmartEmbedModel.adapters)) {
      for (const key of ADAPTER_KEYS) {
        SmartEmbedModel.adapters[key] = LmStudioEmbeddingAdapter;
      }
    }
  } catch {
  }
}
var SmartConnectionsLmStudioEmbeddings = class extends import_obsidian.Plugin {
  settings = DEFAULT_SETTINGS;
  bootstrapped = false;
  registrationInterval = null;
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.applySettings();
    this.addSettingTab(new LmStudioSettingsTab(this.app, this));
    new import_obsidian.Notice(`LM Studio Embeddings loaded (v${this.manifest?.version ?? "unknown"})`);
    this.tryEarlyRegistration();
    this.registrationInterval = window.setInterval(() => {
      if (this.bootstrapped) {
        if (this.registrationInterval) {
          window.clearInterval(this.registrationInterval);
          this.registrationInterval = null;
        }
        return;
      }
      this.tryEarlyRegistration();
    }, 200);
    this.app.workspace.onLayoutReady(() => {
      this.bootstrap().catch((err) => console.warn("[LM Studio Embeddings] bootstrap failed", err));
    });
    this.bootstrap().catch((err) => console.warn("[LM Studio Embeddings] bootstrap failed", err));
  }
  onunload() {
    if (this.registrationInterval) {
      window.clearInterval(this.registrationInterval);
      this.registrationInterval = null;
    }
  }
  /**
   * Try to register the adapter as early as possible, before SC initializes entities.
   * This is non-blocking and won't throw errors if SC isn't ready yet.
   */
  tryEarlyRegistration() {
    try {
      const sc = findSmartConnectionsPlugin(this.app);
      if (!sc) return false;
      const env = sc?.env;
      if (!env) return false;
      const providers = findProvidersRegistry(env);
      if (!providers) return false;
      registerLmStudioProvider(sc, env, this.settings);
      registerAdapterClass(env);
      console.log("[LM Studio Embeddings] Early registration successful");
      this.bootstrapped = true;
      if (this.registrationInterval) {
        window.clearInterval(this.registrationInterval);
        this.registrationInterval = null;
      }
      listModels(true).catch(
        (err) => console.warn("[LM Studio Embeddings] Failed to list models", err)
      );
      return true;
    } catch (err) {
      return false;
    }
  }
  applySettings() {
    setLmStudioSettings({
      baseUrl: this.settings.baseUrl,
      requestTimeoutMs: this.settings.requestTimeoutMs,
      maxTokens: this.settings.maxTokens,
      batchSize: this.settings.batchSize
    });
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.applySettings();
  }
  async bootstrap() {
    if (this.bootstrapped) return;
    const { sc, env } = await waitForSmartConnectionsEnv(this.app, 12e4);
    registerLmStudioProvider(sc, env, this.settings);
    try {
      await listModels(true);
    } catch (err) {
      console.warn("[LM Studio Embeddings] Failed to list models", err);
    }
    this.bootstrapped = true;
    new import_obsidian.Notice("LM Studio Embeddings: provider registered");
  }
};
var LmStudioSettingsTab = class extends import_obsidian.PluginSettingTab {
  plugin;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("LM Studio base URL").setDesc("Example: http://127.0.0.1:1234").addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.baseUrl).setValue(this.plugin.settings.baseUrl).onChange(async (value) => {
        this.plugin.settings.baseUrl = value.trim() || DEFAULT_SETTINGS.baseUrl;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Request timeout (ms)").addText(
      (text) => text.setValue(String(this.plugin.settings.requestTimeoutMs)).onChange(async (value) => {
        const n = Number(value);
        this.plugin.settings.requestTimeoutMs = Number.isFinite(n) ? Math.max(5e3, n) : DEFAULT_SETTINGS.requestTimeoutMs;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Default max tokens").addText(
      (text) => text.setValue(String(this.plugin.settings.maxTokens)).onChange(async (value) => {
        const n = Number(value);
        this.plugin.settings.maxTokens = Number.isFinite(n) ? Math.max(16, n) : DEFAULT_SETTINGS.maxTokens;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Default batch size").addText(
      (text) => text.setValue(String(this.plugin.settings.batchSize)).onChange(async (value) => {
        const n = Number(value);
        this.plugin.settings.batchSize = Number.isFinite(n) ? Math.max(1, n) : DEFAULT_SETTINGS.batchSize;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Reload model list").setDesc("Fetches available models from LM Studio (GET /v1/models).").addButton((btn) => {
      btn.setButtonText("Fetch").onClick(async () => {
        try {
          await listModels(true);
          new import_obsidian.Notice("LM Studio Embeddings: model list refreshed");
        } catch (err) {
          new import_obsidian.Notice(`LM Studio Embeddings: failed to fetch models (${err?.message ?? err})`);
        }
      });
    });
  }
};
