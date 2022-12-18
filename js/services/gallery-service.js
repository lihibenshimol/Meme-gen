var gImgs
var gImgId = 0
var gFilterBy

_createImgs()

function _createImgs() {
    gImgs = []
    gImgs.push(_createImg(['funny', 'man']))
    gImgs.push(_createImg(['happy', 'man']))
    gImgs.push(_createImg(['shock', 'man']))
    gImgs.push(_createImg(['smile', 'sarcastic', 'man']))
    gImgs.push(_createImg(['cartoon']))
    gImgs.push(_createImg(['animals', 'cute', 'dogs']))
    gImgs.push(_createImg(['trump', 'man']))
    gImgs.push(_createImg(['spongebob', 'funny', 'cartoon']))
    gImgs.push(_createImg(['man', 'sarcastic']))
    gImgs.push(_createImg(['man', 'funny']))
    gImgs.push(_createImg(['kid', 'boy', 'suspicious']))
    gImgs.push(_createImg(['trump', 'man']))
    gImgs.push(_createImg(['dog', 'suspicious']))
    gImgs.push(_createImg(['woman', 'goosebumps']))
    gImgs.push(_createImg(['spongebob', 'cartoon']))
    gImgs.push(_createImg(['boy', 'stress']))
    gImgs.push(_createImg(['animals', 'cute', 'cat']))
    gImgs.push(_createImg(['spongebob', 'cartoon', 'angry']))
    gImgs.push(_createImg(['man', 'eyeroll']))
    gImgs.push(_createImg(['cartoon', 'angry']))
    gImgs.push(_createImg(['man', 'old']))
    gImgs.push(_createImg(['girl','kid', 'fire']))
    gImgs.push(_createImg(['slap','batman', 'cartoon']))
    gImgs.push(_createImg(['man','suspicious', 'cartoon']))
    gImgs.push(_createImg(['girl','kid', 'animals']))
    gImgs.push(_createImg(['think', 'man']))
    gImgs.push(_createImg(['think', 'woman']))
    gImgs.push(_createImg(['man', 'confused','funny']))
    gImgs.push(_createImg(['oprah', 'woman','excited']))
    gImgs.push(_createImg(['shock','man']))
}

function _createImg(keywords) {
    return { id: gImgId++, url: `img/${gImgId}.png`, keywords }
}

function getgImgs() {
    if (gFilterBy) {
        let filteredImgs = []
        gImgs.forEach(img => {
            img.keywords.forEach(key => {
                if (key.includes(gFilterBy)){
                    if(!filteredImgs.some(filteredImg=> filteredImg.id === img.id)) filteredImgs.push(img)
                }
            })
        })
        return filteredImgs
    } else return gImgs
}


function searchMeme(searchInput) {
    setgFilter(searchInput)
}

function setgFilter(filterBy) {
    gFilterBy = filterBy
    return gFilterBy
}

function loadImgFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) 
}

function addImg(img) {
    gImgs.unshift({ id: gImgId++, url: img.src, keywords: [] });
    renderGallery()
}
