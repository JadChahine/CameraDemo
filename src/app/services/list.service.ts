import { Injectable } from '@angular/core';

import { CAMERAS } from '../shared/cameras';
import { Camera } from '../shared/camera';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getCameras(): Camera[]{
    return CAMERAS;
  }

}
