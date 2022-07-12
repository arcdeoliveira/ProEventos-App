import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public events: any

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetEvents();
  }

  public GetEvents() : void {
    this.http.get("https://localhost:44346/api/event").subscribe(
      response => this.events = response,
      error    => console.error(error)
    );
  }
}
