import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder,
             @Inject('CameraTypes') private CameraTypes) {

      this.searchText = new FormControl();
      this.cameraPrice = new FormControl();
      this.cameraOwner = new FormControl();
      this.cameraType = new FormControl();

      this.createForm();
  }

  createForm(){
    this.filterForm = this.fb.group({
      searchText: ['', [ Validators.required ] ],
      cameraOwner: ['', [Validators.required] ],
      cameraPrice: [0, [ Validators.required] ],
      cameraType: [ '', [ Validators.required ] ]
    })
  }

  ngOnInit() {
  }

}
