class Base64UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          resolve({ default: reader.result });
        };
        
        reader.onerror = error => {
          reject(error);
        };
        
        reader.readAsDataURL(file);
      }));
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    return Promise.reject();
  }
}

export function Base64UploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new Base64UploadAdapter(loader);
  };
}
