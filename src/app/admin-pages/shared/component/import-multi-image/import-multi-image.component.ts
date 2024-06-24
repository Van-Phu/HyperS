import { Component } from '@angular/core';
import { UploadImageService } from '../../service/uploadImage.service';

@Component({
  selector: 'component-import-multi-image',
  templateUrl: './import-multi-image.component.html',
  styleUrls: ['./import-multi-image.component.scss']
})
export class ImportMultiImageComponent {
  selectedFile: File | null = null;

  constructor(private uploadImageService: UploadImageService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadImageService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Response from ImgBB:', response);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
}
