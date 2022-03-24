import { Component, OnInit } from '@angular/core';

import { InviteService } from 'src/app/services/invite.service';

@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html',
  styleUrls: ['./confirm-invite.component.scss']
})
export class ConfirmInviteComponent implements OnInit {
  iS: InviteService;

  loading = false;
  inviteCode = '';
  inviteCodeErrorMessage = '';

  invite: any;

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.getInviteData();
  }

  async getInviteData() {
    // this.invite = this.iS.confirmInvite('66zae');
  }
}
