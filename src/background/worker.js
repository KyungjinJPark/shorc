chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeBackgroundColor({color: '#ff6464'})
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.startsWith('https://www.youtube.com/shorts/')) {
    chrome.action.getBadgeText({}, (text) => {
      if (text === 'ON') {
        // TODO: create reusable util
        const toNormalVideo = () => {
          const currUrl = tab.url
          const newUrl = currUrl.replace('/shorts/', '/watch?v=')
          // TODO: replaces in history, no back button
          chrome.tabs.update(tab.id, { url: newUrl })
        }
        toNormalVideo()
      }
    })
  }
})