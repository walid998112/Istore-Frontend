import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from 'src/app/Utils/Services/User.service';
import * as aos from "aos";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    aos.init();
    window.addEventListener('load', aos.refresh)
  }

  constructor(private userService: UserService) { }

  isLoggedIn: boolean = false;

}





