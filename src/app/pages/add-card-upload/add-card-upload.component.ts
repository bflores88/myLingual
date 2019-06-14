import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AddWordResponse {
  message: string,
  english_word: string,
  id: number,
  image_link: string,
}

@Component({
  selector: 'app-add-card-upload',
  templateUrl: './add-card-upload.component.html',
  styleUrls: ['./add-card-upload.component.scss']
})
export class AddCardUploadComponent implements OnInit {
  uploadForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;

  selectImage = true;
  confirm = false;
  loading = false;
  showPhoto = true;
  
  userId = 0;
  errorMessage = '';

  constructor(private backend: BackendService, private session: SessionService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
    return this.getUserSession();
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
  }

  cancelSubmit() {
    this.confirm = false;
    this.selectImage = true;
    this.showPhoto = false;
  }

  submitImage() {
    this.loading = true;
    this.confirm = false;
    console.log(this.uploadForm.value.image)
    let formData = new FormData();
    console.log(formData);
    // formData.append('test', 'heeooo');
    formData.append('image', this.uploadForm.value.image);

    console.log(formData);

    this.backend.postFlashcardImageUpload(formData).then((data: AddWordResponse) => {
      this.loading = false;
      console.log(data);
      this.errorMessage = data.message;
    })
  }

  preview(files) {

    if (files.length === 0)
      return;
 
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const file = files[0];
    console.log(file)
    this.uploadForm.get('image').setValue(file);
    this.selectImage = false;
    this.confirm = true;
    this.showPhoto = true;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
