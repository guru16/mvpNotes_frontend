import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NotesComponent,MyAccountComponent,DashboardComponent,QuickAcessComponent,NotesWritingComponent,TrashComponent } from './';

const routes: Routes = [
    {   path: '', component: PagesComponent,
        children :[
            { path: 'notes/:subjectId', component: NotesComponent},
            { path: 'myAccount', component: MyAccountComponent},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'quickAccess', component: QuickAcessComponent},
            { path: 'notesWriting/:id', component: NotesWritingComponent},
            { path: 'trash', component: TrashComponent},



            
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
