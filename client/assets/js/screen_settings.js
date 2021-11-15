window.application.screens['settingsScreen'] = renderSettingsScreen
window.application.blocks['radioInputBlock'] = renderRadioInputBlock
window.application.blocks['inputLabelBlock'] = renderInputLabelBlock
window.application.blocks['legendBlock'] = renderLegendBlock
window.application.blocks['inputFormBlock'] = renderFormBlock
window.application.blocks['fieldSetBlock'] = renderFieldSetBlock
window.application.blocks['settingsButton'] = renderSettingsButton

window.application.blocks['settingsBlock'] = renderSettingsBlock

function renderSettingsButton(container) {
    const button = document.createElement('button')
    button.classList.add('button')
    button.classList.add(`button_${window.application.settings.styles}`)
    button.innerText = 'Назад'
    container.appendChild(button)
    return button
}

function renderLegendBlock(container) {
    const legend = document.createElement('legend')
    legend.classList.add('form__legend')
    container.appendChild(legend)
    return legend
}

function renderRadioInputBlock(container) {
    const radiobox = document.createElement('input')
    radiobox.classList.add('radio')
    container.appendChild(radiobox)
    radiobox.type = 'radio';
    return radiobox
}

function renderInputLabelBlock(container) {
    const label = document.createElement('label')
    label.classList.add('input-label')
    container.appendChild(label)
    return label
}

function renderFieldSetBlock(container) {
    const fieldSet = document.createElement('fieldset')
    fieldSet.classList.add('form__fieldset')
    container.appendChild(fieldSet)
    return fieldSet
}

function renderFormBlock(container) {
    const form = document.createElement('form')
    form.classList.add('form')
    form.action = '/settings'
    container.appendChild(form)

    const fieldSetStyles = window.application.renderBlock('fieldSetBlock', form)
    const legendStyles = window.application.renderBlock('legendBlock', fieldSetStyles)
    legendStyles.textContent = 'Стили'

    const divStylesDefault = document.createElement('div')
    divStylesDefault.classList.add('form__control')
    const radioInputStylesDefault = window.application.renderBlock('radioInputBlock', divStylesDefault)
    radioInputStylesDefault.id = 'styles-default'
    radioInputStylesDefault.value = 'styles-default'
    radioInputStylesDefault.name = 'styles'
    const inputLabelStylesDefault = window.application.renderBlock('inputLabelBlock', divStylesDefault)
    inputLabelStylesDefault.htmlFor = 'styles-default'
    inputLabelStylesDefault.textContent = 'Голубо-розовый'
    fieldSetStyles.appendChild(divStylesDefault)

    const divStylesDark = document.createElement('div')
    divStylesDark.classList.add('form__control')
    const radioInputStylesDark = window.application.renderBlock('radioInputBlock', divStylesDark)
    radioInputStylesDark.id = 'styles-black-and-white'
    radioInputStylesDark.value = 'styles-black-and-white'
    radioInputStylesDark.name = 'styles'
    const inputLabelStylesDark = window.application.renderBlock('inputLabelBlock', divStylesDark)
    inputLabelStylesDark.htmlFor = 'styles-black-and-white'
    inputLabelStylesDark.textContent = 'Черно-белый'
    fieldSetStyles.appendChild(divStylesDark)

    const fieldSetImages = window.application.renderBlock('fieldSetBlock', form)
    const legendImages = window.application.renderBlock('legendBlock', fieldSetImages)
    legendImages.textContent = 'Фон'

    const divImagesDefault = document.createElement('div')
    divImagesDefault.classList.add('form__control')
    const radioInputImagesDefault = window.application.renderBlock('radioInputBlock', divImagesDefault)
    radioInputImagesDefault.id = 'images-default'
    radioInputImagesDefault.value = 'images-default'
    radioInputImagesDefault.name = 'images'
    const inputLabelImagesDefault = window.application.renderBlock('inputLabelBlock', divImagesDefault)
    inputLabelImagesDefault.htmlFor = 'images-default'
    inputLabelImagesDefault.textContent = 'Треугольники'
    fieldSetImages.appendChild(divImagesDefault)

    const divImagesZigZag = document.createElement('div')
    divImagesZigZag.classList.add('form__control')
    const radioInputImagesZigZag = window.application.renderBlock('radioInputBlock', divImagesZigZag)
    radioInputImagesZigZag.id = 'images-zigzag'
    radioInputImagesZigZag.value = 'images-zigzag'
    radioInputImagesZigZag.name = 'images'
    const inputLabelImagesZigZag = window.application.renderBlock('inputLabelBlock', divImagesZigZag)
    inputLabelImagesZigZag.htmlFor = 'images-zigzag'
    inputLabelImagesZigZag.textContent = 'Зигзаг'
    fieldSetImages.appendChild(divImagesZigZag)
   
    const fieldSetNames = window.application.renderBlock('fieldSetBlock', form) 
    const legendNames = window.application.renderBlock('legendBlock', fieldSetNames)
    legendNames.textContent = 'Названия'

    const divNamesDefault = document.createElement('div')
    divNamesDefault.classList.add('form__control')
    const radioInputNamesDefault = window.application.renderBlock('radioInputBlock', divNamesDefault)
    radioInputNamesDefault.id = 'names-default'
    radioInputNamesDefault.value = 'names-default'
    radioInputNamesDefault.name = 'names'
    const inputLabelNamesDefault = window.application.renderBlock('inputLabelBlock', divNamesDefault)
    inputLabelNamesDefault.htmlFor = 'names-default'
    inputLabelNamesDefault.innerHTML = 'Камень<br>Ножницы<br>Бумага'

    fieldSetNames.appendChild(divNamesDefault)

    const divNamesMagic = document.createElement('div')
    divNamesMagic.classList.add('form__control')
    const radioInputNamesMagic = window.application.renderBlock('radioInputBlock', divNamesMagic)
    radioInputNamesMagic.id = 'names-magic'
    radioInputNamesMagic.value = 'names-magic'
    radioInputNamesMagic.name = 'names'
    const inputLabelNamesMagic = window.application.renderBlock('inputLabelBlock', divNamesMagic)
    inputLabelNamesMagic.htmlFor = 'names-magic'
    inputLabelNamesMagic.innerHTML = 'Принцесса<br>Рыцарь<br>Дракон'
    fieldSetNames.appendChild(divNamesMagic)
    
    const backButton = window.application.renderBlock('settingsButton', form)

    form.addEventListener('change', function (event) {
        const target = event.target
        switch(target.name) {
            case 'styles':
                localStorage.setItem('styles', target.defaultValue)
                window.application.settings.styles = target.defaultValue

                document.body.style.setProperty('--main-background-color', window.application.styles.body[target.defaultValue])

                backButton.classList = ['button']
                backButton.classList.add(`button_${window.application.settings.styles}`)
                return

            case 'images':
                localStorage.setItem('images', target.defaultValue)
                window.application.settings.images = target.defaultValue

                document.body.style.setProperty('--main-background-image', window.application.styles['body-image'][target.defaultValue])
                return

            case 'names':
                localStorage.setItem('names', target.defaultValue)
                window.application.settings.names = target.defaultValue
                return
        }
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        loadLastScreen()
    })
    
    return form
}

