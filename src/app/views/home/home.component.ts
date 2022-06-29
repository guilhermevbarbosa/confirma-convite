import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  iS: InviteService;
  route: any;

  inviteCode = '';
  loading = false;

  constructor(inviteService: InviteService, route: ActivatedRoute) {
    this.iS = inviteService;
    this.route = route;
  }

  ngOnInit(): void {
    this.inviteCode = this.route.snapshot.queryParamMap.get("inviteCode");
  }

  activateInvite() {
    this.loading = true;

    this.iS.activateInvite(this.inviteCode)
      .then(() => {
        this.loading = false;
      }).catch((error) => {
        this.loading = false;

        let errString = String(error);
        errString = errString.replace("Error:", "");

        Swal.fire(
          'Erro!',
          errString,
          'error'
        );
      })
  }
}
