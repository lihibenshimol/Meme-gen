'use strict'

function renderGallery() {
    const imgs = getgImgs()
    var strHTML = imgs.map((img, idx) => {
        return `<img class="gallery-img" id="${idx + 1}" src="${img.url}" alt="" onclick="openEditor(this, this.id)">`
    }).join('')
    document.querySelector('.gallery-grid').innerHTML = strHTML
}

function filtergImgs(keyword) {
    searchMeme(keyword)
    renderGallery()
}

function onSearchMeme(ev) {
    ev.preventDefault()
    const elSearchInput = document.querySelector('.search')
    const searchInput = elSearchInput.value
    searchMeme(searchInput)
    renderGallery()
}

function onAddImg(ev) {
    loadImgFromInput(ev, addImg)
}

