import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message, title) {
    this.toastr.success(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
    });
  }

  showError(message, title) {
    this.toastr.error(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
    })
  }

  showWarning(message, title) {
    this.toastr.warning(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
    })
  }
}
