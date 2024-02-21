import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarAtService } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private _carsAtService$ = new BehaviorSubject<CarAtService[]>([]);

  constructor(private http: HttpClient) {
    this.getCarsAtService();
  }

  private getCarsAtService = () => {
    this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      observe: 'response'
    }).subscribe((res: any) => {
      this._carsAtService$.next(res.body);
    })
  }

  public carsAtService$ = this._carsAtService$.asObservable();


}
