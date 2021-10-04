import { Component, OnInit } from '@angular/core';
import { CartSubjectService } from "../api/cart-subject.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from "../api/product.service";
import { ToastController } from '@ionic/angular';
import { CartService } from "../api/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  cartCnt = 0;
  slug: any;
  isSlugProvidedFlag: boolean;
  isProductsDataSet: boolean = false;
  productsData: any = null;

  constructor(
    private cartSubjectService: CartSubjectService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public toastController: ToastController,
    public cartService: CartService
  ) {
    this.cartCnt = this.cartSubjectService.getCartCnt();
  }

  ngOnInit() {
    this.cartSubjectService.cart$.subscribe( (cnt:number) => {
      
      this.cartCnt = cnt;
    } );

    this.route.params.subscribe( async (params) => {

      this.slug = params.slug;
      this.isSlugProvidedFlag = this.slug ? true : false;

      if( this.isSlugProvidedFlag ) {
        this.getProductBySlug();
      } else {
        
        let toast = await this.toastController.create({
          message: 'Slug not provided.',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  getProductBySlug() {

    // this.loaderService.showLoader();
    this.productService.getProductBySlug( this.slug ).subscribe(
      async (result) => {

        // this.loaderService.hideLoader();

        console.log('result', result);
        this.productsData = result?.data?.product;
        this.isProductsDataSet = true;

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
