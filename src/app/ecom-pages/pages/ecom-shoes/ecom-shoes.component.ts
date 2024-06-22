import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DTOProduct } from '../../shared/dto/DTOProduct';
import { ProductService } from '../../shared/service/product.service';
import { DTOProductType } from '../../shared/dto/DTOProductType';
import { NotiService } from '../../shared/service/noti.service';
import { DTOBrand } from '../../shared/dto/DTOBrand';
import { CompositeFilterDescriptor, State } from '@progress/kendo-data-query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecom-shoes',
  templateUrl: './ecom-shoes.component.html',
  styleUrls: ['./ecom-shoes.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EcomShoesComponent implements OnInit {
  ListProduct: DTOProduct[] =[]
  listProductType: DTOProductType[] = []
  typeSelected: number = -1
  listBrand: DTOBrand[] = []

  listCategorySelected: DTOProductType[] = []
  listGenderSelected: any[] = []
  listBrandSelected: DTOBrand[] = []

  minRange: number = 0
  maxRange: number = 30
  valueRange: [number, number] = [0, 30];
  minPrice: number = this.valueRange[0]
  maxPrice:number = 15000000

  listGender:any[] = [
    {id:0, text:"For all", checked: false},
    {id: 1, text: "Man", checked: false},
    {id: 2, text: "Woman", checked: false}
  ]

  productFilter: State = {
      skip: 0,
      take: 0,
      sort: [
      {
        field: "Code",
        dir: "asc"
      }
    ],
    filter: {
      logic: "and",
      filters: [
          
      ]
    }
  }   


  constructor(private productService: ProductService, private notiService: NotiService, private router: Router){
    this.handleGetRoute()
  }

  ngOnInit(): void {
    this.APIGetListProduct()
    this.APIGetListProductType()
    this.APIGetListBrand()
    
  }

  handleGetRoute():void{
    const data = localStorage.getItem('headerRoute')
    switch(data){
      case "Men":
        this.handleSelectedGender(this.listGender[1])
        break
      case "Women":
        this.handleSelectedGender(this.listGender[2])
        break
    }
    this.handleFilterItem()
  }

  APIGetListProduct():void{
    this.productService.getListProduct(this.productFilter).subscribe(data => {
      if(data.ErrorString != "" || data.StatusCode != 0){
        this.notiService.Show("Err when fetching data product 😭", "error")
        return
      }
      this.ListProduct = data.ObjectReturn.Data
    })
  }

  APIGetListProductType():void{
    this.productService.getListProductType().subscribe(data => {
      if(data.ErrorString != "" || data.StatusCode != 0){
        this.notiService.Show("Err when fetching data 😭", "error")
        return
      }
      this.listProductType = data.ObjectReturn.Data
    })
  }

  APIGetListBrand():void{
    this.productService.getListBrand().subscribe((data: []) => {
      this.listBrand = data
    })
  }

  handleSeletedType(idType: number):void{
    this.typeSelected = idType
  }

  handleValuePriceChange(){
    this.minPrice = this.valueRange[0] * 500000
    this.maxPrice = this.valueRange[1] * 500000
  }

  handleSelectedCatelogy(itemGet: DTOProductType):void{
    const index = this.listCategorySelected.findIndex(item => item.Code == itemGet.Code)
    if(index != -1){
      this.listCategorySelected.splice(index, 1)
    }else{
      this.listCategorySelected.push(itemGet)
    }
  }

  handleSelectedBrand(itemGet: DTOBrand):void{
    const index = this.listBrandSelected.findIndex(item => item.Code == itemGet.Code)
    if(index != -1){
      this.listBrandSelected.splice(index, 1)
    }else{
      this.listBrandSelected.push(itemGet)
    }
  }

  handleSelectedGender(itemGet: any):void{
    const index = this.listGenderSelected.findIndex(item => item.id == itemGet.id)
    if(index != -1){
      console.log(1);
      this.listGenderSelected.splice(index, 1)
    }else{
      this.listGenderSelected.push(itemGet)
    }
  }


  handleFilterItem():void{
    this.productFilter.filter.filters = []
    const filter:CompositeFilterDescriptor = {logic: 'and', filters: []}
    const filterCategory: CompositeFilterDescriptor = {logic: 'or', filters: []}
    filterCategory.filters = []
    this.listCategorySelected.forEach((item) => {
      if(item){
        filterCategory.filters.push({field: "CodeProductType", operator: 'eq', value: item.Code})
      }
    });

    const filterGender: CompositeFilterDescriptor = {logic: 'or', filters: []}
    filterGender.filters = []
    this.listGenderSelected.forEach((item) => {
      if(item){
        filterGender.filters.push({field: "Gender", operator: 'eq', value: item.id})
      }
    });

    const filterBrand: CompositeFilterDescriptor = {logic: 'or', filters: []}
    filterBrand.filters = []
    this.listBrandSelected.forEach((item) => {
      if(item){
        filterBrand.filters.push({field: "CodeBrand", operator: 'eq', value: item.Code})
      }
    });

    const filterPrice: CompositeFilterDescriptor = {logic: 'and', filters: []}
    filterPrice.filters.push({field: "PriceAfterDiscount", operator: 'gte', value: this.minPrice})
    filterPrice.filters.push({field: "PriceAfterDiscount", operator: 'lte', value: this.maxPrice})

        
    if(filterGender.filters.length > 0){
      filter.filters.push(filterGender)
    }
    if(filterCategory.filters.length > 0){
      filter.filters.push(filterCategory)
    }
    if(filterPrice.filters.length > 0){
      filter.filters.push(filterPrice)
    }
    if(filterBrand.filters.length > 0){
      filter.filters.push(filterBrand)
    }

    this.productFilter.filter.filters.push(filter)
    console.log(this.productFilter);
    this.APIGetListProduct()
  }

  handleApplyFilter():void{
    this.handleFilterItem()
  }


}
