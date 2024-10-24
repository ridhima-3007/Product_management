import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toasterservice: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.verifyUserFormInit();
  }

  verifyUserFormInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.http
        .post(environment.APIURL + '/user/verify-email', { token })
        .subscribe(
          (response) => {
            this.toasterservice.showSuccess('You can login now', 'Verifed');
            this.router.navigate(['/auth/login']);
          },
          (error) => {
            this.toasterservice.showError('Try Again', 'Verification Failed');
          }
        );
    }
  }
}
