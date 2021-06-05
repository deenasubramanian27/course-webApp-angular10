import { Component, OnInit } from '@angular/core';
import { AuthService } from '../SERVICES/auth.service';

@Component({
  selector: 'app-user-home-list',
  templateUrl: './user-home-list.component.html',
  styleUrls: ['./user-home-list.component.css'],
})
export class UserHomeListComponent implements OnInit {


  ItemsArray= [];

  constructor(private crudService: AuthService) { }

  ngOnInit() {

    this.crudService.getUserList().subscribe((res:any[])=>{
      this.ItemsArray= res;
    })
    // this.crudService.getData().subscribe((res: any[])=>{
    //   this.ItemsArray= res;
    // })
  }

}
