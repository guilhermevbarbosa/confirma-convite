import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { InviteService } from 'src/app/services/invite.service';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit {
  iS: InviteService;

  invites: any;
  loading: boolean = true;

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.invites = this.iS.invites.valueChanges();

    this.invites
      .pipe(take(1))
      .subscribe(() => {
        this.loading = false;
      })
  }

  delete() {

  }
}
