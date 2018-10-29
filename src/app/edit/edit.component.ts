import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CameraService } from '../services/camera.service';
import { Camera } from '../shared/camera';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('fform') saveCameraFormDirective;
  
  saveCameraForm: FormGroup;

  cameraId: FormControl;
  cameraName: FormControl;
  cameraDescription: FormControl;
  cameraPrice: FormControl;
  cameraOwner: FormControl;
  cameraType: FormControl;

  cameraTypes: String[];

  constructor(private fb: FormBuilder,  private cameraService: CameraService) {
    this.cameraId = new FormControl();
    this.cameraName = new FormControl();
    this.cameraDescription = new FormControl();
    this.cameraPrice = new FormControl();
    this.cameraOwner = new FormControl();
    this.cameraType = new FormControl();

    this.cameraTypes = this.cameraService.getCameraTypes();

    this.createForm();
  }

  createForm(){
    this.saveCameraForm = this.fb.group({
      cameraId: [''],
      cameraName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)] ],
      cameraDescription: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(250)] ],
      cameraType: [ '', [ Validators.required ] ],
      cameraPrice: [ , [ Validators.required ]],
      cameraOwner: [ '', [ Validators.required ]]
    });
  }

  ngOnInit() {
    //listening to the list component to display the camera information once the edit is executed
    this.cameraService.getCameraEditInformation()
    .subscribe(
        cameraInformation => {
          this.saveCameraForm.patchValue({cameraId: cameraInformation['id']});
          this.saveCameraForm.patchValue({cameraName: cameraInformation['Name']});
          this.saveCameraForm.patchValue({cameraDescription: cameraInformation['Description']});
          this.saveCameraForm.patchValue({cameraType: cameraInformation['Type']});
          this.saveCameraForm.patchValue({cameraPrice: cameraInformation['Price']});
          this.saveCameraForm.patchValue({cameraOwner: cameraInformation['Owner']});
        },
        error => {
          console.log('Failed to get camera information due to ', error)
        },
        () => { }
    );

    this.cameraService.getNewCameraEvent()
    .subscribe(
        data =>  {
          this.saveCameraForm.patchValue({cameraId: '' });
          this.saveCameraForm.patchValue({cameraName: '' });
          this.saveCameraForm.patchValue({cameraDescription: '' });
          this.saveCameraForm.patchValue({cameraType: '' });
          this.saveCameraForm.patchValue({cameraPrice: '' });
          this.saveCameraForm.patchValue({cameraOwner: '' });

          this.resetForm();
        },
        error => {
          console.log('Failed to reset form in order to create a new camera due to ', error)
        },
    );
  }
   /**
   * 
   * @param camera 
   */
  saveCamera(){
    let camera = new Camera(
      this.saveCameraForm.get('cameraName').value,
      this.saveCameraForm.get('cameraDescription').value,
      this.saveCameraForm.get('cameraType').value,
      this.saveCameraForm.get('cameraPrice').value,
      this.saveCameraForm.get('cameraOwner').value
    );

    if(this.saveCameraForm.valid){
      if(this.saveCameraForm.get('cameraId').value != ''){
        camera.id = this.saveCameraForm.get('cameraId').value;

        console.log('Read to update camera of Id ' + camera.id);

        this.cameraService.updateCamera(camera);
      }
      else{
        console.log('Read to create new camera of Name ' + camera.name);

        this.cameraService.createCamera(camera);
      }
     
      this.saveCameraFormDirective.resetForm();
      this.resetForm();
    }
   }

   resetForm(){
    Object.keys(this.saveCameraForm.controls).forEach(key => {
      this.saveCameraForm.controls[key].setErrors(null)
    });
   }
}
