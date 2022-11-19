const input = document.querySelector('input.form-check-input')

chrome.action.getBadgeText({}, (text) => {
	input.checked = text === 'ON'
})

input.addEventListener('change', ({target}) => {
	chrome.action.setBadgeText({
		text: target.checked ? "ON" : "OFF",
	});
})

const button = document.querySelector('button.btn')

// TODO: create reusable util
const toNormalVideo = () => {
	chrome.tabs.query({
		active: true,
		currentWindow: true,
	}, (tabs) => {
		const tab = tabs[0]
		const currUrl = tab.url
		const newUrl = currUrl.replace('/shorts/', '/watch?v=')
		// TODO: replaces in history, no back button
		chrome.tabs.update(tab.id, { url: newUrl })
	})
}
button.addEventListener('click', toNormalVideo)
