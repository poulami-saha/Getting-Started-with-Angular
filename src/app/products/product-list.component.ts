import { Component, OnInit } from '@angular/core'
import { IProduct } from './product';
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    _listFilter:string;
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
         this._listFilter = value;
         this.filteredProduct= this.listFilter?this.performFilter(this.listFilter):this.products;
    }

    filteredProduct:IProduct[];
pageTitle:string='Product List';
products:IProduct[] =[];
errorMessage:string;

constructor(private _productService:ProductService){
}

toggleImage():void{
    this.showImage=!this.showImage;
}
ngOnInit():void{   
    this._productService.getProducts()
        .subscribe(
            products =>{ this.products=products;
                this.filteredProduct= this.products;
            },
            error=> this.errorMessage = <any>error);
        
    

}
performFilter(filterBy:string): IProduct[]{
    filterBy= filterBy.toLowerCase();
    return this.products.filter((product:IProduct) =>
    product.productName.toLowerCase().indexOf(filterBy)!==-1)
}

onRatingClicked(message:string):void{
    this.pageTitle = 'ProductList: '+ message;
}
}