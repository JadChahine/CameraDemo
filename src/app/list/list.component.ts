import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera } from '../shared/camera';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cameraEntries = [];

  cameras: Observable<Camera[]>;

  constructor(private listService: ListService,
             private db: AngularFirestore,
             private cameraService: CameraService) {
      this.cameras = db.collection('cameras').valueChanges() as Observable<Camera[]>;

      setTimeout( ()=>{   
        this.cameras.subscribe(items =>
          this.cameraEntries = items
        );
      }, 2000); 
   }

  ngOnInit() {
     this.cameraService.getSearchResults()
      .subscribe(
          searchResultList => {
            console.log('Search result list: ' + searchResultList);
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

}
