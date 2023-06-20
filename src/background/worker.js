/**
 * this script automatically runs on web pages
 */


/**
 * convert tab to normal video
 * @param {object} tab
 */
const convertToNormal = (tab) => {
  const { url } = tab
  if (url && url.startsWith('https://www.youtube.com/shorts/')) {
    const newUrl = url.replace('?', '&').replace('/shorts/', '/watch?v=')
    // TODO: replaces in history, no back button
    chrome.tabs.update(tab.id, { url: newUrl })
  }
}


/**
 * convert tab to short
 * @param {object} tab
 */
const convertToShort = (tab) => {
  const { url } = tab
  if (url && url.startsWith('https://www.youtube.com/watch?v=')) {
    const newUrl = url.replace('/watch?v=', '/shorts/').replace('&', '?')
    // TODO: replaces in history, no back button
    chrome.tabs.update(tab.id, { url: newUrl })
  }
}

/**
 * toggle tab between normal video or short
 * @param {object} tab
 */
const toggleTab = (tab) => {
  // TODO: create reusable util
  // TODO: omega wet code
  const { url } = tab
  if (url) {
    if (url.startsWith('https://www.youtube.com/shorts/')) {
      const newUrl = url.replace('?', '&').replace('/shorts/', '/watch?v=')
      // TODO: replaces in history, no back button
      chrome.tabs.update(tab.id, { url: newUrl })
    }
    else if (url.startsWith('https://www.youtube.com/watch?v=')) {
      const newUrl = url.replace('/watch?v=', '/shorts/').replace('&', '?')
      // TODO: replaces in history, no back button
      chrome.tabs.update(tab.id, { url: newUrl })
    }
  }
}

/**
 * initial set-up
 */
const setUp = async () => {
  chrome.action.setBadgeBackgroundColor({ color: '#ff6464' })
  const { autoConvert } = await chrome.storage.local.get(["autoConvert"])
  if (autoConvert === undefined) {
    chrome.storage.local.set({ autoConvert: false })
  }
  if (autoConvert) {
    chrome.action.setBadgeText({
      text: "ON",
    });
  }
};
chrome.runtime.onInstalled.addListener(setUp)
chrome.runtime.onStartup.addListener(setUp);

/**
 * handle `commands`
 */
chrome.commands.onCommand.addListener((command, tab) => {
  switch (command) {
    case 'convert_page':
      toggleTab(tab);
      break;
    default:
      break;
  }
});

/**
 * auto-run on tab update
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const { autoConvert } = await chrome.storage.local.get(["autoConvert"])
  if (autoConvert) {
    convertToNormal(tab)
  }
})