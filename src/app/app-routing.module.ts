import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewInviteComponent } from './views/new-invite/new-invite.component';

const routes: Routes = [
  { path: '', component: NewInviteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
