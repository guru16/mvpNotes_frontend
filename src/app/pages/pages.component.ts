import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages',
  // template: `
  // <app-header *ngIf="!(router === '/login'|| router === '/reset-password'|| router === '/create-agent-profile'|| router ==='/register')"></app-header>
  // <router-outlet></router-outlet>
  // <app-footer *ngIf="!(router === '/login'|| router === '/reset-password'|| router === '/create-agent-profile'|| router ==='/register')"></app-footer>
  // `,
  template: `
  <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  router: string;

  constructor(private _router: Router) {
    this.router = this._router.url;
  }

  ngOnInit(): void {
  }

}
