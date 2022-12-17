'use strict'

function renderGallery() {
    const imgs = getgImgs()
    var strHTML = '';
    imgs.forEach((img, idx) => {
        strHTML += `<img class="gallery-img" id="${idx + 1}" src="${img.url}" alt="" onclick="openEditor(this, this.id)">`
    });
    document.querySelector('.gallery-grid').innerHTML = strHTML
}

function filtergImgs(keyword) {
    console.log('size = ', size)
    var size = document.querySelector('.keys').style.fontSize
    size += `${size}px`
    console.log('size = ', size)
    // document.querySelector('.keys').style.fontSize += size
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

