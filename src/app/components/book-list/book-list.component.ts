import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  Books: any;
  datas: any;
  constructor(private crudApi:CrudService) {
    
  }
  ngOnInit(): void {
    // this.crudApi.getBooks().subscribe((res: any) => {
    //   console.log(res);
    //   this.Books = res;
  //  })
   this.listBooks()
  }
  listBooks() {
    this.crudApi.getBooks().subscribe((res: any) => {
      console.log(res);
      this.Books = res;
    })
  }

  delBook(datas: any) {
    if (window.confirm('Are you sure want delete')) {
      this.crudApi.deleteBooks(datas._id).subscribe((data: any) => {
        console.log(data)
        // this.Books = this.Books.filter((u: any) => u !== datas)
      })   
    }
    this.listBooks()
  }
}
