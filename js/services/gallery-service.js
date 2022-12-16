var gImgs
var gImgId = 0
var gFilterBy = 'meme'

_createImgs()

function _createImgs() {
    gImgs = []
    gImgs.push(_createImg(['meme', 'funny', 'man']))
    gImgs.push(_createImg(['meme', 'happy', 'man']))
    gImgs.push(_createImg(['meme', 'shock', 'man']))
    gImgs.push(_createImg(['meme', 'smile', 'sarcastic', 'man']))
    gImgs.push(_createImg(['meme', 'cartoon']))
    gImgs.push(_createImg(['meme', 'animals', 'cute', 'dogs']))
    gImgs.push(_createImg(['meme', 'trump', 'man']))
    gImgs.push(_createImg(['meme', 'spongebob', 'funny', 'cartoon']))
    gImgs.push(_createImg(['meme', 'man', 'sarcastic']))
    gImgs.push(_createImg(['meme', 'man', 'funny']))
    gImgs.push(_createImg(['meme', 'kid', 'boy', 'suspicious']))
    gImgs.push(_createImg(['meme', 'trump', 'man']))
    gImgs.push(_createImg(['meme', 'dog', 'suspicious']))
    gImgs.push(_createImg(['meme', 'woman', 'goosebumps']))
    gImgs.push(_createImg(['meme', 'spongebob', 'cartoon']))
    gImgs.push(_createImg(['meme', 'boy', 'stress']))
    gImgs.push(_createImg(['meme', 'animals', 'cute', 'cat']))
    gImgs.push(_createImg(['meme', 'spongebob', 'cartoon', 'angry']))
    gImgs.push(_createImg(['meme', 'man', 'eyeroll']))
    gImgs.push(_createImg(['meme', 'cartoon', 'angry']))
    gImgs.push(_createImg(['meme', 'man', 'old']))
    gImgs.push(_createImg(['meme', 'girl','kid', 'fire']))
    gImgs.push(_createImg(['meme', 'slap','batman', 'cartoon']))
    gImgs.push(_createImg(['meme', 'man','suspicious', 'cartoon']))
    gImgs.push(_createImg(['meme', 'girl','kid', 'animals']))
    gImgs.push(_createImg(['meme','think', 'man']))
    gImgs.push(_createImg(['meme','think', 'woman']))
    gImgs.push(_createImg(['meme','man', 'confused','funny']))
    gImgs.push(_createImg(['meme','oprah', 'woman','excited']))
    gImgs.push(_createImg(['meme','shock','man']))
}

function _createImg(keywords) {
    return { id: gImgId++, url: `img/${gImgId}.png`, keywords }
}

function setgFilter(filterBy) {
    console.log('filterBy = ', filterBy)
    gFilterBy = filterBy
    return gFilterBy
}

function getgImgs() {
    if (!gFilterBy) gFilterBy = 'meme'
    const imgs = gImgs.filter(img => img.keywords.includes(gFilterBy.toLowerCase()))
    return imgs
}

function addImg(img) {
    gImgs.unshift({ id: gIdImg++, url: img.src, keywords: [] });
}