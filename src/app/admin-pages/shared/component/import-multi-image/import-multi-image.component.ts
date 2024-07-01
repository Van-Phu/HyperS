import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadImageService } from '../../service/uploadImage.service';
import { DTOImageProduct } from 'src/app/ecom-pages/shared/dto/DTOImageProduct';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'component-import-multi-image',
  templateUrl: './import-multi-image.component.html',
  styleUrls: ['./import-multi-image.component.scss']
})
export class ImportMultiImageComponent implements OnInit {
  selectedFile: File | null = null;
  maxQuantity: number = 10;
  listImageHandler: DTOImageProduct[];
  @Input() listImage: DTOImageProduct[];
  @Output() getListImageSelected: EventEmitter<any> = new EventEmitter<any>();

  fileRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"],
  };

  constructor(private uploadImageService: UploadImageService) { }

  ngOnInit(): void {
    this.listImageHandler = this.listImage;
    console.log(this.listImageHandler);
  }

  // Chọn file ảnh
  onFileSelected(event: any) {
    if (event) {
      this.selectedFile = event.files[0].rawFile;
    }
    this.onUpload();
    console.log(this.listImageHandler);
  }

  // Upload hình ảnh lên imgBB
  onUpload() {
    if (this.selectedFile) {
      this.uploadImageService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Response from ImgBB:', response);
          this.listImageHandler.push({
            "Code": 0,
            "IdImage": null,
            "ImgUrl": response.data.url,
            IsThumbnail: false
          })
          console.log(this.listImageHandler);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  // Xóa ảnh trong list
  deleteImageFromList(image: DTOImageProduct) {
    this.listImageHandler = this.listImageHandler.filter(img => img.ImgUrl !== image.ImgUrl);
  }

  clearListImage() {
    this.listImageHandler = [];
  }

  // Truyền danh sách hình ảnh được chọn cho output
  getListImageOutput() {
    this.getListImageSelected.emit(this.listImageHandler);
  }
}
