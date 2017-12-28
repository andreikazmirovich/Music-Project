import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public songs = [
    "I Love Dogs",
    "Mashka Gerba's Anime",
    "Hui Pezda Nechista Sila",
    "Ce Nas Teacher Navchila",
    "Raz Na Rik Sister Fuckin' Ne Grih"
  ];

  constructor() { }

  ngOnInit() {
  }

}
