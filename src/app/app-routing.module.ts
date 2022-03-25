import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitesListComponent } from './views/invites-list/invites-list.component';
import { NewInviteComponent } from './views/new-invite/new-invite.component';
import { ConfirmInviteComponent } from './views/confirm-invite/confirm-invite.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: 'novo-convite', component: NewInviteComponent },
  { path: 'convites', component: InvitesListComponent },
  { path: 'confirmar', component: ConfirmInviteComponent },
  { path: 'cadastrar', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