function renderSettingsScreen() {
    const title = window.application.renderBlock('screenTitle', app)
    title.textContent = 'Настройки'

    const form = window.application.renderBlock('inputFormBlock', app) 

    const radioStyles = document.querySelector(`#${window.application.settings.styles}`)
    radioStyles.checked = true

    const radioImages = document.querySelector(`#${window.application.settings.images}`)
    radioImages.checked = true

    const radioNames = document.querySelector(`#${window.application.settings.names}`)
    radioNames.checked = true
}

function renderSettingsBlock(container) {
    const settings = document.createElement('div')
    settings.innerHTML = '<svg viewBox="0 0 512 512"><path d="m496.659 312.107-47.061-36.8c.597-5.675 1.109-12.309 1.109-19.328s-.491-13.653-1.109-19.328l47.104-36.821c8.747-6.912 11.136-19.179 5.568-29.397L453.331 85.76c-5.227-9.557-16.683-14.464-28.309-10.176l-55.531 22.293c-10.645-7.68-21.803-14.165-33.344-19.349l-8.448-58.901C326.312 8.448 316.584 0 305.086 0h-98.133c-11.499 0-21.205 8.448-22.571 19.456l-8.469 59.115c-11.179 5.035-22.165 11.435-33.28 19.349l-55.68-22.357c-10.433-4.032-22.913.49-28.097 10.005L9.854 170.347c-5.781 9.771-3.392 22.464 5.547 29.547l47.061 36.8c-.747 7.189-1.109 13.44-1.109 19.307s.363 12.117 1.109 19.328L15.358 312.15c-8.747 6.933-11.115 19.2-5.547 29.397l48.939 84.672c5.227 9.536 16.576 14.485 28.309 10.176l55.531-22.293c10.624 7.659 21.781 14.144 33.323 19.349l8.448 58.88C185.747 503.552 195.454 512 206.974 512h98.133c11.499 0 21.227-8.448 22.592-19.456l8.469-59.093c11.179-5.056 22.144-11.435 33.28-19.371l55.68 22.357a22.924 22.924 0 0 0 8.363 1.579c8.277 0 15.893-4.523 19.733-11.563l49.152-85.12c5.462-9.984 3.072-22.25-5.717-29.226zm-240.64 29.226c-47.061 0-85.333-38.272-85.333-85.333s38.272-85.333 85.333-85.333 85.333 38.272 85.333 85.333-38.272 85.333-85.333 85.333z"/></svg>'
    settings.classList.add('settings')
    container.appendChild(settings)

    settings.addEventListener(window.application['button-pressed'], () => {
        window.application.renderScreen('settingsScreen')
    })
    return settings
}

//window.application.renderScreen('settingsScreen')
