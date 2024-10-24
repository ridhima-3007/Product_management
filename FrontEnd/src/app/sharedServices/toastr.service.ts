import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message, title) {
    this.toastr.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  showError(message, title) {
    this.toastr.error(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  showWarning(message, title) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }

  confirmBox(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'Your product will be removed from public listing',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  }
}
