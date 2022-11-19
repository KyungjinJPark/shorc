// wait for the shorts container to load
const scIntId = setInterval(() => {
	const shortsContainer = document.getElementById('shorts-inner-container')
	if (shortsContainer) {
		onSCReady(shortsContainer)
	}
}, 200)

let prevNumShorts = 0

/**
 * @param {HTMLElement} shortsContainer
 */
const onSCReady = (shortsContainer) => {
	// clean up rapid listener
	clearInterval(scIntId)

	// listen for shorts loading in ... forever
	setInterval(() => {
		const shorts = shortsContainer.querySelectorAll('ytd-reel-video-renderer')
		if (prevNumShorts < shorts.length) {
			shorts.forEach((short, key) => {
				if (key >= prevNumShorts) {
					// insert the SHORC button into the new shorts
					insertShorc(short)
				}
			})
			prevNumShorts = shorts.length
		} 
	}, 1000)
}

/**
 * @param {Element} short
 */
const insertShorc = (short) => {
	const shortActions = short.lastElementChild.firstElementChild.querySelector('#actions')
	const commentsButton = shortActions.querySelector('#comments-button')

	// get relevant elements
  const buttonLabel = commentsButton.getElementsByTagName('label')[0];
	const convertButton = buttonLabel.cloneNode(true)
	const button = convertButton.firstChild
	const subtext = convertButton.lastChild.firstChild

	// change relevant elements
	convertButton.style.marginTop = '1.6rem'
	const toReplace = button.firstChild.firstChild
	const buttontext = document.createElement('div')
	buttontext.innerText = '\u203A:\u299A'
	buttontext.style.paddingTop = '1.2rem'
	buttontext.style.fontSize = '2.4rem'
	button.firstChild.replaceChild(buttontext, toReplace)
	// TODO: create reusable util
	const toNormalVideo = () => {
		const currUrl = window.location.href
		const newUrl = currUrl.replace('/shorts/', '/watch?v=')
		window.location.assign(newUrl)
	}
	button.addEventListener('click', toNormalVideo)
	subtext.textContent = 'SHORC'

	// add button to screen
  commentsButton.insertAdjacentElement('beforebegin', convertButton);
}