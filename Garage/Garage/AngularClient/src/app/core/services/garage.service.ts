import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, take, tap } from 'rxjs';
import { Car, CarAtService, CarHistory, ContactPerson } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private _carsAtService$ = new BehaviorSubject<CarAtService[]>([]);
  private _contacts$ = new BehaviorSubject<ContactPerson[]>([]);
  private _cars$ = new BehaviorSubject<Car[]>([]);
  private _carHistory$ = new BehaviorSubject<CarHistory[]>([]);
  private _contact$ = new BehaviorSubject<ContactPerson>(null!);
  private _car$ = new BehaviorSubject<Car>(null!);
  private _carAtService$ = new BehaviorSubject<CarAtService>(null!);
  public _waitIndicator$ = new BehaviorSubject<boolean>(false);
  private params: any;

  constructor(private http: HttpClient) { }

  private getCarsAtService = (params?: any) => {
    this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      params,
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._carsAtService$.next(res.body);
    });
  }



  public getCarHistory = (carId: number) => {
    this.http.get<any>(`http://localhost:5067/api/CarServiceHistories/car/${carId}`, {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._carHistory$.next(res.body);
    });
  }

  public getCarAtService = (carId: number) => {
    return this.http.get<any>(`http://localhost:5067/api/CarAtServices/${carId}`, {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    );
  }

  public getContacts = () => {
    this.http.get<any>('http://localhost:5067/api/ContactPersons', {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._contacts$.next(res.body);
    });
  }

  private getContact = (id: number) => {
    this.http.get<any>(`http://localhost:5067/api/ContactPersons/${id}`, {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._contact$.next(res.body);
    });
  }

  public updateContact = (id: number, contact: ContactPerson) => {
    return this.http.put(`http://localhost:5067/api/ContactPersons/${id}`, contact).pipe(
      delay(500),
      take(1)
    );
  }

  public createContact = (contact: ContactPerson) => {
    return this.http.post(`http://localhost:5067/api/ContactPersons`, contact).pipe(
      delay(500),
      take(1)
    );
  }

  public deleteContact = (contactId: number) => {
    return this.http.delete(`http://localhost:5067/api/ContactPersons/${contactId}`).pipe(
      delay(500),
      take(1)
    );
  }


  public getCars = () => {
    this.http.get<any>('http://localhost:5067/api/Cars', {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._cars$.next(res.body);
    });
  }

  private getCar = (id: number) => {
    this.http.get<any>(`http://localhost:5067/api/Cars/${id}`, {
      observe: 'response'
    }).pipe(
      tap(() => this._waitIndicator$.next(true)),
      delay(500)
    ).subscribe((res: any) => {
      this._waitIndicator$.next(false);
      this._car$.next(res.body);
    });
  }

  public updateCar = (id: number, car: Car) => {
    return this.http.put(`http://localhost:5067/api/Cars/${id}`, car).pipe(
      delay(500),
      take(1)
    );
  }

  public createCar = (car: Car) => {
    return this.http.post(`http://localhost:5067/api/Cars`, car).pipe(
      delay(500),
      take(1)
    );
  }

  public deleteCar = (carId: number) => {
    return this.http.delete(`http://localhost:5067/api/Cars/${carId}`).pipe(
      delay(500),
      take(1)
    );
  }

  public cancelHistoryStatus = (carHistoryId: number, reasonToCancel: string) => {
    return this.http.put(`http://localhost:5067/api/CarServiceHistories/cancel/${carHistoryId}`, { reasonToCancel: reasonToCancel }).pipe(
      delay(500),
      take(1)
    );
  }

  public createHistoryStatus = (carHistory: CarHistory, carId: number) => {
    return this.http.post(`http://localhost:5067/api/CarServiceHistories/car/${carId}`, carHistory).pipe(
      delay(500),
      take(1)
    );
  }

  public createCarAtService = (carAtService: CarAtService) => {
    return this.http.post(`http://localhost:5067/api/CarAtServices`, carAtService).pipe(
      delay(500),
      take(1)
    );
  }

  public carsAtService$ = (params: any) => {
    this.params = params;
    this.getCarsAtService(this.params);
    return this._carsAtService$.asObservable();
  }

  public carAtService$ = (carId: number) => {
    this.getCarAtService(carId);
    return this._carAtService$.asObservable();
  }

  public contacts$ = () => {
    this.getContacts();
    return this._contacts$.asObservable();
  }

  public cars$ = () => {
    this.getCars();
    return this._cars$.asObservable();
  }

  public carHistory$ = (carId: number) => {
    this.getCarHistory(carId);
    return this._carHistory$.asObservable();
  }

  public contact$ = (id: number) => {
    this.getContact(id);
    return this._contact$.asObservable();
  }

  public car$ = (id: number) => {
    this.getCar(id);
    return this._car$.asObservable();
  }
}
