'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderCanvas() { //img
    //    if(!getgMemeLinesLength())
    var meme = getgMeme()
    document.querySelector('.text-editor').value = meme.lines[meme.selectedLineIdx].text
    var img = getImg()
    drawImg(img)
    // drawRect()
    // renderMeme()
    writeText()
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() { //img and default text
    // switchLine(0)
    writeText()
}

function openEditor(elImg, imgId) {
    console.log('elImgId = ', imgId)
    if (document.querySelector('.editor-container').classList.contains('hide')) {
        document.querySelector('.editor-container').classList.add('flex')
        document.querySelector('.gallery-container').classList.add('hide')
        document.querySelector('.me').classList.remove('grid')
        document.querySelector('.me').classList.add('hide')

    }
    drawImg(elImg)
    updateMeme(elImg, imgId) //set elimg as the current gMeme
    renderCanvas()
}

// function writeText(lineIdx) {
function writeText() {
    let meme = getgMeme()
    let memeLines = meme.lines

    memeLines.forEach(line => {
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.fillText(line.text, line.x, line.y)
        gCtx.strokeText(line.text, line.x, line.y)
    })
}

function onSearchMeme(ev) {
    ev.preventDefault()
    const elSearchInput = document.querySelector('.search')
    const searchInput = elSearchInput.value
    // if (!searchInput) searchMeme('meme')
    searchMeme(searchInput)
    renderGallery()
}

//* SETTINGS ON TEXT

function onSetLineText(text) {
    // document.querySelector('.text-editor').value = '';
    setLineText(text.toUpperCase())
    // renderMeme()
    renderCanvas()
}

function toggleColorPicker(type) {
    const elColorPicker = document.getElementById(`${type}`)
    if (elColorPicker.hidden) {
        elColorPicker.hidden = false
    } else {
        elColorPicker.hidden = true
    }
    changeColor()
}

function changeColor() {
    var color = document.getElementById('fill-color')
    color.addEventListener('input', function (e) {
        changeFillColor(this.value)
        renderCanvas()
    })
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderCanvas()
}

function onChangeFontFamily(font) {
    changeFontFamily(font)
    renderCanvas()
}

function onChangeAlign(align) {
    changeAlign(align)
    renderCanvas()
}

function onMoveLine(diff) {
    moveLine(diff)
    renderCanvas()
}

//* LINE IDX CHANGES
function onAddLineTogMeme() {
    document.querySelector('.text-editor').placeholder = 'type';
    addLineTogMeme(false)
    renderCanvas()
}

function onSwitchLine(diff) {
    const meme = getgMeme()
    var lineIdx = meme.selectedLineIdx
    var memeline = meme.lines[lineIdx]
    switchLine(diff)
    renderCanvas()
}

function onDeleteLine() {
    console.log('gMeme.lines = ', gMeme.lines)
    var selectedLineIdx = getSelectedLineIdx()
    deleteLine(selectedLineIdx)
    renderCanvas()
}

//* GENERAL

function getgElCanvas() {
    return gElCanvas
}

function getgMemeLinesLength() {
    const meme = getgMeme()
    const memeLinesLength = meme.lines.length
    console.log('memeLinesLength = ', memeLinesLength)
    return memeLinesLength
}

//* END OF FLOW

function onShareImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function backToGallery() {
    if (document.querySelector('.gallery-container').classList.contains('hide')) {
        document.querySelector('.gallery-container').classList.remove('hide')
        document.querySelector('.me').classList.replace('hide', 'grid')
    }
    document.querySelector('.editor-container').classList.replace('flex', 'hide')
}