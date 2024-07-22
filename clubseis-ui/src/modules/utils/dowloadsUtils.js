export const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: contentType});
}

const contentTypeToExtension = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    // Ir añadiendo más según sea necesario
};

export const getExtensionFromContentType = (contentType) => {
    return contentTypeToExtension[contentType] || 'file';
}

export const fileDowload = (blob, fileName, contentType) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const extension = getExtensionFromContentType(contentType);
    a.href = url;
    a.download = `${fileName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const fileTypeDtoDowload = (contentType, base64, fileName) =>
    fileDowload(base64ToBlob(base64, contentType), fileName, contentType)


export const excelDowload = (blob, name) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name + '.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};