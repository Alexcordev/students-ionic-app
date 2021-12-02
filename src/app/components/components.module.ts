import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideComponent } from './slide/slide.component';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [SlideComponent, ButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SlideComponent, ButtonComponent]
})
export class ComponentsModule { }
