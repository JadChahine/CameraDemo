import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Camera } from '../shared/camera';
import { CameraService } from '../services/camera.service';

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
  
  constructor(private fb: FormBuilder,
              @Inject('CameraTypes') private cameraTypes,
              @Inject('OwnerTypes') private ownerTypes,
              private db: AngularFirestore,
              private cameraService: CameraService) {
      this.searchText = new FormControl();
      this.cameraPrice = new FormControl();
      this.cameraOwner = new FormControl();
      this.cameraType = new FormControl();

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

  ngOnInit() {
  }

  public searchCameras(){
    let searchText: String = this.filterForm.get('searchText').value;
    console.log(searchText);

    this.cameraService.searchCameras(searchText);
  }

}
