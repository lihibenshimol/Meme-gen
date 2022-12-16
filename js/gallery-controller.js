'use strict'

function renderGallery() {
    const imgs = getgImgs()
    var strHTML = '';
    imgs.forEach((img, idx) => {
        strHTML += `<img class="gallery-img" id="${idx+1}" src="${img.url}" alt="" onclick="openEditor(this, this.id)">`
    });
    document.querySelector('.gallery-grid').innerHTML = strHTML
}

function filtergImgs(keyword) {
console.log('keyword = ', keyword)
    searchMeme(keyword)
    renderGallery()
}