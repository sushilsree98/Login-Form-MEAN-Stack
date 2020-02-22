import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm;
  constructor(private http: HttpClient,private router:Router) {
    this.loginForm=new FormGroup({
      username:new FormControl(),
      pass:new FormControl()
    })
   }

  ngOnInit() {
  }

loginSubmit(){
  this.http.post("http://localhost:8000/loginUsers",this.loginForm.value)
  .subscribe((res)=>{
    this.http.get("http://localhost:8000/loginUsers")
     .subscribe((data)=>{
       localStorage.setItem("Authorization",data["Authorization"]);
       this.router.navigateByUrl("/home");

     })
  })
  console.log(this.loginForm.value);
}
}
