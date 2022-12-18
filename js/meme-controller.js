'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderSavedMemes() //todo move to onclick my-memes
}

function renderCanvas(withRect = true) {
    var meme = getgMeme()
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

function openEditor(elImg, imgId) {
    console.log('other = ', elImg)
    // if (document.querySelector('.editor-container').classList.contains('hide')) 
    showEditorController()
    drawImg(elImg)
    updateMeme(elImg, imgId)
    renderCanvas()
}

function writeText(savedMeme = false) {
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

//* SAVED MEMES

function onSaveMeme() {
    alert('Saved! check out your meme at "My Memes"')
    saveMeme()
    renderSavedMemes()
}

function openEditorFromSave(elImg, imgId, idx) {
console.log('elImg = ', elImg)
console.log('imgId = ', imgId)
    const meme = gSavedMemes[idx]
    meme.elImg = elImg
    meme.selectedImgId = imgId

    showEditorController()
    setgMeme(meme)
    drawImg(elImg)
    renderCanvas()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    if (!savedMemes) {
        strHTML = `No saved memes yet`
    }
    if (savedMemes) {
        var strHTML = savedMemes.map((meme, idx) => {
            return `<button class="btn delete-saved" onclick="onDeleteSavedMeme(${idx})"> X
            <img class="saved-meme"  id="${meme.selectedImgId}" src="img/${meme.selectedImgId}.png" onclick="openEditorFromSave(this,this.id,${idx})">
            </button>`
        }).join('')
    }
    document.querySelector('.saved-memes').innerHTML = strHTML
}

function onDeleteSavedMeme(idx) {
    deleteSavedMeme(idx)
    renderSavedMemes()
}

//* SETTINGS ON TEXT

function onSetLineText(text) {
    setLineText(text.toUpperCase())
    renderCanvas()
}

function onChangeColor(color) {
    changeFillColor(color)
    renderCanvas()
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
    var selectedLineIdx = getSelectedLineIdx()
    console.log('selectedLineIdx = ', selectedLineIdx)
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

function showMyMemes() {
    renderSavedMemes()
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.editor-container').classList.replace('flex', 'hide')
    document.querySelector('.saved-memes').classList.replace('hide', 'grid')
    document.querySelector('.me').classList.remove('grid')
    document.querySelector('.me').classList.add('hide')
}

function showEditorController() {
    document.querySelector('.editor-container').classList.add('flex')
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.me').classList.remove('grid')
    document.querySelector('.me').classList.add('hide')
    document.querySelector('.saved-memes').classList.replace('grid', 'hide')

}

function backToGallery() {
    if (document.querySelector('.gallery-container').classList.contains('hide')) {
        document.querySelector('.gallery-container').classList.remove('hide')
        document.querySelector('.me').classList.replace('hide', 'grid')
        document.querySelector('.editor-container').classList.replace('flex', 'hide')
        document.querySelector('.saved-memes').classList.replace('grid', 'hide')
    }

}