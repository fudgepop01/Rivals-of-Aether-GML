export const loadImage = async () => {
    let fileReader = new FileReader();
    return await fileReader.readAsArrayBuffer()
}