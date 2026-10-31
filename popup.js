const DEFAULTS = { enabled: false, intensity: 90, contrast: 100, showButton: true };
const $ = (id) => document.getElementById(id);

function render(s) {
  document.body.classList.toggle("dark", s.enabled);
  $("light").classList.toggle("active", !s.enabled);
  $("dark").classList.toggle("active", s.enabled);
  $("tuning").classList.toggle("disabled", !s.enabled);
  $("intensity").value = s.intensity;
  $("intensityVal").textContent = s.intensity + "%";
  $("contrast").value = s.contrast;
  $("contrastVal").textContent = s.contrast + "%";
  $("showButton").checked = s.showButton;
}

chrome.storage.local.get(DEFAULTS, render);
chrome.storage.onChanged.addListener(() => chrome.storage.local.get(DEFAULTS, render));

$("light").addEventListener("click", () => chrome.storage.local.set({ enabled: false }));
$("dark").addEventListener("click", () => chrome.storage.local.set({ enabled: true }));

for (const id of ["intensity", "contrast"]) {
  $(id).addEventListener("input", (e) => chrome.storage.local.set({ [id]: Number(e.target.value) }));
}

$("showButton").addEventListener("change", (e) => chrome.storage.local.set({ showButton: e.target.checked }));
