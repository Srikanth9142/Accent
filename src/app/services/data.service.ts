import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  saveAudio(data: any): any {
    return this.http.post(`YOUR PATH`, data,
       {
          headers: {
             "Content-Type": 'application/octet-stream'
          }
       });
 }
  constructor() { }
}
