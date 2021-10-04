import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public data: any;

	constructor(
		private httpClient: HttpClient
	) {
	}

	addToCart( productId ): Observable<any> {

		return this.httpClient.post( 
			`http://localhost:3000/users/615ac3141f12ef56d955d619/product/${productId}/cart`, 
			null
			)
			.pipe(
			  map((e:Response)=> e),
			  catchError((e:Response)=> throwError(e))
		);
	}

	getCartByUserId(): Observable<any> {

		let url = `http://localhost:3000/users/615ac3141f12ef56d955d619/cart`;
		return this.httpClient
			.get(url)
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	delCartByCartId( cartId ): Observable<any> {

		let url = `http://localhost:3000/users/615ac3141f12ef56d955d619/cart/${cartId}`;
		return this.httpClient
			.delete(url)
			.pipe(
				map((e: Response) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	updateCartQty(userId, cartId, qty): Observable<any> {
		let in_data = {
			qty: qty
		};
		return this.httpClient
			.patch(
				`http://localhost:3000/users/${userId}/cart/${cartId}/update-quantity`,
				in_data
			)
			.pipe(
				map((e: Response) => e),
				catchError((e: Response) => throwError(e))
		);
	}
}
