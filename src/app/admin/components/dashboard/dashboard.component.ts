import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify : AlertifyService) { }

  ngOnInit(): void {
    
  }

  m(){
    this.alertify.message("E-Ticaret admin", {
      messageType : MessageType.Success,
      position : Position.BottomLeft,
      dissmissOther:true,
      delay:5   
    });
  }
  d(){this.alertify.dismiss();}
}
