/**
 * this script runs with the extension popup
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
 * switch logic
 */
const input = document.querySelector('input.form-check-input')
const initializeSwitch = async () => {
	const { autoConvert } = await chrome.storage.local.get(["autoConvert"])
	input.checked = autoConvert
}
initializeSwitch();
input.addEventListener('change', ({target}) => {
	const newState = target.checked
	chrome.storage.local.set({ autoConvert: newState })
	chrome.action.setBadgeText({
		text: newState ? "ON" : "",
	});
})

/**
 * button logic
 */
const button = document.querySelector('button.btn')
const toNormalVideo = () => {
	// TODO: create reusable util
	chrome.tabs.query({
		active: true,
		currentWindow: true,
	}, (tabs) => {
		const tab = tabs[0]
		convertPage(tab)
	})
}
button.addEventListener('click', toNormalVideo)
