import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() data: any[];
  priceArray = [
    '0-1000',
    '1000-5000',
    '5000-15000',
    '15000-30000',
    '30000 and above',
  ];
  discountArray = ['0-20', '20-40', '40-60', '60-80', '80-100'];
  sort = ['Price:Low to High', 'Price:High to Low'];
  selectedPrice = '';
  selectedSeller = '';
  selectedDiscount = '';
  selectSort=''

  expandedIndex = 0;

  get uniqueSellers() {
    const sellerNames = this.data.map((item) => item.seller);
    return Array.from(new Set(sellerNames));
  }

  @Output() filterProducts: EventEmitter<{
    parameter: string;
    basedOn: string;
  }> = new EventEmitter();
  @Output() removeFilter: EventEmitter<{ parameter: string; basedOn: string }> =
    new EventEmitter();
  @Output() Sorting: EventEmitter<{ parameter: string }> = new EventEmitter();

  SortMyProducts(parameter) {
    this.Sorting.emit(parameter);
  }

  filter(parameter: string, basedOn: string) {
    this.filterProducts.emit({ parameter, basedOn });
  }

  removeFilters(parameter: string, basedOn: string) {
    if (basedOn === 'PRICE') {
      this.selectedPrice = '';
    }
    if (basedOn === 'SELLER') {
      this.selectedSeller = '';
    }
    if (basedOn === 'DISCOUNT') {
      this.selectedDiscount = '';
    }
    if (basedOn === 'SORT') {
      this.selectSort = '';
    }
    this.removeFilter.emit({ parameter, basedOn });
  }
}
