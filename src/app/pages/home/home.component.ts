import { Component, OnInit } from '@angular/core';


const row_height: { [id:number]: number } = {1: 400, 3: 335, 4: 350 }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cols = 3
  rowHeight = row_height[this.cols]
  category: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber
    this.rowHeight = row_height[this.cols]

  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

}
