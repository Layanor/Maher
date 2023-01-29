import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';

@Component({
  selector: 'app-idtype',
  templateUrl: './idtype.component.html',
  styleUrls: ['./idtype.component.css'],
})
export class IdtypeComponent implements OnInit {
  constructor(
    private authorize: AuthorizeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.authorize.getAccessToken().subscribe((aut) => {
      this.authtoken = aut;
      //  console.log(this.authtoken);
    });
  }
  public authtoken: string;
  public url = 'api/IdTypes';
  public titel = ' قائمة بكافة  انواع الهوية';
  public modelename = '  نوع الهوية';
  public Datasourse: any;
  ngOnInit(): void {
    //  console.log(this.authtoken);
    this.titleService.setTitle(this.titel);
    this.activatedRoute.data.subscribe((d: any) => {
      this.Datasourse = d.data[0].result;
    });
  }
}
