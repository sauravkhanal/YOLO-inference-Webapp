const handleDownload = (inferredImage) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = inferredImage;

    var currentDate = new Date();
    downloadLink.download = 'YOLO_'+currentDate.toISOString().slice(0,19).replace('_','-').replace('T','_');

    document.body.appendChild(downloadLink);
    downloadLink.click()

    document.body.removeChild(downloadLink)
}

export default handleDownload