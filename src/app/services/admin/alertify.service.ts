import { Injectable } from '@angular/core';
declare var alertify : any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message(message: string, messageType: MessageType, position: Position, delay: number=3, dismissOther: boolean =false ) {
    message(message: string, options: Partial<AlertifyOptions>){
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg = alertify[options.messageType as string](message);
    if(options.dissmissOther)
      msg.dismissOthers();
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType : MessageType = MessageType.Success;
  position: Position = Position.TopRight;
  delay : number = 3;
  dissmissOther: boolean =false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
