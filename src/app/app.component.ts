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
  selector: 'cdk-drag-drop-nested-lists-example',
  templateUrl: 'app.html',
  styleUrls: ['app.scss'],
})
export class CdkDragDropNestedListsExample implements OnInit {
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.appService.connectedDropListsIds;
  }

  constructor(private appService: AppService) {}

  public ngOnInit() {}

  public onDragDrop(event: CdkDragDrop<Item>) {
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: Item = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children =
        event.previousContainer.data.children.filter(
          child => child.uId !== movingItem.uId,
        );
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.appService.restore2();
  }

  public get parentItem(): Item {
    return this.appService.parentItem;
  }

  public get parentItem2(): Item {
    return this.appService.parentItem2;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;

    return (
      event.previousContainer.id !== event.container.id &&
      this.isNotSelfDrop(event) &&
      !this.hasChild(movingItem, event.container.data)
    );
  }

  private isNotSelfDrop(
    event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>,
  ): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some(
      item => item.uId === childItem.uId,
    );
    return hasChild
      ? true
      : parentItem.children.some(item => this.hasChild(item, childItem));
  }
}
