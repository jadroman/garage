import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, tap } from 'rxjs';
import { CarAtService, WorkStartedEnum } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private _carsAtService$ = new BehaviorSubject<CarAtService[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private params: any;

  constructor(private http: HttpClient) { }

  private getCarsAtService = (params?: any) => {
    this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      params,
      observe: 'response'
    }).pipe(
      tap(() => this._loading$.next(true)),
      delay(1000)
    ).subscribe((res: any) => {
      this._loading$.next(false);
      this._carsAtService$.next(res.body);
    })
  }

  public carsAtService$ = (params: any) => {
    this.params = params;
    this.getCarsAtService(this.params);
    return this._carsAtService$.asObservable();
  }


  public loading$ = this._loading$.asObservable();

}
