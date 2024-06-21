import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';

type ImagePreview = {
  src: string | ArrayBuffer;
  uid: string;
};

@Component({
  selector: 'component-import-image',
  templateUrl: './import-image.component.html',
  styleUrls: ['./import-image.component.scss']
})
export class ImportImageComponent {
  public events: string[] = [];
  public imagePreview: ImagePreview;
  @Output() fileSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() srcImage: string = '';
  @Input() text: string = '';
  // @Input() width: number = 300;
  // @Input() minWidth: number = 100;
  @Input() imgWidth: number = 200;
  @Input() imgMinWidth: number = 100;
  @Input() imgHeight: number = 200;
  @Input() imgMinHeight: number = 150;
  @Input() gap: number = 50;
  @Input() rounded: number = 2;



  public fileRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"],
  };

  public select(e: SelectEvent){
    this.srcImage = '';
    const objectFile = e.files;
    this.imagePreview = null;
    const that = this;

    e.files.forEach((file) => {
      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          const image: ImagePreview = {
            src: ev.target["result"],
            uid: file.uid,
          };

          that.imagePreview = image;
        };
        
        reader.readAsDataURL(file.rawFile);
      }
    });
    
    // Emit the filename to the parent component
    this.fileSelected.emit(objectFile[0].name);
  }


  public delete(){
    this.imagePreview = null;
    this.srcImage = null;
    this.fileSelected.emit('');
  }
}
