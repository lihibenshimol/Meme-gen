'use strict'


var gImgs
var gMeme
var gFontSize = 40
var gSavedMemes = []

const STORAGE_KEY = 'savedMemesDB'

function updateMeme(elImg, imgId) {
    let elCanvas = getgElCanvas();
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        elImg,
        lines: [
            {
                text: `WHEN YOUR CODE WORKS`,
                font: 'impact',
                size: gFontSize,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                x: elCanvas.width / 2,
                y: 40,
            },
            {
                text: `AND YOU DON'T KNOW WHY`,
                font: 'impact',
                size: gFontSize,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                x: elCanvas.width / 2,
                y: elCanvas.height - 20
            }
        ]
    }
}

function saveMeme() {
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = [ ]
    }
    gSavedMemes.push(gMeme)
    _saveMemeToStorage()
}

function getSavedMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    return gSavedMemes
}

function deleteSavedMeme(memeIdx) {
    const meme = gSavedMemes[memeIdx]
    gSavedMemes.splice(meme, 1)
    _saveMemeToStorage()
}

//* GMEME UPDATES

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function changeFontSize(diff) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (line.size <= 20 || line.size > 50)
        line.size += diff
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeFillColor(fillVal) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.fillColor = fillVal
}

function changeFontFamily(font) {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    line.font = font
}

function changeAlign(align) {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    line.align = align
}

function moveLine(diff) {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    line.y += diff
}

function switchLine(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

//* CHANGES ON GMEME.LINES

function addLineTogMeme(isEmptyLines) {
    const elCanvas = getgElCanvas();
    var yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
    if (gMeme.lines.length === 0) yPos = 50;
    gMeme.lines.push({
        text: 'NEW LINE',
        font: 'impact',
        size: gFontSize,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        x: elCanvas.width / 2,
        y: yPos,
    })
    if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine(selectedLineIdx) {
    if (gMeme.lines.length === 1 && gMeme.lines[0].text === '') return;
    const line = gMeme.lines[selectedLineIdx]
    const currlineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(line, 1)
    if (gMeme.lines.length) {
        if (currlineIdx) {
            gMeme.selectedLineIdx = currlineIdx - 1;
        } else {
            gMeme.selectedLineIdx = 0;
        }
    }
    if (!gMeme.lines.length) addLineTogMeme(true)
}

//* GENERAL

function setgMeme(meme) {
    gMeme = meme
    return gMeme
}

function getgMeme() {
    return gMeme
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function getImg() {
    return gMeme.elImg
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}