'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderCanvas(withRect = true) {
    var meme = getgMeme()
    // document.querySelector('.text-editor').placeholder = meme.lines[meme.selectedLineIdx].text
    document.querySelector('.text-editor').value = meme.lines[meme.selectedLineIdx].text
    const y = meme.lines[meme.selectedLineIdx].y
    var img = getImg()
    drawImg(img)
    if (withRect) drawRect(0, y - 40)
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
    if (document.querySelector('.editor-container').classList.contains('hide')) {
        document.querySelector('.editor-container').classList.add('flex')
        document.querySelector('.gallery-container').classList.add('hide')
        document.querySelector('.me').classList.remove('grid')
        document.querySelector('.me').classList.add('hide')
    }
    drawImg(elImg)
    updateMeme(elImg, imgId)
    renderCanvas()
}

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

//* SETTINGS ON TEXT

function onSetLineText(text) {
    setLineText(text.toUpperCase())
    renderCanvas()
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
    console.log('font = ', font)
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

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.fillStyle = '#ffffff81'
    gCtx.fillRect(x, y, gElCanvas.width, 50)
    gCtx.strokeStyle = 'black'
   
    gCtx.strokeRect(x, y, gElCanvas.width, 50)
}

//* LINE IDX CHANGES
function onAddLineTogMeme() {
    addLineTogMeme(false)
    renderCanvas()
}

function onSwitchLine(diff) {
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

function onDownloadCanvas(elLink) {
    renderCanvas(false)
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function backToGallery() {
    if (document.querySelector('.gallery-container').classList.contains('hide')) {
        document.querySelector('.gallery-container').classList.remove('hide')
        document.querySelector('.me').classList.replace('hide', 'grid')
    }
    document.querySelector('.editor-container').classList.replace('flex', 'hide')
}