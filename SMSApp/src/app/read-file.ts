export class ReadFile {
    readFile(file: any, callback){
        let fileString;
        let reader = new FileReader();
            reader.onload = (loadEvent: any) => {
                fileString = loadEvent.target.result;
                callback(fileString);
            }
            reader.readAsDataURL(file);
      }

      readImage(file: any, callback){
        let imageString;
        let reader = new FileReader();
            reader.onload = (loadEvent: any) => {
                imageString = loadEvent.target.result;
                callback(imageString);
            }
            reader.readAsDataURL(file);
      }

      readImageWithResize(file: any, width: number, height: number, callback){
        let imageString;
        let reader = new FileReader();
            reader.onload = (loadEvent: any) => {
                this.resizeImage(reader, width, height, (result) => {
                  imageString = result;
                  callback(imageString);
                });
            }
            reader.readAsDataURL(file);
      }

      resizeImage(reader: any, width: number, height: number, callback){
    
        let imageString;
        let img = document.createElement("img");  
            img.src = reader.result;
          
            img.onload = (event: any) => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              imageString = canvas.toDataURL('image/jpeg');
              callback(imageString);
            };    
      }
}

