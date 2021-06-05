import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




  constructor(private breakpointObserver: BreakpointObserver,public auth:AuthService) {

    ////console.log("hello");
    ////console.log(localStorage.getItem('user'));
    // if(localStorage.getItem('user')==null){
    //   //let name='';
    // }
    // else{
    //   var cal:string =localStorage.getItem('user');
    //   console.log(cal);
    //   var name=localStorage.getItem('user').slice(1,cal.length-1);
    //   console.log(name);
    // }


  }



  ngOnInit(): void {
  }

  signOut(){
    this.auth.logOut();
  }

}
