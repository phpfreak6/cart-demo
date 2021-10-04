import { Component, OnInit } from '@angular/core';
import { CartSubjectService } from "../api/cart-subject.service";
import { ProductService } from "../api/product.service";
import { ToastController } from '@ionic/angular';
import { LoaderService } from "../api/loader.service";
import { CartService } from "../api/cart.service";

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.page.html',
  styleUrls: ['./product-listing.page.scss'],
})
export class ProductListingPage implements OnInit {

  cartCnt = 0;
  productsData = [];

  constructor(
    private cartSubjectService: CartSubjectService,
    private productService: ProductService,
    public toastController: ToastController,
    public loaderService: LoaderService,
    public cartService: CartService
  ) {
    this.cartCnt = this.cartSubjectService.getCartCnt();
  }

  ngOnInit() {
    this.cartSubjectService.cart$.subscribe( (cnt:number) => {
      
      this.cartCnt = cnt;
    } );
    this.getProducts();
  }

  getProducts() {

    // this.loaderService.showLoader();
    this.productService.getProducts().subscribe(
      async (result) => {

        // this.loaderService.hideLoader();

        console.log('result', result);
        this.productsData = result?.data?.product;

      },
      async (ex) => {
        console.log(ex);

        // this.loaderService.hideLoader();

        let toast = await this.toastController.create({
          message: 'Exception Occured.',
          duration: 2000
        });
        toast.present();
      }
    );
  }

  addToCart( productId ) {
    console.log('productId', productId);
    
    this.cartService.addToCart(productId).subscribe(
      async (result) => {

        // this.loaderService.hideLoader();

        console.log('result', result);
        if( result.success ) {
          this.cartSubjectService.addItemToCart();
          let toast = await this.toastController.create({
            message: result.msg,
            duration: 2000
          });
          toast.present();  

        } else {
          let toast = await this.toastController.create({
            message: result.msg,
            duration: 2000
          });
          toast.present();  
        }
        // this.productsData = result?.data?.product;

      },
      async (ex) => {
        console.log(ex);

        // this.loaderService.hideLoader();

        let toast = await this.toastController.create({
          message: 'Exception Occured.',
          duration: 2000
        });
        toast.present();
      }
    );
  }

}
