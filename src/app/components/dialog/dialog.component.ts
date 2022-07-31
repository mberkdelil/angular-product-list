import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  actionBtn: string = "Save";

  productForm = new FormGroup({
    productName: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    freshness: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    comment: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  })

  constructor(public api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("Product Added Successfully.")
          },
          error(err) {
            alert(err);
          },
        })
      }
    } else {
      this.updateProduct();
    }
    window.location.reload();
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe((res:any)=>{
      this.api.getProduct();
    })
  }

}
