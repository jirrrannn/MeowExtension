chrome.tabs.onActivated.addListener(sendMessageToActiveTab);

async function sendMessageToActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  console.log("Tab activated:", tab);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, { type: "NEW" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Message response:", response);
      }
    });
  });
}
