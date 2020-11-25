import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName:any;
  lastName:any;
  email:any;

  constructor(private commonService: CommonService,private _router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.commonService.get(`getUser`).subscribe((data: any)=>{
      if(data.status==200){
        console.log(data.result)
        this.firstName=data.result.firstName;
        this.lastName=data.result.lastName;
      }    
    }) 
  }

  signOut(){
    localStorage.clear()
    this._router.navigate(["login"]);

  }

}
