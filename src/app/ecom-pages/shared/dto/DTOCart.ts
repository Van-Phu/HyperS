import { DTOProduct } from "./DTOProduct";
import { DTOProductInCart } from "./DTOProductInCart";
import { DTOSize } from "./DTOSize";

export class DTOCart{
    CodeCustomer: number = 0;
    ListProductInCart: DTOProductInCart[] = [];
}