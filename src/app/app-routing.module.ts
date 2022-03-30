import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { NewInviteComponent } from './views/logged-area/new-invite/new-invite.component';
import { InvitesListComponent } from './views/logged-area/invites-list/invites-list.component';
import { RegisterComponent } from './views/logged-area/register/register.component';
import { ConfirmInviteComponent } from './views/confirm-invite/confirm-invite.component';
import { LoginComponent } from './views/login/login.component';
import { LoggedPagesLayoutComponent } from './views/logged-area/logged-pages-layout.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './views/home/home.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: 'admin',
    component: LoggedPagesLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'novo-convite', component: NewInviteComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
      { path: 'convites', component: InvitesListComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
      { path: 'cadastrar', component: RegisterComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
    ]
  },
  { path: 'confirmar', component: ConfirmInviteComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },

  { path: '**', pathMatch: 'full', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
