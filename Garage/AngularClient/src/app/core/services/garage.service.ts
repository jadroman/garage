import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { CancelHistoryStatusReq, Car, CarAtService, CarHistory, ContactPerson } from '../models/garage.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private _carsAtService$ = new BehaviorSubject<CarAtService[]>([]);
  private _contacts$ = new BehaviorSubject<ContactPerson[]>([]);
  public _cars$ = new BehaviorSubject<Car[]>([]);
  private _carHistory$ = new BehaviorSubject<CarHistory[]>([]);
  private _contact$ = new BehaviorSubject<ContactPerson>(null!);
  private _car$ = new BehaviorSubject<Car>(null!);
  private _carAtService$ = new BehaviorSubject<CarAtService>(null!);
  public _waitIndicator$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public getCarsAtService = (params?: any) => {
    return this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      params,
      observe: 'response'
    }).pipe(
      delay(500),
      map(resp => {
        return resp.body as CarAtService[];
      })
    );
  }



  public getCarHistory = (carId: number) => {
    return this.http.get<any>(`http://localhost:5067/api/CarServiceHistories/car/${carId}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map(resp => {
        return resp.body as CarHistory[];
      })
    );
  }

  public getCarAtService = (carId: number) => {
    return this.http.get<any>(`http://localhost:5067/api/CarAtServices/car/${carId}`, {
      observe: 'response'
    }).pipe(
      delay(1000),
      map(resp => {
        return resp.body as CarAtService;
      })
    );
  }

  public getContacts = () => {
    return this.http.get<any>('http://localhost:5067/api/ContactPersons', {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as ContactPerson[]
      })
    );
  }

  public getContact = (id: number) => {
    return this.http.get<any>(`http://localhost:5067/api/ContactPersons/${id}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as ContactPerson
      })
    );
  }

  public updateContact = (contact: ContactPerson) => {
    return this.http.put(`http://localhost:5067/api/ContactPersons/${contact.id}`, contact).pipe(
      delay(500),
      map((contactPerson) => {
        return contactPerson as ContactPerson;
      })
    );
  }

  public createContact = (contact: ContactPerson) => {
    return this.http.post(`http://localhost:5067/api/ContactPersons`, contact).pipe(
      delay(500),
      map((car) => {
        return car as ContactPerson;
      })
    );
  }

  public deleteContact = (contactId: number) => {
    return this.http.delete(`http://localhost:5067/api/ContactPersons/${contactId}`).pipe(
      delay(500)
    );
  }


  public getCars = () => {
    return this.http.get<any>('http://localhost:5067/api/Cars', {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as Car[]
      })
    );
  }

  public getCar = (id: number) => {
    return this.http.get<any>(`http://localhost:5067/api/Cars/${id}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as Car
      })
    );
  }

  public updateCar = (car: Car) => {
    return this.http.put(`http://localhost:5067/api/Cars/${car.id}`, car).pipe(
      delay(500),
      map((car) => {
        return car as Car;
      })
    );
  }

  public createCar = (car: Car) => {
    return this.http.post(`http://localhost:5067/api/Cars`, car).pipe(
      delay(500),
      map((car) => {
        return car as Car;
      })
    );
  }

  public deleteCar = (carId: number) => {
    return this.http.delete(`http://localhost:5067/api/Cars/${carId}`).pipe(
      delay(500)
    );
  }

  public seedData = () => {
    return this.http.post(`http://localhost:5067/api/Seed`, {}).pipe(
      delay(500),
      take(1)
    );
  }

  public cancelHistoryStatus = (cancelation: CancelHistoryStatusReq) => {
    return this.http.put(`http://localhost:5067/api/CarServiceHistories/cancel/${cancelation.carHistoryId}`, { reasonToCancel: cancelation.reasonToCancel }).pipe(
      delay(500)
    );
  }

  public createHistoryStatus = (carHistory: CarHistory) => {
    return this.http.post(`http://localhost:5067/api/CarServiceHistories/car/${carHistory.car?.id}`, carHistory).pipe(
      delay(500)
    );
  }

  public createCarAtService = (carAtService: CarAtService) => {
    return this.http.post(`http://localhost:5067/api/CarAtServices`, carAtService).pipe(
      delay(500),
      map((car) => {
        return car as CarAtService;
      })
    );
  }
  /* 
    public carsAtService$ = (params: any) => {
      this.params = params;
      this.getCarsAtService(this.params);
      return this._carsAtService$.asObservable();
    } */

  /* public carAtService$ = (carId: number) => {
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
  } */

  /* public car$ = (id: number) => {
    this.getCar(id);
    return this._car$.asObservable();
  } */
}
/*************************************/
