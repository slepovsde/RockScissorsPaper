window.application.blocks['loseBlock'] = renderLoseBlock;
window.application.blocks['playButton'] = renderPlayButton;
window.application.blocks['lobbyButton'] = renderLobbyButton;
window.application.screens['loseScreen'] = renderLoseScreen;

function renderLoseBlock(container) {
  //создание инфомационного блока с текстом поражения
  const loseBlock = document.createElement('div');
  container.appendChild(loseBlock);
  loseBlock.classList.add('lose-block');

  return loseBlock;
}

function renderLobbyButton(container) {
  //создание кнопки "Перейти в лобби"
  const lobbyButton = document.createElement('button');
  lobbyButton.classList.add('button');
  lobbyButton.classList.add(`button_${window.application.settings.styles}`)
  container.appendChild(lobbyButton);

  lobbyButton.addEventListener(window.application['button-pressed'], () => {
    window.application.renderScreen('lobbyScreen');
  });

  return lobbyButton;
}

function renderLoseScreen() {
  //функция отрисовки экрана поражения
  window.application.renderBlock('settingsBlock', app)

  const loseBlock = window.application.renderBlock('loseBlock', app);
  loseBlock.textContent = 'Вы проиграли!';

  const lobbyButton = window.application.renderBlock('lobbyButton', app);
  lobbyButton.textContent = 'Перейти в лобби'

  const playButton = window.application.renderBlock('playButton', app);
  playButton.textContent = 'Играть еще';
}

//window.application.renderScreen('looseScreen');
