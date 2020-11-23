import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted:boolean= false;
  registerButton:boolean= true;
  checked = false;
  error:any;
  user:any;
   valueChanges: any;
   valueChanges1: any;

  passwordType:any=false;

  constructor(private authService: SocialAuthService,private commonService: CommonService,private _router: Router,private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    
    
    
    this.registerForm = this.formBuilder.group({
      fullName: ['', [
        Validators.required
    ] 
  ],

      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")

    ] 
  ],
  password:['',
       [
        Validators.required,
        Validators.pattern(/^\S*$/),
        Validators.minLength(6),
        Validators.maxLength(12),

      ]
    ],
      
   });
  }

  ngOnDestroy() {
    //this.valueChanges1.unsubscribe()
  }
  get formControls() { return this.registerForm.controls; }

  checkCheckBoxvalue(e){
    if(!this.checked){
      this.checked=true
     this.registerButton=false
    }else{
      this.checked=false
      this.registerButton=true
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return ;
      }

    let body={
      email:this.registerForm.value.email,
      password:this.registerForm.value.password, 
      name:this.registerForm.value.fullName

     }
     this.commonService.post('register',body).subscribe((data: any)=>{
      if(data.status==200){
        this.toastr.success('Login Successfully', 'success');

       let token=data.token;
       localStorage.setItem('token',token);
       this._router.navigate(["myAccount"]);
      }else{
        //this.error=data.message
        this.toastr.warning(data.message, 'Warning');

       

      }
     
   },
   (error) => { 
    this.toastr.error('Something went wrong', 'Error');
    })
  }
   signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.valueChanges= this.authService.authState.subscribe(async user => {
       this.user = user;
      await this.sigIn()

    });
   
  }
    signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.valueChanges= this.authService.authState.subscribe(async user => {
      this.user = user;
     await this.sigIn()

   });
  }
  signOut(): void {
    this.authService.signOut();
  }
  
  sigIn(): void {
    console.log(this.user,1)

        if(this.user){
          let body={
            email:this.user.email,
            firstName:this.user.firstName,
            lastName:this.user.lastName,
            authToken:this.user.authToken,
            provider:this.user.provider
      
          }
          this.commonService.post('socialLogin',body).subscribe((data: any)=>{
            console.log(data)
          if(data.status==200){
            
            this.authService.signOut();
            this.user="";
    
            let token=data.token;
            localStorage.setItem('token',token);
            console.log("1")
            this.toastr.success('Login Successfully', 'success');
            this.valueChanges.unsubscribe()

            this._router.navigate(["myAccount"]);

          }else{
            //this.error=data.message
            this.toastr.warning(data.message, 'Warning');
    
            
    
          }
          
        },
        (error) => { 
        this.toastr.error('Something went wrong', 'Error');
        })
        }
        
      // console.log(JSON.stringify(resp))
        

    
    }

}
