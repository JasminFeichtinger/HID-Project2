import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { StoreService } from '../shared/store.service';
import { SensorsDataComponent } from './sensors-data/sensors-data.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  showConfirmation:boolean = false;

  @ViewChild(SensorsDataComponent) sensorsDataComponent: SensorsDataComponent | undefined;

  constructor() { }

  async ngOnInit() {
  }
  
  toogleConfirmation(choice: boolean){
    console.log("toggled");
    this.showConfirmation = choice;
  }


}
