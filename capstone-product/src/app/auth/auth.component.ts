import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title = 'angular-public-folder';

  constructor(private http: HttpClient) { }

  fromAssetFolder: any;


  ngOnInit(): void {
    this.http.get('/assets/keycloak.json').subscribe(data => {
      this.fromAssetFolder = data;
    });
  }

}
