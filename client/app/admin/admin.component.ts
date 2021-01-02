import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { NotificationEmail } from '../shared/models/notificationEmail.model';

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
              private userService: UserService) {
               }

  ngOnInit(): void {
    this.getUsers();

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

  deleteUser(user: User): void {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        () => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

  saveEmail(email: NotificationEmail): void {
    this.isLoading = true;
    this.userService.editNotificationEmail(email).subscribe( () => this.isLoading = false);
  }
}
