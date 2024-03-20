import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, take, } from 'rxjs';
import { CancelHistoryStatusReq, Car, CarAtService, CarHistory, ContactPerson } from '../models/garage.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  constructor(private http: HttpClient) { }
  private readonly apiUrl = environment.apiUrl;

  public getCarsAtService = (params?: any) => {
    return this.http.get<any>(`${this.apiUrl}/CarAtServices`, {
      params,
      observe: 'response'
    }).pipe(
      delay(500),
      map(resp => {
        return resp.body as CarAtService[];
      })
    );
  }

  public getCarAtService = (carId: number) => {
    return this.http.get<any>(`${this.apiUrl}/CarAtServices/car/${carId}`, {
      observe: 'response'
    }).pipe(
      delay(1000),
      map(resp => {
        return resp.body as CarAtService;
      })
    );
  }

  public createCarAtService = (carAtService: CarAtService) => {
    return this.http.post(`${this.apiUrl}/CarAtServices`, carAtService).pipe(
      delay(500),
      map((car) => {
        return car as CarAtService;
      })
    );
  }

  public getCarHistory = (carId: number) => {
    return this.http.get<any>(`${this.apiUrl}/CarServiceHistories/car/${carId}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map(resp => {
        return resp.body as CarHistory[];
      })
    );
  }

  public cancelHistoryStatus = (cancelation: CancelHistoryStatusReq) => {
    return this.http.put(`${this.apiUrl}/CarServiceHistories/cancel/${cancelation.carHistoryId}`, { reasonToCancel: cancelation.reasonToCancel }).pipe(
      delay(500)
    );
  }

  public createHistoryStatus = (carHistory: CarHistory) => {
    return this.http.post(`${this.apiUrl}/CarServiceHistories/car/${carHistory.car?.id}`, carHistory).pipe(
      delay(500)
    );
  }

  public getContacts = () => {
    return this.http.get<any>(`${this.apiUrl}/ContactPersons`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as ContactPerson[]
      })
    );
  }

  public getContact = (id: number) => {
    return this.http.get<any>(`${this.apiUrl}/ContactPersons/${id}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as ContactPerson
      })
    );
  }

  public updateContact = (contact: ContactPerson) => {
    return this.http.put(`${this.apiUrl}/ContactPersons/${contact.id}`, contact).pipe(
      delay(500),
      map((contactPerson) => {
        return contactPerson as ContactPerson;
      })
    );
  }

  public createContact = (contact: ContactPerson) => {
    return this.http.post(`${this.apiUrl}/ContactPersons`, contact).pipe(
      delay(500),
      map((car) => {
        return car as ContactPerson;
      })
    );
  }

  public deleteContact = (contactId: number) => {
    return this.http.delete(`${this.apiUrl}/ContactPersons/${contactId}`).pipe(
      delay(500)
    );
  }


  public getCars = () => {
    return this.http.get<any>(`${this.apiUrl}/Cars`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as Car[]
      })
    );
  }

  public getCar = (id: number) => {
    return this.http.get<any>(`${this.apiUrl}/Cars/${id}`, {
      observe: 'response'
    }).pipe(
      delay(500),
      map((resp) => {
        return resp.body as Car
      })
    );
  }

  public updateCar = (car: Car) => {
    return this.http.put(`${this.apiUrl}/Cars/${car.id}`, car).pipe(
      delay(500),
      map((car) => {
        return car as Car;
      })
    );
  }

  public createCar = (car: Car) => {
    return this.http.post(`${this.apiUrl}/Cars`, car).pipe(
      delay(500),
      map((car) => {
        return car as Car;
      })
    );
  }

  public deleteCar = (carId: number) => {
    return this.http.delete(`${this.apiUrl}/Cars/${carId}`).pipe(
      delay(500)
    );
  }

  public seedData = () => {
    return this.http.post(`${this.apiUrl}/Seed`, {}).pipe(
      delay(500),
      take(1)
    );
  }
}
