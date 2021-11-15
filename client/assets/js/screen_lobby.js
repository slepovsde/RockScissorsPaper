window.application.blocks['screenTitle'] = renderScreenTitle
window.application.blocks['playersList'] = renderPlayersList
window.application.blocks['playerInfoLine'] = renderPlayerInfoLine
window.application.blocks['playButton'] = renderPlayButton
window.application.screens['lobbyScreen'] = renderLobbyScreen

// Функция отрисовки заголовка
function renderScreenTitle(container) {
	const screenTitle = document.createElement('h1')
	screenTitle.classList.add('title')
	container.appendChild(screenTitle)

	return screenTitle
}

// Функция отрисовки списка игроков онлайн
function renderPlayersList(container) {
	const playersList = document.createElement('div')
	playersList.classList.add('lobby__players')
	container.appendChild(playersList)

	window.application.renderBlock('blockLoading', playersList)

	// достаем информацию, необходимую для запроса
	const requestParameters = {
		token: window.application.player.token,
	}

	// запрашиваем список залогиненных игроков каждую секунду
	const getOnlinePlayers = setInterval(() => {
		request('player-list', requestParameters, (data) => {
			processRecievedPlayersListData(data, playersList)
		})
	}, 1000)

	// сохраняем таймер, чтобы была возможность его очистить
	window.application.timers.push(getOnlinePlayers)

	return playersList
}

// Функция обработки запроса списка игроков
function processRecievedPlayersListData(responseText, container) {
	const response = JSON.parse(responseText)
	let playerInfoLine

	// отрисовывем список игроков после получения ответа
	container.textContent = ''
	for (const player of response.list) {
		playerInfoLine = window.application.renderBlock('playerInfoLine', container)
		playerInfoLine.textContent = player.login

		// выделяем цветом логин игрока, который смотрит на экран
		if (player.you) {
			playerInfoLine.classList.add('lobby__players_you')
		}
	}
}

// Функция отрисовки одной строки списка игроков
function renderPlayerInfoLine(container) {
	const playerInfoLine = document.createElement('p')
	playerInfoLine.classList.add('list-item')
	container.appendChild(playerInfoLine)

	return playerInfoLine
}

// Функция отрисовки кнопки "играть"
function renderPlayButton(container) {
	const playButton = document.createElement('button')
	playButton.classList.add('button')
	playButton.classList.add(`button_${window.application.settings.styles}`)
	container.appendChild(playButton)

	playButton.addEventListener(window.application['button-pressed'], startGame)

	return playButton
}

// Функция реакции на нажатие кнопки "играть"
function startGame(event) {
	window.application.renderScreen('loadingScreen')

	const requestParameters = {
		token: window.application.player.token,
	}

	// запрашиваем начало игры
	request('start', requestParameters, processRecievedGameStartData)
}

// Функция обработки запроса начала игры
function processRecievedGameStartData(responseText) {
	const startGameResponse = JSON.parse(responseText)

	window.application.game.id = startGameResponse['player-status'].game.id
	window.application.player.status = startGameResponse['player-status'].status
	localStorage.setItem('game-id', window.application.game.id)

	const requestParameters = {
		token: window.application.player.token,
		id: window.application.game.id,
	}

	// запрашиваем статус игры (есть ли противник)
	request('game-status', requestParameters, processRecievedGameStatusData)
}

// Функция обработки запроса статуса игры
function processRecievedGameStatusData(responseText) {
	const gameResponse = JSON.parse(responseText)

	if(gameResponse.status === 'error') {
		loadLastScreen()
		return
	}

	// Подгружаем разные экраны в зависимости от наличия противника
	switch (gameResponse['game-status'].status) {
		case 'waiting-for-start':
			window.application.renderScreen('waitingForEnemyScreen')
			break
		case 'waiting-for-your-move':
			window.application.game.enemy = gameResponse['game-status'].enemy.login
			localStorage.getItem('game-enemy', window.application.game.enemy)
			window.application.renderScreen('playScreen')
			break
	}
}

// Функция отрисовки экрана Лобби
function renderLobbyScreen() {
	window.application.renderBlock('settingsBlock', app)

	for (let item in window.application.game) {
		item = undefined
	}
	localStorage.setItem('game-id', '')
	localStorage.setItem('game-move', '')
	localStorage.getItem('game-enemy', '')
	window.application.game.id = ''
	window.application.game.move = ''
	window.application.game.enemy = ''

	const lobbyTitle = window.application.renderBlock('screenTitle', app)
	lobbyTitle.textContent = 'Лобби'

	const playersList = window.application.renderBlock('playersList', app)

	const playButton = window.application.renderBlock('playButton', app)
	playButton.textContent = 'Играть'
}
