import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() cratedProduct : EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.lineSpinClockwiseFadeRotating);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.lineSpinClockwiseFadeRotating);
      this.alertify.message("Product has been added successfully.", {
        dissmissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.cratedProduct.emit(create_product);
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