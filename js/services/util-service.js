function resizeCanvas() {
    const elContainer = document.querySelector('.editor›-container')
    gElCanvas.width = elContainer.offsetWidth - 20
}

function onClearCanvas() {
    // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
    // to transparent black, erasing any previously drawn content.
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data 
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}
