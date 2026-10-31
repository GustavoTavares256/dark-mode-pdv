chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle-theme") return;
  chrome.storage.local.get({ enabled: false }, ({ enabled }) => {
    chrome.storage.local.set({ enabled: !enabled });
  });
});
