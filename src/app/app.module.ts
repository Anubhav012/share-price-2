// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { EarningReleasedComponent } from './earning-released/earning-released.component';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DividentReleasedComponent } from './earning-released/divident-released/divident-released.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividentInfoComponent } from './earning-released/divident-info/divident-info.component';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NSETopGainerComponent } from './nse-top-gainer/nse-top-gainer.component';
import { CardV1Component } from './card-v1/card-v1.component';
import { TopGainerTableFormatComponent } from './nse-top-gainer/top-gainer-table-format/top-gainer-table-format.component';
import { TopGainerPremiumFormatComponent } from './nse-top-gainer/top-gainer-premium-format/top-gainer-premium-format.component';
import { SliderCardRangeComponent } from './card-v1/slider-card-range/slider-card-range.component';
import { HoldingInfoComponent } from './holding-info/holding-info.component';
import { LoginPageComponent } from './holding-info/login-page/login-page.component';
import { EmailVerificationComponent } from './holding-info/login-page/email-verification/email-verification.component';
import { StickyDividendNoteComponent } from './earning-released/sticky-dividend-note/sticky-dividend-note.component';


const appRoutes: Routes = [
  { path: '', component: EarningReleasedComponent },
  // { path: 'users', component: UsersComponent, children: [
  //   { path: ':id/:name', component: UserComponent }
  // ] },
  // {
  //   path: 'servers',
  //   // canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   component: ServersComponent,
  //   children: [
  //   { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
  //   { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  // ] },
  // // { path: 'not-found', component: PageNotFoundComponent },
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  // { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    EarningReleasedComponent,
    DividentReleasedComponent,
    DividentInfoComponent,
    NSETopGainerComponent,
    CardV1Component,
    TopGainerTableFormatComponent,
    TopGainerPremiumFormatComponent,
    SliderCardRangeComponent,
    HoldingInfoComponent,
    LoginPageComponent,
    EmailVerificationComponent,
    StickyDividendNoteComponent
    ],
  imports: [BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,AppRoutingModule],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
