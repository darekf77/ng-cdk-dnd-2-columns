import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListItemComponent } from './shared/components/list-item/list-item.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule
  ],
  declarations: [
    ListItemComponent,
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
