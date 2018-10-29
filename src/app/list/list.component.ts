import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Camera } from '../shared/camera';
import { CameraService } from '../services/camera.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  cameraEntries = [];

  camerasCollection: AngularFirestoreCollection<Camera>;
  cameras: Observable<Camera[]>;

  subscription: Subscription;

  constructor(private db: AngularFirestore, private cameraService: CameraService) {
      this.camerasCollection = this.db.collection('cameras');

      //used snapshotChanges() instead of valueChanges() in order to get the 'id' of the firebase document
      this.cameras = this.camerasCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Camera;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));

      this.cameras.subscribe(items => this.cameraEntries = items );
   }

  ngOnInit() {
    //listening to the filter component to display the results once the search is executed
    this.subscription = this.cameraService.getSearchResults()
                    .subscribe(
                        searchResultList => {
                          console.log('Search result list: ' + JSON.stringify(searchResultList));
                          this.cameraEntries = searchResultList;
                        },
                        error => {
                          console.log('Failed to search for cameras due to ', error)
                        },
                        () => {
                          console.log('Cameras searched successfully')
                        }
                    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  createNewCamera(){
    this.cameraService.createNewCameraEvent();
  }

  /**
   * 
   * @param camera 
   */
  deleteCamera(camera){
    this.cameraService.deleteCamera(camera);
  }

  /**
   * 
   * @param camera 
   */
  editCamera(camera){
    this.cameraService.editCameraEvent(camera);
  }


}
