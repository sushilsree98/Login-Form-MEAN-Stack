import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  privateToken;
  data;
  constructor(private http:HttpClient) {
      this.privateToken=localStorage.getItem("Authorization")
}
  ngOnInit() {
    this.http.get("http://localhost:8000/userData",{headers:{"Authorization":this.privateToken}})
    .subscribe((res)=>{
      this.data=res;
    })
  }

}
