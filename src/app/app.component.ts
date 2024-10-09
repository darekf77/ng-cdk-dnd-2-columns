import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Item } from './shared/models/item';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['app.scss'],
})
export class AppComponent implements OnInit {
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.appService.connectedDropListsIds;
  }

  constructor(private appService: AppService) {}

  public ngOnInit() {}

  public onDragDrop(event: CdkDragDrop<Item>) {
    this.appService.onDragDrop(event);
  }

  public get parentItem(): Item {
    return this.appService.parentItem;
  }

  public get parentItem2(): Item {
    return this.appService.parentItem2;
  }
}
