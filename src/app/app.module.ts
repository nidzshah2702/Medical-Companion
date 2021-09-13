import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MymedicationComponent } from './mymedication/mymedication.component';
import { MyreportsComponent } from './myreports/myreports.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ReportService } from './service/report.service';
import { ProfileService } from './service/profile.service';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { FooterComponent } from './footer/footer.component';
import { AddmedicationComponent } from './addmedication/addmedication.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    MymedicationComponent,
    MyreportsComponent,
    MyprofileComponent,
    ViewprofileComponent,
    UpdateprofileComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    NewpasswordComponent,
    FooterComponent,
    AddmedicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [UserService,ReportService,ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
