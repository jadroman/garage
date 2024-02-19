import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private http: HttpClient) {

  }


  public getData = () => {
    return this.http.get<any>('http://localhost:5067/api/CarAtServices', {
      observe: 'response'
    });
  }
}
