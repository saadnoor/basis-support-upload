import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { NotificationEmail } from '../shared/models/notificationEmail.model';
import { CustomerSupportService } from '../services/customer-support.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  files: any[] = [];
  isLoading = true;
  isFileLoading = true;
  email: NotificationEmail;
  isEmailLoaded = false;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              public customerSupportService: CustomerSupportService,
              private userService: UserService) {
               }

  ngOnInit(): void {
    this.getUsers();
    this.getFiles();

    this.userService.getNotificationEmail().subscribe( res => {
      if (res.length > 0) {
        this.email = res[0];
        this.isEmailLoaded = true;
      }
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getFiles(): void {
    this.customerSupportService.getFiles().subscribe(
      data => {
        console.log(data);
        this.files = data;
      },
      error => console.log(error),
      () => this.isFileLoading = false
    );
  }

  deleteUser(user: User): void {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

  saveEmail(email: NotificationEmail): void {
    this.isLoading = true;
    this.userService.editNotificationEmail(email).subscribe( () => this.isLoading = false);
  }

  downloadFile(file: any) {
    if(file.url) {
      window.location.href=file.url;
    }
    else {
      this.toast.setMessage('this file is corrupted.', 'danger')
    }
  }
}
