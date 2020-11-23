import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { FormGroup, FormControl, FormBuilder,FormGroupDirective,  Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  socialLogin:any;
  modalRef: BsModalRef;
  updateForm: FormGroup;
  passwordForm:FormGroup;
  submitted:boolean=false
  submitted1:boolean=false
  firstName:any
  lastName:any
  email:any;
  gender:any;
  edit:boolean=false
  error:any
  profile:any
  profileImage:any
  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective; 

  constructor(private _router: Router,private commonService: CommonService,private formBuilder:FormBuilder,private modalService: BsModalService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    this.updateForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, [
        Validators.required,
      
    ] 
  ],
  lastName: [{value: '', disabled: true}, [
    Validators.required,
  
    ] 
  ],
  email: [{value: '', disabled: true},, [
    Validators.required,
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")

    ] 
  ],
  
      
   });
   this.passwordForm = this.formBuilder.group({
    //   password:['',
    //   [
    //   Validators.required,
    //   Validators.pattern(/^\S*$/),
    //   Validators.minLength(6),
    //   Validators.maxLength(12),

    //   ]
    // ],
    newPassword:['',
      [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.minLength(6),
      Validators.maxLength(12),

      ]
    ],
    confirmPassword:['',
      [
      Validators.required,
      Validators.pattern(/^\S*$/),
      Validators.minLength(6),
      Validators.maxLength(12),

      ]
    ],

   }
   ,{
    validator: this.ConfirmedValidator('newPassword', 'confirmPassword')
   })

  }
  ngAfterViewInit() {
    $('#OpenImgUpload').click(function(){ $('#imgupload').trigger('click'); });
  }
  get formControls() { return this.updateForm.controls; }
  get passwordControls() { return this.passwordForm.controls; }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUser(){
    this.commonService.get(`getUser`).subscribe((data: any)=>{
      if(data.status==200){
        console.log(data.result)
        this.firstName=data.result.firstName;
        this.lastName=data.result.lastName;
        this.email=data.result.email;
        this.profileImage=data.result.profileImage
        this.gender=data.result.gender?data.result.gender:''
        this.socialLogin=data.result.socialLogin
        
        
        
       // this.gender='male'
      }
    
  })
  

}
editProfile(value){
  this.edit=value
  this.updateForm.enable();

}
updateProfile(){
  this.submitted = true;
  if(this.updateForm.invalid){
    return ;
  }
  if(this.gender=="" || this.gender==undefined ){
    this.error="gnder selecction is required"
    return ;
  }
  let body={
    firstName:this.firstName,
    lastName:this.lastName,
    email:this.email,
    gender:this.gender
   }
   this.commonService.post('editProfile',body).subscribe((data: any)=>{
    console.log(data)
    if(data.status==200){
      this.toastr.success('update Successfully', 'success');

      this.getUser();

     // this.gender='male'
    }else{

    }
  
})
  
  
  }
  onProfileChange(event){

    const file = event.target.files[0];
    console.log(file)
     
    const formData = new FormData();
    formData.append('file', file);
    this.commonService.post('uploadImage',formData).subscribe((data: any)=>{
      if(data.status==200){
        this.getUser();
      }else{
        
      }
    },
    (error) => { 
      })
    
  }

  onSubmit(){
    this.submitted1=true
    if(this.passwordForm.invalid){
      return ;
    }
    let body={
      password:this.passwordForm.value.newPassword, 

     }
     this.commonService.post('updatePassword',body).subscribe((data: any)=>{
      this.modalRef.hide()
     
     },
      (error)  =>{

      }   
     )


  }
  ConfirmedValidator(controlName: string, matchingControlName: string){
   

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];

        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {

            return;

        }

        if (control.value !== matchingControl.value) {

            matchingControl.setErrors({ confirmedValidator: true });

        } else {

            matchingControl.setErrors(null);

        }

    }
  }
  signOut(){
    localStorage.clear()
    this._router.navigate(["login"]);

  }

}