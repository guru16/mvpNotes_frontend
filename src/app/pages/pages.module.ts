import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing.module';
import { PagesComponent } from './pages.component';
import { NotesComponent,MyAccountComponent,DashboardComponent,QuickAcessComponent,NotesWritingComponent,TrashComponent, } from './';
import { FooterComponent, HeaderComponent} from '../shared';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AngularEditorModule } from '@kolkov/angular-editor';

// import { TrashComponent } from './trash/trash.component';


// import { MatMomentDateModule } from "@angular/material-moment-adapter";
@NgModule({
  declarations: [PagesComponent,
    NotesComponent,
     MyAccountComponent,
     FooterComponent,
    HeaderComponent,
    DashboardComponent,
    QuickAcessComponent,
    NotesWritingComponent,
    TrashComponent],

  imports: [
    PagesRoutingModule,
    FormsModule,
    CommonModule,
    BsDatepickerModule,
   
    AngularEditorModule,
    

    
    ReactiveFormsModule,
  ],
  providers: [],
})
export class PagesModule { }