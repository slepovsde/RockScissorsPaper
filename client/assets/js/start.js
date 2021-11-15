function start() {
	const app = document.querySelector('.app')
	app.style.height = 'auto'

	if(!localStorage.getItem('styles')) {
		localStorage.setItem('styles', 'styles-default')
	}

	if(!localStorage.getItem('images')) {
		localStorage.setItem('images', 'images-default')
	}

	if(!localStorage.getItem('names')) {
		localStorage.setItem('names', 'names-default')
	}

	window.application.settings.styles = localStorage.getItem('styles')
	window.application.settings.images = localStorage.getItem('images')
	window.application.settings.names = localStorage.getItem('names')

	document.body.style.setProperty('--main-background-color', window.application.styles.body[localStorage.getItem('styles')])
	document.body.style.setProperty('--main-background-image', window.application.styles['body-image'][localStorage.getItem('images')])

	window.application.renderScreen('loadingScreen')

	window.application.player.login = localStorage.getItem('login')

	//определяем, какое события прослушивать в зависимости от браузера
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		window.application['button-pressed'] = 'touchend'
	  } else {
		window.application['button-pressed'] = 'click'
	}

	// делаем ping запрос на сервер, если получаем ответ, переходим в лобби
	request('ping', null, () => {
		window.application.renderScreen('authScreen')
	})
}

start()

