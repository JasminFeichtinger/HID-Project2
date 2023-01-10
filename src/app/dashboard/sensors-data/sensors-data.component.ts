import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { SENSORS_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {
  public get SensorPosition() {return SensorPosition; }
  showConfirmation: boolean = false;
  measurementIdToDelete: number = -1;

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  public pages: number = 0;
  public currentPage: number = 1;

  async ngOnInit() {
    this.storeService.isLoading = true;
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten(this.currentPage);
    this.storeService.isLoading = false;
    this.pages = Math.ceil(this.storeService.sensorenDatenTotalCount / SENSORS_PER_PAGE);
  }

  toggleConfirmation(id: number) {
    this.showConfirmation = !this.showConfirmation;
    this.measurementIdToDelete = id;
  }
  

  async deleteSensordata() {
    this.showConfirmation = false;
    this.storeService.isLoading = true;
    await this.backendService.deleteSensorsDaten(this.measurementIdToDelete, this.currentPage);
    this.storeService.isLoading = false;
  }

  async selectPage(i: any) {
    this.storeService.isLoading = true;
    this.currentPage = i + 1;
    await this.backendService.getSensorenDaten(this.currentPage);
    this.storeService.isLoading = false;
  }
}

export interface deleteSensor {
  id: number;
  confirm: boolean;
}
