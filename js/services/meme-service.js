'use strict'


var gImgs
var gMeme

var gLineId
var gFillColor = 'white'
var gFontSize = 40

function updateMeme(elImg ,imgId) {
    var elCanvas = getgElCanvas();
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        elImg,
        lines: [
            {
                text: 'when your code works',
                font: 'impact',
                size: gFontSize,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                x: elCanvas.width / 2,
                y: 40,
            },
            {
                text: 'and you dont know why',
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

function getImg() {
    return gMeme.elImg
}

function setLineText(text) {
    console.log('works?');
    gMeme.lines[gMeme.selectedLineIdx].text = text
    writeText(gMeme.selectedLineIdx)
}

function changeFontSize(diff) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (line.size <= 20 || line.size > 50)
    line.size += diff
    console.log('line.size = ', line.size)
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

function addLineTogMeme(isEmptyLines) {
    var elCanvas = getgElCanvas();
    var yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
    if (gMeme.lines.length === 0) yPos = 50;
    gMeme.lines.push({
        text: 'another',
        font: 'impact',
        size: gFontSize,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        x: elCanvas.width / 2,
        y: yPos,
    })
    if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log('gMeme.lines = ', gMeme.lines)
    // writeText(gMeme.selectedLineIdx)
}

function switchLine(diff) {
    console.log('befor= ', gMeme.selectedLineIdx)
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}


function deleteLine(selectedLineIdx) {
    console.log('gMeme.lines[selectedLineIdx] = ', gMeme.lines[selectedLineIdx])
    // debugger
    const line = gMeme.lines[selectedLineIdx]
    // const lineIdx = gMeme.lines.findIndex(lineIdx => lineIdx === selectedLineIdx)
    // console.log('lineIdx = ', lineIdx)
    // if (lineIdx < 0) return
    gMeme.lines.splice(line, 1)
    document.querySelector('.text-editor').placeholder = '';
    renderCanvas()
    console.log('gMeme.lines = ', gMeme.lines)
}

function getgMeme() {
    return gMeme
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}