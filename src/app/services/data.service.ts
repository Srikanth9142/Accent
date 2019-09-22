import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}
  saveAudio(data: any): any {
    return this.http.post(`YOUR PATH`, data,
       {
          headers: {
             "Content-Type": 'application/octet-stream'
          }
       });
 }
}
