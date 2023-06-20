/**
 * this script runs with the extension popup
 */

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
 * switch logic
 */
const input = document.querySelector('input.form-check-input')
const initializeSwitch = async () => {
	const { autoConvert } = await chrome.storage.local.get(["autoConvert"])
	input.checked = autoConvert
}
initializeSwitch();
input.addEventListener('change', ({ target }) => {
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
		toggleTab(tab)
	})
}
button.addEventListener('click', toNormalVideo)
