import { Component } from '@angular/core';
import { SessionManagerService } from './services/session-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AssestMangament';

  constructor(private sessionManager: SessionManagerService, private router:Router){
  	let isStateSelected = sessionManager.checkCookie("user_selected_state");
  	console.log(router.url);
  	if(isStateSelected==false){
  		router.navigate([""]);
  	}
  }
}
