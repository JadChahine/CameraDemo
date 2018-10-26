import { Injectable } from '@angular/core';
import { Camera } from '../shared/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  searchCameras$: Observable<any>;
  private camerasToDisplay =  new Subject<any>();

  constructor(private db: AngularFirestore) {
    this.searchCameras$ = this.camerasToDisplay.asObservable();
  }

  cameras: Observable<Camera[]>;
  camerasArray: Camera[];

  searchCameras(cameraNameToSearch){
    console.log('Text to search :' + cameraNameToSearch); 

    this.cameras = this.db.collection('cameras').valueChanges() as Observable<Camera[]>;

    this.cameras.subscribe(items => this.camerasArray = items,  error => console.log('error',error),);

    if(this.camerasArray != null){
      this.camerasArray.forEach(camera => {
        if(camera.name == cameraNameToSearch){
          this.camerasToDisplay.next(camera);
        }
      });
    }
  }

}
