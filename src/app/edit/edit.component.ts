import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  name: FormControl;
  description: FormControl;
  price: FormControl;
  owner: FormControl;
  cameraType: FormControl;

  //cameraTypes: String[];
  selectedCameraType: String;

  constructor(private fb: FormBuilder,
             @Inject('CameraTypes') private CameraTypes) {
    
    this.name = new FormControl();
    this.description = new FormControl();
    this.price = new FormControl();
    this.owner = new FormControl();
    this.cameraType = new FormControl();

    //this.cameraTypes = CAMERA_TYPES;

    this.createForm();
  }

  createForm(){
    this.editForm = this.fb.group({
      name: ['', [ Validators.required ] ],
      description: ['',  ],
      cameraType: [ '', [ Validators.required ] ],
      price: [ 0, [ Validators.required ]],
      owner: [ '', [ Validators.required ]]
    });
  }

  ngOnInit() {

  }

}
