import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/services/invite.service';

@Component({
  selector: 'app-new-invite',
  templateUrl: './new-invite.component.html',
  styleUrls: ['./new-invite.component.scss']
})
export class NewInviteComponent implements OnInit {
  iS: InviteService;

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.onSave();
  }

  invite = {
    name: "Teste",
    amount: 10
  }

  onSave(): void {
    this.iS.create(this.invite).then(() => {
      console.log("Sucesso");
    }).catch((error) => {
      console.log(error)
    })
  }
}
