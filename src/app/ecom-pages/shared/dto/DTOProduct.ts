import { DTOImageProduct } from "./DTOImageProduct";

export class DTOProduct {
    Code: string = "";
    Name: string = "";
    Price: number = 0;
    Description: string = "";
    ListOfSize: string[] = [];
    ListOfImage: DTOImageProduct[] = [];
    Discount: number = 0;
    PriceAfterDiscount: number = 0;
    CodeProductType: string = "";
    ProductType: string = "";
    CodeBrand: string = "";
    Brand: string = "";
    Color: string = "";
    Stock: number = 0;
    Sold: number = 0;
    BrandName: string = ""
}