import { DTOProduct } from "./DTOProduct";
import { DTOSize } from "./DTOSize";

export class DTOProductInCart{
    Code: number = 0;
    Product: DTOProduct;
    Quantity: number = 0;
    TotalPriceOfProduct: number;
    SizeSelected: number = 0
}