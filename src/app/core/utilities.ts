export class Utilities {


    private thumbnailify(base64Image, targetSize, callback) {
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");
            canvas.width = canvas.height = targetSize;
            ctx.drawImage(
                img,
                width > height ? (width - height) / 2 : 0,
                height > width ? (height - width) / 2 : 0,
                width > height ? height : width,
                width > height ? height : width,
                0, 0,
                targetSize, targetSize
            );
            callback(canvas.toDataURL());
        };
        img.src = base64Image;
    }

    handleFiles(files: FileList, maxImageSize: number, type: string, maxImageDimention: number,
        callback: (image) => void, supportTypes?, onError?: (errormessage) => void) {
        let inValidImage: boolean;
        if (files.length === 1) {
            const nameParts = files[0].name.split('.');
            const uploadImage = nameParts[1];
            let supportedTypes: string[];
            if (type === 'drag') {
                supportedTypes = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF', 'pdf', 'docx', 'doc'];
                if (supportTypes) {
                    supportedTypes = supportTypes;
                }
                if (!supportedTypes.includes(uploadImage)) {
                    inValidImage = false;
                    onError('This type is not supported. Supported types are ' + supportTypes.join(', '));
                } else {
                    inValidImage = true;
                }
            } else {
                supportedTypes = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];
                if (supportTypes) {
                    supportedTypes = supportTypes;
                }
                if (!supportedTypes.includes(uploadImage)) {
                    inValidImage = false;
                    onError(`Supported Types are  ${supportTypes.join(', ')}`);
                } else {
                    inValidImage = true;
                }
            }
            if (inValidImage) {
                const fileReader = new FileReader();
                if (supportedTypes.includes(nameParts[nameParts.length - 1]) && (files[0].size / 1024) <= maxImageSize) {
                    fileReader.readAsDataURL(files[0]);
                    fileReader.onload = () => {
                        if (type === 'drag' || !maxImageDimention) {
                            callback(fileReader.result);
                        } else {
                            this.thumbnailify(
                                fileReader.result,
                                maxImageDimention,
                                (thumbnail) => {
                                    callback(thumbnail);
                                }
                            );
                        }
                    };
                } else if ((files[0].size / 1024) > maxImageSize) {
                    onError(`Image max size is ${maxImageSize}k`);
                }
            }
        } else {
            onError('Upload only one File');
        }
    }

    isNumberFormat(e: any) {
        const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        if (!charStr.match(/^[0-9\b]+$/) && charCode !== 0) {
            e.preventDefault();
        }
    }

    isPasteNumberFormat(event) {
        const paste = event.clipboardData.getData('text');
        if (!paste.match(/^[0-9\b]+$/)) {
            event.preventDefault();
        }
    }

    checkNumberInRange(e, max, min) {
        const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        const currentValue = charCode === 8 ?
            e.currentTarget.value.substring(0, e.currentTarget.value.length - 1) : e.currentTarget.value + charStr;
        // const regex = /^[1-9][0-9]?[0]?$/;
        // const x = regex.test(currentValue);
        const y = charCode === 8 ? true : /[0-9]/.test(charStr);
        if (!y || +currentValue > +max || +currentValue < +min) {
            e.preventDefault();
        }
    }

    checkPasteNumberInRange(e, max, min) {
        const paste = e.clipboardData.getData('text');
        const regex = new RegExp(`/^[0-9]{${(min + '').length},${(max + '').length - 1}}[0]?$/`);
        // const x = regex.test(currentValue);
        const isValid = regex.test(paste);
        if (!isValid || +paste > +max || +paste < +min) {
            e.preventDefault();
        }
    }

    isNumberFloat(e) {
        const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        const currentValue = e.currentTarget.value + charStr;
        const regex = /^[-+]?[0-9]+\.?[0-9]*$/;
        const x = regex.test(currentValue);
        const y = regex.test(charStr);
        if (!x || (!y && (charStr !== '.' || e.currentTarget.value.includes('.')))) {
            e.preventDefault();
        }
    }

    isPasteNumberFloat(e) {
        const paste = e.clipboardData.getData('text');
        const regex = /^[-+]?[0-9]+\.?[0-9]*$/;
        const x = regex.test(paste);
        if (!x) {
            e.preventDefault();
        }
    }

}
