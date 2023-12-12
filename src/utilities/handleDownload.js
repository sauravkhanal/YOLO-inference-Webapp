async function handleDownload(inferredImage) {

    const response = await fetch(inferredImage);
    const blob = await response.blob();

    const imgNameSplit = inferredImage.toString().split("/")
    const imgName = imgNameSplit[imgNameSplit.length - 1]

    // timeStamp = "x"

    const anchorElement = document.createElement('a');
    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.download = imgName;
    anchorElement.click();

}
export default handleDownload