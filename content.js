(() => {
  const root = document.documentElement;
  const CACHE_KEY = "codxis-dark-mode-cache";
  const DEFAULTS = { enabled: false, intensity: 90, contrast: 100, showButton: true };

  const MOON =
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';

  let state = { ...DEFAULTS };

  function apply(s) {
    state = { ...DEFAULTS, ...s };
    root.classList.toggle("codxis-dark", !!state.enabled);
    root.classList.toggle("codxis-hide-toggle", !state.showButton);
    root.style.setProperty("--codxis-invert", String(state.intensity / 100));
    root.style.setProperty("--codxis-contrast", String(state.contrast / 100));
    updateButton();
  }

  // 1) Aplica imediatamente a partir do cache síncrono (evita "flash" branco ao carregar).
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) apply(JSON.parse(cached));
  } catch (_) {}

  // 2) Confirma com o armazenamento oficial da extensão.
  chrome.storage.local.get(DEFAULTS, (s) => {
    apply(s);
    saveCache();
  });

  // 3) Reage a mudanças feitas pelo popup, atalho ou outras abas.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    const next = { ...state };
    for (const key of Object.keys(changes)) next[key] = changes[key].newValue;
    apply(next);
    saveCache();
  });

  function saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  // ---------- Botão flutuante (somente no frame principal) ----------
  let button = null;

  function updateButton() {
    if (!button) return;
    button.innerHTML = state.enabled ? SUN : MOON;
    button.title = state.enabled ? "Mudar para tema claro (Alt+Shift+D)" : "Mudar para tema escuro (Alt+Shift+D)";
  }

  function createButton() {
    if (window.top !== window || document.getElementById("codxis-theme-toggle")) return;
    button = document.createElement("div");
    button.id = "codxis-theme-toggle";
    button.setAttribute("role", "button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.storage.local.set({ enabled: !state.enabled });
    });
    document.body.appendChild(button);
    updateButton();
  }

  if (document.body) createButton();
  else document.addEventListener("DOMContentLoaded", createButton, { once: true });
})();
