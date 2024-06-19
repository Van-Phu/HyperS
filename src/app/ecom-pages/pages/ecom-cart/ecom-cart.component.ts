import { Component } from '@angular/core';
import { DTOCart } from '../../shared/dto/DTOCart';
import { DataCart } from '../../shared/data/dataCart';

@Component({
  selector: 'app-ecom-cart',
  templateUrl: './ecom-cart.component.html',
  styleUrls: ['./ecom-cart.component.scss']
})
export class EcomCartComponent {
  ListProductCart: DTOCart[] = DataCart
}
