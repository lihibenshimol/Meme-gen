var gImgs
var gImgId = 0

_createImgs()

function _createImgs() {
    gImgs = []
    gImgs.push(_createImg(['funny', 'man']))
    gImgs.push(_createImg(['happy', 'man']))
    gImgs.push(_createImg(['shoch', 'man']))
    gImgs.push(_createImg(['smile', 'sarcastic', 'man']))
    gImgs.push(_createImg(['cartoon']))
    gImgs.push(_createImg(['animals', 'cute', 'dogs']))
    gImgs.push(_createImg(['trump', 'man']))
    gImgs.push(_createImg(['spongebob','funny','cartoon']))
    gImgs.push(_createImg(['man','sarcastic']))
    gImgs.push(_createImg(['man','funny']))
    gImgs.push(_createImg(['kid','boy','suspicious']))
    gImgs.push(_createImg(['trump','man']))
    gImgs.push(_createImg(['dog','suspicious']))
    gImgs.push(_createImg(['woman','goosebumps']))
    gImgs.push(_createImg(['spongebob','cartoon']))
    gImgs.push(_createImg(['boy','stress']))
    gImgs.push(_createImg(['animals','cute','cat']))
    gImgs.push(_createImg(['spongebob','cartoon','angry']))
    gImgs.push(_createImg(['man','eyeroll']))
    gImgs.push(_createImg(['cartoon','angry']))
    gImgs.push(_createImg(['man', 'old']))
}

function _createImg(keywords) {
return {id: gImgId++, url: `img/${gImgId}.png`, keywords}
}

function getgImgs() {
    return gImgs
}

function addImg(img) {
    gImgs.unshift({ id: gIdImg++, url: img.src, keywords: [] });
}