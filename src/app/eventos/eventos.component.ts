import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public events        : any = [];
  public eventsFiltered: any = [];

  public imgWith   : number  = 150;
  public imgMargin : number  = 2;
  public showImg   : boolean = true;
  public textButton: string  = "";

  private _filterList: string  = "";

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value:string) {
    this._filterList = value;
    this.eventsFiltered = this.filterList ? this.filterEvents(this.filterList) : this.events;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.textButton = EventosComponent.UpdateTextButton(this.showImg);
    this.GetEvents();
  }

  public GetEvents() : void {
    this.http.get("https://localhost:44346/api/event").subscribe(
      response => {
        this.events         = response;
        this.eventsFiltered = this.events;

      },
      error    => console.error(error)
    );
  }

  filterEvents(filterList: string): any {
    filterList = filterList.toLocaleLowerCase();

    return this.events.filter(
      (event : any) => event.theme.toLocaleLowerCase().indexOf(filterList) !== -1 ||
                       event.local.toLocaleLowerCase().indexOf(filterList) !== -1
    );
  }

  public HideOrShowImages(): void {
    this.showImg    = !this.showImg;
    this.textButton = EventosComponent.UpdateTextButton(this.showImg);
  }

  private static UpdateTextButton(showimage: boolean): string {
    return showimage ? "Ocultar" : "Exibir";
  }
}
