import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm;
  constructor(private http:HttpClient,private router:Router) {


    this.regForm = new FormGroup({
      "name": new FormControl(),
      "username": new FormControl(),
      "pass": new FormControl(),
      "retype":new FormControl(),
    })
  }

  ngOnInit() {
  }

  regSubmit(){
    let promise=new Promise((res,rej)=>{
      if(this.regForm.value.pass===this.regForm.value.retype){
        delete this.regForm.value.retype;
        res(this.regForm.value);
      }else{
        rej();
      }
    })

    promise
    .then((data)=>{
      this.http.post("http://localhost:8000/users",this.regForm.value)
      .subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl('/login');

      })
    })
    .catch((err)=>{
      console.log("password doesn't match");
    })
  }
}
