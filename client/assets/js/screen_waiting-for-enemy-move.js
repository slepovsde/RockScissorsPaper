window.application.screens['enemyMoveScreen'] = renderEnemyMoveScreen

function renderEnemyMoveScreen() {
	//отрисовка экрана
	window.application.renderBlock('settingsBlock', app)

	const waitingForEnemyMoveTitle = window.application.renderBlock('screenTitle', app)
	waitingForEnemyMoveTitle.textContent = 'Ожидание хода соперника'

	window.application.renderBlock('blockLoading', app)

	//  window.application.renderScreen('playScreen')
	// window.application.renderScreen('enemyMoveScreen')

	const requestParameters = {
		token: window.application.player.token,
		id: window.application.game.id,
	}

	function processRecievedData(responseText) {
		const data = JSON.parse(responseText)

		if(data.status === 'error') {
			window.application.renderScreen('lobbyScreen')
			return
		}

		switch (
		data['game-status'].status //конструкция исхода событий игры
		) {
			case 'waiting-for-enemy-move':
				break
			case 'waiting-for-your-move':
				window.application.renderScreen('drawScreen')
				setTimeout(() => {
					window.application.renderScreen('playScreen')
				}, 1500)
				break
			case 'win':
				window.application.renderScreen('winScreen')
				break
			case 'lose':
				window.application.renderScreen('loseScreen')
				break
		}
	}

	const timer = setInterval(() => request('game-status', requestParameters, processRecievedData), 500)
	window.application.timers.push(timer)
}
