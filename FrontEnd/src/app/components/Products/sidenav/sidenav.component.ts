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

  get uniqueSellers() {
    const sellerNames = this.data.map((item) => item.seller);
    return Array.from(new Set(sellerNames));
  }

  @Output() filterProducts: EventEmitter<{parameter:string,basedOn:string}> = new EventEmitter();

  filter(parameter: string, basedOn: string) {
    this.filterProducts.emit({ parameter, basedOn });
  }
}
