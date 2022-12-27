import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: any;
  constructor(private route: Router, private crudapi: CrudService, private fb: FormBuilder,
    private ngZone: NgZone) {
    this.bookForm = this.fb.group({
      name: [''],
      price: [''],
      description: ['']
    })
    
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    this.crudapi.addBook(this.bookForm.value).subscribe((res:any) => {
      console.log('Data susscfully added' + res )
     
        this.route.navigate(['./book-list'])
      })
    } 
  
  
}
