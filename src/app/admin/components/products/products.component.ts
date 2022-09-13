import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpclientService : HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.squareJellyBox);

    this.httpclientService.get<Product>({
      controller: "product"
    }).subscribe(data => console.log(data));

    // this.httpclientService.post({
    //   controller : "product"
    // }, {
    //   name: "Iphone 14 pro max",
    //   stock: 28,
    //   price: 1905
    // }).subscribe();


    // this.httpclientService.put({
    //   controller: "product"
    // }, {
    //   id: "f3de592e-7142-44b6-8aa5-adaefa203925",
    //   name: "Hammer",
    //   stock: 56,
    //   price: 30.99
    // }).subscribe();

    // this.httpclientService.delete({
    //   controller : "product"
    // },'70722b35-9997-4d84-bb38-127a3ae281cc').subscribe();
  }

}
