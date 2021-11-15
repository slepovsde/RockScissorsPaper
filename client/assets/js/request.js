// Тестовый колбек
function awaitResponse(response) {
	console.log(response)
}

function request(url, parameters, onSuccess) {
	// Собираем параметры запроса в строки "ключ=значение"
	const requestParameters = []

	for (const key in parameters) {
		requestParameters.push(`${key}=${parameters[key]}`)
	}

	// Создаем ссылку для запроса
	const requestURL = `${BACKEND_DOMEN}/${url}?${requestParameters.join('&')}`

	// Открываем запрос и посылаем его с созданной ссылкой
	const xhr = new XMLHttpRequest()
	xhr.open('GET', requestURL)
	xhr.send()

	// Запускаем ожидание ответа
	xhr.addEventListener('readystatechange', (event) => {
		const target = event.target

		if (target.readyState !== 4) {
			return
		}

		if (target.status === 200) {
			onSuccess(target.responseText)
		} else {
			console.log(target.status, target.statusText)
			window.application.renderScreen('errorScreen')
		}
	})
}
