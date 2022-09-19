import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent{
  constructor(public spinner: NgxSpinnerService){ }

  showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);
    setTimeout(() =>this.spinner.hide(spinnerNameType), 500);
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType{
  squareJellyBox = "s1",
  ballFussion = "s2",
  lineSpinClockwiseFadeRotating = "s3",
  fire = "s4"
}
