import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, tap } from 'rxjs';
import { CarAtService, CarHistory, ContactPerson } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private _carsAtService$ = new BehaviorSubject<CarAtService[]>([]);
  private _contacts$ = new BehaviorSubject<ContactPerson[]>([]);
  private _carHistory$ = new BehaviorSubject<CarHistory[]>([]);
  private _loadingCarsAtService$ = new BehaviorSubject<boolean>(false);
  private _loadingCarHistory$ = new BehaviorSubject<boolean>(false);
  private _loadingContacts$ = new BehaviorSubject<boolean>(false);
  private params: any;

  constructor(private http: HttpClient) { }

  private getCarsAtService = (params?: any) => {
    this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      params,
      observe: 'response'
    }).pipe(
      tap(() => this._loadingCarsAtService$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._loadingCarsAtService$.next(false);
      this._carsAtService$.next(res.body);
    })
  }


  private getContacts = () => {
    this.http.get<any>('http://localhost:5067/api/ContactPersons', {
      observe: 'response'
    }).pipe(
      tap(() => this._loadingContacts$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._loadingContacts$.next(false);
      this._contacts$.next(res.body);
    })
  }

  private getCarHistory = (carId: number) => {
    this.http.get<any>(`http://localhost:5067/api/CarServiceHistories/car/${carId}`, {
      observe: 'response'
    }).pipe(
      tap(() => this._loadingCarHistory$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._loadingCarHistory$.next(false);
      this._carHistory$.next(res.body);
    })
  }

  public carsAtService$ = (params: any) => {
    this.params = params;
    this.getCarsAtService(this.params);
    return this._carsAtService$.asObservable();
  }

  public contacts$ = () => {
    this.getContacts();
    return this._contacts$.asObservable();
  }

  public carHistory$ = (carId: number) => {
    this.getCarHistory(carId);
    return this._carHistory$.asObservable();
  }


  public loadingCarsAtService$ = this._loadingCarsAtService$.asObservable();
  public loadingCarHistory$ = this._loadingCarHistory$.asObservable();
  public loadingContacts$ = this._loadingContacts$.asObservable();

}
