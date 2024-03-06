// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividentInfoComponent } from './earning-released/divident-info/divident-info.component';

const routes: Routes = [
  { path: 'dividend', component: DividentInfoComponent }
//   { path: '', redirectTo: '/yesterday', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}