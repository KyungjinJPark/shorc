/**
 * this script automatically runs on web pages
 */

/**
 * convert tab to normal video
 * @param {object} tab
 */
const convertPage = (tab) => {
  // TODO: create reusable util
  const { url } = tab
  if (url && url.startsWith('https://www.youtube.com/shorts/')) {
    if (url.includes('/shorts/')) {
      const newUrl = url.replace('/shorts/', '/watch?v=')
      // TODO: replaces in history, no back button
      chrome.tabs.update(tab.id, { url: newUrl })
    }
  }
}

/**
 * initial set-up
 */
const setUp = async () => {
  chrome.action.setBadgeBackgroundColor({color: '#ff6464'})
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
      convertPage(tab);
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
    convertPage(tab)
  }
})