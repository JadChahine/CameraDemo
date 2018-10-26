import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  name: FormControl;
  description: FormControl;
  cameraPrice: FormControl;
  cameraOwner: FormControl;
  cameraType: FormControl;

  selectedCameraType: String;

  constructor(private fb: FormBuilder,
             @Inject('CameraTypes') private cameraTypes,
             private cameraService: CameraService) {
    
    this.name = new FormControl();
    this.description = new FormControl();
    this.cameraPrice = new FormControl();
    this.cameraOwner = new FormControl();
    this.cameraType = new FormControl();

    this.createForm();
  }

  createForm(){
    this.editForm = this.fb.group({
      name: ['', [ Validators.required ] ],
      description: ['',  ],
      cameraType: [ '', [ Validators.required ] ],
      cameraPrice: [ , [ Validators.required ]],
      cameraOwner: [ '', [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

}
