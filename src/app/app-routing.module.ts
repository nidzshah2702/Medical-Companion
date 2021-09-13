import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MymedicationComponent } from './mymedication/mymedication.component';
import { MyreportsComponent } from './myreports/myreports.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { AddmedicationComponent } from './addmedication/addmedication.component';



const routes: Routes = [{path:"register",component:RegisterComponent},{path:"home",component:HomeComponent},{path:"",component:HomeComponent},
{path:'login',component:LoginComponent},{path:'dashboard',component:DashboardComponent},{path:'mymedication/:id',component:MymedicationComponent},
{path:'myreports/:id',component:MyreportsComponent},{path:'viewprofile/:id',component:ViewprofileComponent},{path:'createprofile/:id',component:MyprofileComponent},
{path:'updateprofile/:id',component:UpdateprofileComponent},{path:'forgotpassword',component:ForgotpasswordComponent},
{path:'resetpassword/:id',component:ResetpasswordComponent},
{path:'newpassword/:id',component:NewpasswordComponent},{path:'addmedication',component:AddmedicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
