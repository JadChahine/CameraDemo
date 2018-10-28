import { Injectable } from '@angular/core';
import { Camera } from '../shared/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private searchResults = new BehaviorSubject([]);

  constructor(private db: AngularFirestore) {
  }
  
  public searchCameras(searchText) {
    this.db.collection('cameras').valueChanges()
    .subscribe(
        response => {
          let res = response as Camera[];
          
          res = res.filter(function(camera) {
            return camera['Name'].includes(searchText);
          });

          this.searchResults.next(res)
        }
    );
  }

  public getSearchResults(){
    return this.searchResults.asObservable();
  }

}
