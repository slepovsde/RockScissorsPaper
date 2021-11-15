window.application.blocks['loading'] = renderLoading
window.application.blocks['blockLoading'] = renderLoadingBlock
window.application.screens['loadingScreen'] = renderLoadingScreen


function renderLoading(container) {
    const loading = document.createElement('div')
    container.appendChild(loading)

    return loading
}

function renderLoadingBlock(container) {
    const loading_block = document.createElement('div')
    container.appendChild(loading_block)
    
    const styles = window.application.settings.styles

    loading_block.style.setProperty('--loader-background-color', window.application.styles.loader[styles])
    loading_block.classList.add('cssload-thecube')

    const load_c1 = window.application.renderBlock('loading', loading_block)
    load_c1.classList.add('cssload-cube')
    load_c1.classList.add('cssload-c1')

    const load_c2 = window.application.renderBlock('loading', loading_block)
    load_c2.classList.add('cssload-cube')
    load_c2.classList.add('cssload-c2')

    const load_c4 = window.application.renderBlock('loading', loading_block)
    load_c4.classList.add('cssload-cube')
    load_c4.classList.add('cssload-c4')

    const load_c3 = window.application.renderBlock('loading', loading_block)
    load_c3.classList.add('cssload-cube')
    load_c3.classList.add('cssload-c3')

    return loading_block
}

function renderLoadingScreen() {
    window.application.renderBlock('settingsBlock', app)

    window.application.renderBlock('blockLoading', app)
}