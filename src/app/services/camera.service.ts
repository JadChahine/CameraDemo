import { Injectable, Output, EventEmitter } from '@angular/core';
import { Camera } from '../shared/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  
  cameras: Observable<Camera[]>;
  camerasArray: Camera[];

  cameraEntries = [];

  constructor(private db: AngularFirestore) {
    
  }

  searchCameras(cameraNameToSearch): any{
    console.log('Text to search: ' + cameraNameToSearch);

    this.cameras = this.db.collection('cameras').valueChanges() as Observable<Camera[]>;

    this.cameras.subscribe(cameraEntries =>
      this.cameraEntries = cameraEntries
    );

    let camerasToDisplay: any = []

    this.cameraEntries.forEach(camera => {
      console.log('Camera name: ' + camera.name);
      if(camera.name == cameraNameToSearch){
        camerasToDisplay.push(camera);
      }
    });
   
    this.fire.emit(camerasToDisplay);
  }

  getCameras(){
    return this.fire;
  }

}
