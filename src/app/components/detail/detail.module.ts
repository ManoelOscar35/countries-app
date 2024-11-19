import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';


@NgModule({
  declarations: [
    DetailComponent,
    ThousandSeparatorPipe
  ],
  imports: [
    CommonModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
