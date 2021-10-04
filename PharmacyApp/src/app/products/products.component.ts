import { Component, EventEmitter, Input, OnInit, Output, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service'
import { Product } from '../product-detail/product';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
 
})
export class ProductsComponent implements OnInit {
  allProducts:boolean;
  allProduct: Product[];
  displaysearch: boolean = false;
  searchedProduct: Product;
  errorMessage: string;
  showError: boolean = false;
  
 
 
  //Inject the Router and ProductsService object to the constructor
  constructor(private productService: ProductsService, private router: Router) {

  }

  // implement getSpecificProducts() that will filter the details of the specific product registed for from the product list
  getSpecificProducts(val) {    

    //implement call to getAllProducts() in productsService
    this.productService.getAllProducts().subscribe(data=>{this.allProduct=data;
   
   for(let product of this.allProduct){
     if(product.name.toLowerCase()===val.toLowerCase()){
       this.searchedProduct=product;
       this.showError=false;
       this.displaysearch=true;
       this.allProducts=false;
       this.errorMessage="";
       break;
    
    }
    
    else{
      this.showError=true;
      this.displaysearch=false;
      this.allProducts=false;
      this.errorMessage="sorry this product is not manufactured by XYZPharma";

    }
    }},);
  }
  
 

    
  
  ngOnInit() {
    //code to display all product on load of product page
    this.productService.getAllProducts().subscribe(data=>{this.allProduct=data;
   this.showError=false;
   this.displaysearch=false;
   this.allProducts=true},error=>{this.showError=true;});
   
    
  }

 viewDetails(val) {
    // do programatically navigation to product-detail component, passing the product selected received as parameter of viewDetails()
     console.log(val);
     this.router.navigate(['/productDetail',val]);
     for(let p of this.allProduct){
       if(p.name===val){
        this.router.navigate(['/productDetail',val]);
       }
       else{
         this.showError=true;
         this.errorMessage="sorry this product is not manufactured by XYZPharma";
       }

     
    
  }
  
}




}