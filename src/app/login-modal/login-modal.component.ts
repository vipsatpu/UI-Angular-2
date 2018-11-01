import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber } from 'rxjs';
import { SessionManagerService } from './../services/session-manager.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})


export class LoginModalComponent implements OnInit {

 
  errorValue:string;
  message:string;
  uid:string;
  userType:string;
  status:number;
  buttonName:string;

 constructor(private modalService: NgbModal,private authService:AuthService,private route:Router,private loginService:LoginService, private sessionMngr: SessionManagerService) {
   this.buttonName="Sign In";
 }

  ngOnInit() {
  }
  

  //={"message":string,"status":number,"uid":string,"userType":string};
  error:String;
login(username,psd)
{
  
  let login={"ssoId":username,"password":psd}; 
    this.loginService.login(login).subscribe(response=>{
      console.log(response);
      this.message=response.message;
      this.status=response.status;
      this.uid=response.uid;
      this.userType= response.userType;
      //this.authService.setToken();

       if(this.status==400)
       {
         this.errorValue="*Please enter the correct username and password";  
       }

       if(this.status==200)
       {
        this.errorValue="";
         //alert(this.uid);
         this.authService.setToken(this.uid); 
         this.buttonName="Sign out";
         document.getElementById('id01').style.display='none';
         this.loginService.getUserDetails(this.uid).subscribe(response=>{
            this.sessionMngr.setCookie('user_details', JSON.stringify(response));
         });
         //alert(this.route.url);
         //this.route.navigate([this.route.url.replace("/","")]);
         window.location.reload();
       }
       //this.route.n();
    });
        
     
     

}
openModal()
{
   document.getElementById('id01').style.display='block';
  /*
  if(this.buttonName=="Sign In")
  {
          document.getElementById('id01').style.display='block';
  }
  else
  {
    
         document.getElementById('id01').style.display='none';
  }
  */
}


logout(){
  this.authService.logout();
  window.location.reload();
}

   openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  
  checkLoggedIn(){
    return this.authService.isLoggedIn() && this.sessionMngr.checkCookie("user_details");
  }

}
