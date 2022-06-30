import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AuthGuardModule } from "@angular/fire/auth-guard";

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconCircleCheck,
  IconX,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconConfetti
} from 'angular-tabler-icons/icons';

import { LoggedPagesLayoutComponent } from './views/logged-area/logged-pages-layout.component';
import { NewInviteComponent } from './views/logged-area/new-invite/new-invite.component';
import { InvitesListComponent } from './views/logged-area/invites-list/invites-list.component';
import { RegisterComponent } from './views/logged-area/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmInviteComponent } from './views/confirm-invite/confirm-invite.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { CardapioComponent } from './views/cardapio/cardapio.component';

const icons = {
  IconCircleCheck,
  IconX,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconConfetti
}

@NgModule({
  declarations: [
    AppComponent,
    NewInviteComponent,
    LoadingComponent,
    InvitesListComponent,
    ConfirmInviteComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    LoggedPagesLayoutComponent,
    Error404Component,
    HomeComponent,
    CardapioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    TablerIconsModule.pick(icons),
    NgxPaginationModule,
    AuthGuardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  exports: [
    TablerIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
