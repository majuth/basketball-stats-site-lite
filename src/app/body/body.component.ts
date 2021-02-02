import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private data: DataService) { }

  tab:Array<boolean>;

  ngOnInit() {
    this.data.currentTab.subscribe(tab => this.tab = tab);
  }

  

}
