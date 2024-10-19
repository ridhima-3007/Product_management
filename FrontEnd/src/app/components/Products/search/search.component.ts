import { Component,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

   searchTerm=''

  constructor(private router:Router,private activatedroute:ActivatedRoute){}

  @Output() searchingData: EventEmitter<string> = new EventEmitter();

search(term:string){
  this.searchingData.emit(term);
}


}
