import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Camera } from '../shared/camera';
import { CameraService } from '../services/camera.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;
  searchText: FormControl;
  cameraPrice: FormControl;
  cameraOwner: FormControl;
  cameraType: FormControl;

  cameras: Observable<Camera[]>;
  camerasArray: Camera[];

  ownerTypes: String[];
  cameraTypes: String[];
   
  constructor(private fb: FormBuilder, private db: AngularFirestore, private cameraService: CameraService, private userService: UserService) {  //@Inject('CameraTypes') private cameraTypes,
      this.searchText = new FormControl();
      this.cameraPrice = new FormControl();
      this.cameraOwner = new FormControl();
      this.cameraType = new FormControl();

      this.cameraTypes = this.cameraService.getCameraTypes();
      this.ownerTypes = this.userService.getUserRole();

      this.createForm();
  }

  createForm(){
    this.filterForm = this.fb.group({
      searchText: ['', [ Validators.required ] ],
      cameraOwner: ['', [ ] ],
      cameraPrice: [, [  ] ],
      cameraType: [ '', [  ] ]
    })
  }

  onSearchChange(searchText) {
     this.cameraService.searchCameras(searchText);
  }

  ngOnInit() {
  }

  public searchCameras(){
    if(this.filterForm.valid){
      let searchText: String = this.filterForm.get('searchText').value;
      console.log(searchText);

      this.cameraService.searchCameras(searchText);
    }
  }

}
