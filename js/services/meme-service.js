'use strict'


var gImgs
var gMeme
var gFontSize = 40

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

function searchMeme(searchInput) {
    setgFilter(searchInput)
}

//* GMEME UPDATES

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
    // writeText(gMeme.selectedLineIdx)
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
    // console.log('line after = ', line)
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

//* CHANGES ON GMEME.LINES

function addLineTogMeme(isEmptyLines) {
    const elCanvas = getgElCanvas();
    const yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
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
    // writeText(gMeme.selectedLineIdx)
}

function switchLine(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function deleteLine(selectedLineIdx) {
    console.log('se,lectedLineIdx = ', selectedLineIdx)
    const line = gMeme.lines[selectedLineIdx]
    gMeme.lines.splice(line, 1)
    // document.querySelector('.text-editor').placeholder = '';
}

//* GENERAL

function getgMeme() {
    return gMeme
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function getImg() {
    return gMeme.elImg
}