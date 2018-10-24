import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  rows = [];

  constructor(private listService: ListService) {

   }

  ngOnInit() {
    this.rows = this.listService.getCameras();
  }

}
