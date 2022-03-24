import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { NewInviteComponent } from './views/new-invite/new-invite.component';
import { LoadingComponent } from './components/loading/loading.component';
import { InvitesListComponent } from './views/invites-list/invites-list.component';
import { ConfirmInviteComponent } from './views/confirm-invite/confirm-invite.component';

@NgModule({
  declarations: [
    AppComponent,
    NewInviteComponent,
    LoadingComponent,
    InvitesListComponent,
    ConfirmInviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    SweetAlert2Module.forRoot(),
    TablerIconsModule.pick(TablerIcons)
  ],
  exports: [
    TablerIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
