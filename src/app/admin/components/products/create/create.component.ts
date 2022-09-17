import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner : NgxSpinnerService, private productService : ProductService, private alertify :AlertifyService) {
    super(spiner)
   }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.lineSpinClockwiseFadeRotating);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    if (!name.value) {
      this.alertify.message("Please enter product name!", {
        dissmissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    if (parseInt(stock.value) < 0) {
      this.alertify.message("stock quantity cannot be a negative number!", {
        dissmissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    if (parseInt(price.value) < 0) {
      this.alertify.message("price information has to be a positive number!", {
        dissmissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }



    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.lineSpinClockwiseFadeRotating);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dissmissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dissmissOther: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}