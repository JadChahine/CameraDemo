import { Injectable } from '@angular/core';
import { Camera } from '../shared/camera';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of  } from 'rxjs';
import { CameraTypes } from '../shared/cameraTypes';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private camerasCollection: AngularFirestoreCollection<Camera>;

  private camerasSearchResult = new BehaviorSubject([]);
  private camerasEditInformationResult = new BehaviorSubject([]);
  private newCameraEventResult = new BehaviorSubject([]);

  constructor(private db: AngularFirestore) {
    this.camerasCollection = this.db.collection('cameras');

  }
  
  /**
   * Search cameras for the passed search text
   * 
   * @param searchText 
   */
  public searchCameras(searchText) {
    this.db.collection('cameras').valueChanges()
    .subscribe(
        response => {
          let res = response as Camera[];
          
          res = res.filter(function(camera) {
            return camera['Name'].includes(searchText);
          });

          this.camerasSearchResult.next(res)
        }
    );
  }

  /**
   * Get the search results
   */
  public getSearchResults(){
    return this.camerasSearchResult.asObservable();
  }

  public editCameraEvent(camera){
    this.camerasEditInformationResult.next(camera);
  }

  public getCameraEditInformation(){
    return this.camerasEditInformationResult.asObservable();
  }

  public createNewCameraEvent(){
    let cameras: Camera[];
    this.newCameraEventResult.next(cameras);
  }

  public getNewCameraEvent(){
    return this.newCameraEventResult.asObservable();
  }

  /**
   * Get the list of camera types from 'cameraTypes' collection
   */
  public getCameraTypes(): String[]{
    let cameraTypes: String[] = [];

    this.db.collection('cameraTypes').valueChanges()
    .subscribe(
        response => {
          let res = response as CameraTypes[];
          
          res.forEach(camera => {
            cameraTypes.push(camera['Name']);
          });
        }
    );

    return cameraTypes;
  }

  /**
   * Insert a new camera into 'cameras' collection
   * 
   * @param camera 
   */
  public createCamera(camera: Camera){
    console.log('Ready to create a new camera for name: ' + camera.name);

    const camerasRef = this.db.collection('cameras');
    camerasRef.add({ Name: camera.name, Type: camera.type, Description: camera.description, Price: camera.price, Owner: camera.owner});

    console.log('Camera created succesfully: ' + JSON.stringify(camera));
  }
  /**
   * 
   * @param camera 
   */
  public updateCamera(camera){
    console.log('Ready to update camera of Id: ' + camera.id + ' and name: ' + camera.name);
    
    this.camerasCollection.doc(camera.id).update({
      Name: camera.name,
      Description: camera.description,
      Type: camera.type,
      Price: camera.price,
      Owner: camera.owner
    }).then(() => {
      console.log('Camera updated successfully of Id: ' + camera.id);
    })
  }

   /**
   * 
   * @param camera 
   */
  public deleteCamera(camera){
    console.log('Ready to delete camera of Id: ' + camera.id + ' and name: ' + camera.Name);
    
    this.camerasCollection.doc(camera.id).delete().then(() => {
      console.log('Camera deleted successfully of Id: ' + camera.id);
    })
  }

}
