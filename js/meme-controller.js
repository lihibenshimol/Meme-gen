'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderCanvas() { //img
    // var meme = getgMeme()
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    var img = getImg()
    drawImg(img)
    // drawRect()
    renderMeme()
}


function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() { //img and default text
    var meme = getgMeme()
    document.querySelector('.text-editor').placeholder = meme.lines[meme.selectedLineIdx].text
    // writeText(0)
    // writeText(1)
    writeText()
}

function openEditor(elImg, imgId) {
    console.log('elImgId = ', imgId)
    if (document.querySelector('.editor-container').classList.contains('hide')) {
        document.querySelector('.editor-container').classList.add('flex')
        document.querySelector('.gallery-container').classList.add('hide')
    }
    drawImg(elImg)
    updateMeme(elImg, imgId) //set elimg as the current gMeme
    renderCanvas()
}


// draw rect
// function drawRect() {
//     const line = getSelectedLineIdx()
//     console.log('line = ', line)
//     if (!line) return
//     // if (line.isSelected) {
//         gCtx.beginPath()
//         gCtx.lineWidth = 2
//         gCtx.strokeStyle = "white"
//         gCtx.setLineDash([15, 5])
//         gCtx.strokeRect(line.pos.x - line.sizes.width / 2 - 10, line.pos.y - line.sizes.height - 10, line.sizes.width + 25, line.sizes.height + 25)
//     // }
// }


function onSetLineText(text) {
    setLineText(text.toUpperCase())
    // document.querySelector('.text-editor').value = '';
    // renderMeme()
    renderCanvas()
}

function openColorPicker(type) {
    const elColorPicker = document.getElementById(`${type}`)
    elColorPicker.hidden = false
}

function onChangeFillColor(fillVal) {
    changeFillColor(fillVal)
    renderCanvas()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderCanvas()
}


// function writeText(lineIdx) {
function writeText() {
    var meme = getgMeme()
    var memeLines = meme.lines

    memeLines.forEach(line => {
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.fillText(line.text, line.x, line.y)
        gCtx.strokeText(line.text, line.x, line.y)
    });
}

function onChangeFontFamily(font) {
    console.log('font = ', font)
    changeFontFamily(font)
    renderCanvas()
}

function onChangeAlign(that) {
    console.log('that = ', that)
}

function onAddLineTogMeme() {
    // debugger
    document.querySelector('.text-editor').placeholder = 'type';
    addLineTogMeme(false)
    renderCanvas()
}

function onSwitchLine(diff) {
    const meme = getgMeme()
    switchLine(diff)
    // document.querySelector('.text-editor').focus();
    document.querySelector('.text-editor').placeholder = `line ${meme.selectedLineIdx+1}`;
}

function onDeleteLine() {
    console.log('gMeme.lines = ', gMeme.lines)
    var selectedLineIdx = getSelectedLineIdx()
    deleteLine(selectedLineIdx)
}

function getgElCanvas() {
    return gElCanvas
}

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
    }
    document.querySelector('.editor-container').classList.replace('flex', 'hide')
}