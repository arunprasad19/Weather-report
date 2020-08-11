import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {WEATHER} from '../model/weather.model';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Weather: WEATHER[];
  title = 'weather';
  apikey = '188d30aa33723e204ee0ac6cb61959a1';
  celsius: number;
  temperature: any;


  constructor(
      private router: Router,
      public http: HttpClient,
      private route: ActivatedRoute

      ) {

       }

  ngOnInit() {
    this.http.get<any>('https://restcountries.eu/rest/v2/all')
    .subscribe(res=>{
    console.log(res);
    this.Weather=res as any;
  })

  }

  getweather(lat:number,lon:number)
  {
    this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`)
    .subscribe(res=>{
    this.temperature= (res as any).main.temp;
    this.celsius = Math.round(this.temperature-273.15);
    console.log(this.celsius)
    })

  }
}
