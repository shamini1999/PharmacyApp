import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quarterinfo } from './Quarterinfo';
import { InvestorsService } from './investors.service';
import {CheckcasingPipe} from './checkcasing.pipe';
@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {
  quaterForm: FormGroup;
  quaterDetails;
  showTable: boolean = false;
  selectedQDetails: string;
  errorMessage: string;
  showError: boolean = false;
  pipe: CheckcasingPipe;
  tableHeader=['Quater','Sales','Other Income','Gross Profit','Depreciation','Interest','Tax','Net Profit'];

  
 //Inject the FormBuilder and investorsService, InvestorsService and CheckcasingPipe objects to the constructor
 constructor(private formBuilder: FormBuilder,private investorsService : InvestorsService) { }

 ngOnInit() {
   //Initialize the variable quaterForm with a FormBuilder group method containing the below mentioned form control.
   //quater: required validation
   //fyear: required validation
    this.quaterForm = this.formBuilder.group({
      quater: ['', Validators.required],
      fyear: ['', Validators.required],
      
    });
  }
 //ngOninit

 //Implement getQDetails method that takes in value from input field and display the details of the quater asked for
 getQDetails() {

   //initialize selectedQDetails to the call of the customPipe transform method to convert quater in uppercase and then combine the quater and year entered

             //code here
             this.pipe=new CheckcasingPipe();
             this.selectedQDetails=this.pipe.transform(this.quaterForm.get('quater').value,this.quaterForm.get('fyear').value);
             
             this.investorsService.getQDetails().subscribe(
               data=>{
                 for(let c of data){
                   if(c.quater===this.selectedQDetails){
                     this.quaterDetails=c;
                     this.showError=false;
                     break;
                   }else{
                     this.showError=true;
                     this.errorMessage="only the above mentioned quarter details are available";
                   }
                 }
               }
             );

   //implement the call to getQDetails() of investorsService that will filter the detail of the selected quater and financial year, if specified quater is not available show corresponding errorMessage

             //code here
 }
}
