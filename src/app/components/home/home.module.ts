import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    ThousandSeparatorPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
