import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'hammerjs';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { GetImageUrlService } from 'src/app/shared/get-image-url.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  title = 'upload-file';
  uploadFiles: File[];
  urls = [];
  imageUrls = [];
  uploads: any[];
  uploading = false;
  allPercentage: Observable<any>;
  files: Observable<any>;
  success = false;
  invalidFile = false;
  loginStatus: Boolean = false;
  constructor(
    public afs: AngularFirestore, public storage: AngularFireStorage,
    private loginStatusService: LoginStatusService,
    private getImageUrlService: GetImageUrlService
  ) { }
  ngOnChanges() {

  }
  ngOnInit() {
    this.loginStatusService.status.subscribe(status => {
      console.log(status);
      this.loginStatus = status;
    });
    // this.getImageUrlService.url.subscribe()
    console.log(this.loginStatus);
    this.files = this.afs.collection('files').valueChanges();
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }


  detectFiles(event) {
    this.uploadFiles = [];
    this.imageUrls = [];
    this.galleryImages = [];
    this.uploading = false;
    this.success = false;
    this.invalidFile = false;
    this.uploadFiles = event.target.files;
    if (this.files) {
      for (let file of this.uploadFiles) {
        if ((file.type != 'image/jpeg' && file.type != 'image/png') || file.size > 5 * 1024 * 1024) {
          this.invalidFile = true;
          return;
        }
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index) {
    this.urls.splice(index, 1);
    var newFileList = Array.from(this.uploadFiles);
    newFileList.splice(index, 1);
    this.uploadFiles = newFileList;
  }

  onUpload() {
    // reset the array 
    this.uploads = [];
    this.uploading = true;
    const filelist = this.uploadFiles;
    const allPercentage: Observable<number>[] = [];
    var count = 0;
    for (const file of filelist) {
      let current = new Date();
      const path = `files/${file.name}_${current.getTime()}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed upload object with different information.
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      }

      // push each upload into the array
      this.uploads.push(uploadTrack);

      // get upload file informations from firebase
      const _t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          count++;
          if (count == filelist.length) {
            this.success = true;
            this.urls = [];
            this.uploading = false;
          }
          this.imageUrls.push(url);
          let galleryImg = {
            small: url,
            medium: url,
            big: url
          };
          this.galleryImages.push(galleryImg);
          return this.afs.collection('files').add({
            name: f.metadata.name,
            url: url
          });
        })
      })
    }
    console.log(this.imageUrls);
    this.getImageUrlService.updateUrl(this.imageUrls);
  }

}
