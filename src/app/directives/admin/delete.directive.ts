import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsComponent } from 'src/app/admin/components/products/products.component';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $  :any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element : ElementRef,
    private _renderer : Renderer2,
    private httpClientService: HttpClientService,
    private spinner : NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService : AlertifyService
  ) { 
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/x-button.png");
    img.setAttribute("style", "cursor : pointer;");
    img.width = 20;
    img.height = 20;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id : string;
  @Input() controller : string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  onclick(){
    this.openDialog(async () => {
      const td : HTMLTableCellElement = this.element.nativeElement;

      this.httpClientService.delete({
        controller: this.controller
      },this.id).subscribe(data => {
        $(td.parentElement).animate({
                opacity: 0,
                left: "+=50",
                height: "toogle"
              }, 700, () => {
                this.callback.emit();
                this.alertifyService.message("Product has been deleted successfully",{
                  dissmissOther: true,
                  messageType : MessageType.Success,
                  position : Position.TopRight
                })
              });
      }, (errorResponse : HttpErrorResponse) => {
        this.alertifyService.message("An error occured during the delete operation!",{
          dissmissOther: true,
          messageType : MessageType.Error,
          position : Position.TopRight
        })
      });

      
    });
  }


  openDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes)
        afterClosed();
    });
  }
}

