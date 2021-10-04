import { Component, OnInit } from '@angular/core';
import { CartSubjectService } from "../api/cart-subject.service";
import { CartService } from "../api/cart.service";
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.page.html',
  styleUrls: ['./cart-listing.page.scss'],
})
export class CartListingPage implements OnInit {

  cartData: any = [];
  cartCnt = 0;
  constructor(
    private cartSubjectService: CartSubjectService,
    private cartService: CartService,
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    public alertController: AlertController
  ) {
    this.cartCnt = this.cartSubjectService.getCartCnt();
  }

  ngOnInit() {
    this.cartSubjectService.cart$.subscribe( (cnt:number) => {
      
      this.cartCnt = cnt;
    } );


    this.getCartByUserId();
  }

  goToProductListing() {
    this.router.navigate(['/product-listing']);
  }

  getCartByUserId() {

    this.cartService.getCartByUserId().subscribe(
      async (result) => {

        // this.loaderService.hideLoader();

        console.log('result', result);
        this.cartData = result?.data?.cart;
        this.cartCnt = this.cartSubjectService.getCartCnt();

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

  async presentAlertConfirm( cartId ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'Item would be removed from the cart',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteCart( cartId );

          }
        }
      ]
    });

    await alert.present();
  }


  deleteCart( cartId ) {

    this.cartService.delCartByCartId( cartId ).subscribe(
      async (result) => {

        if( result.success ) {
          this.cartSubjectService.removeCartItem();
          this.getCartByUserId();
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

      },
      async (ex) => {
        console.log(ex);
      },
    );
  }

}
