import { Item } from './../Item';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  constructor(private auth: AuthService) {}
  updatesFromMongo: Item[] = [];
  selectedItem: Item;
  toogleForm: boolean = false;
  taken: boolean = false;
  public itemName: String;
  public itemQuantity: Number;
  ngOnInit(): void {
    this.Updates()
  }
  addItem(frm: NgForm) {
    let newItem = {
      itemName: frm.value.itemName,
      itemQuantity: frm.value.itemQuantity,
      itemBrought: false,
    };
    console.log(newItem);
    this.auth.addlistItems(newItem).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    frm.reset();
    this.Updates();
  }
  UpdateItem(editfrm: NgForm) {
    console.log(this.selectedItem);
    let newItem = {
      _id: this.selectedItem._id,
      itemName: editfrm.value.itemName,
      itemQuantity: editfrm.value.itemQuantity,
      itemBrought: this.selectedItem.itemBrought,
    };
    console.log(newItem);
    this.auth.editItem(newItem).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    editfrm.reset();
    // this.selectedItem = {
    //   _id: '',
    //   itemName: '',
    //   itemQuantity: '',
    //   itemBrought: false,
    // };
    this.toogleForm = false;
    this.Updates();
  }
  edit(item) {
    this.selectedItem = item;
    this.toogleForm = !this.toogleForm;
    this.auth.editItem(item).subscribe((res) => console.log('Item Updated'));
  }
  delete(id) {
    this.auth.deleteItem(id).subscribe((res) => {
      console.log('Item Deleted');
      this.Updates();
    });
  }

  UpdateItemCheckBox(item) {
    item.itemBrought = !item.itemBrought;
    this.auth.editItem(item).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  Updates() {
    this.auth.getUpdates().subscribe(
      (res) => {
        console.log(res), (this.updatesFromMongo = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
// addItems = new FormGroup({
//   itemName: new FormControl(' ', Validators.required),
//   itemQuantity: new FormControl('', [
//     Validators.pattern(/^[0-9]\d*$/),
//     Validators.min(1),
//     Validators.max(1000),
//   ]),
// });
