import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { InvitesListComponent } from './views/invites-list/invites-list.component';
import { NewInviteComponent } from './views/new-invite/new-invite.component';
import { ConfirmInviteComponent } from './views/confirm-invite/confirm-invite.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  { path: 'novo-convite', component: NewInviteComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'convites', component: InvitesListComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'cadastrar', component: RegisterComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'confirmar', component: ConfirmInviteComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
