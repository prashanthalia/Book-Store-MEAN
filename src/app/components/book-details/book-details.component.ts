import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  getId: any;
  updateForm: any;
  constructor(private fb: FormBuilder, private route: Router,
    private activateRoute: ActivatedRoute,private crudapi:CrudService) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.crudapi.getBook(this.getId).subscribe((res: any) => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    });
    this.updateForm = this.fb.group({
      name: [''],
      price: [''],
      description:['']
    })
    }
  ngOnInit(): void { }
    onUpdate() {
      this.crudapi.updateBook(this.getId, this.updateForm.value).subscribe((res: any) => {
        console.log("Data Update successfully")
        this.route.navigate(['./book-list'])
     })
   }
  

}
