import { Injectable } from '@angular/core';
import { Item } from './shared/models/item';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Injectable({ providedIn: 'root' })
export class AppService {
  public parentItem: Item;
  public parentItem2: Item;
  constructor() {
    this.restore1();
    this.restore2();
  }
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.parentItem).reverse();
  }

  private restore1() {
    this.parentItem = new Item({ name: 'EDITOR' });
    this.parentItem.children.push(
      new Item({
        name: 'test1',
        children: [
          new Item({
            name: 'subItem3',
          }),
          new Item({ name: 'subItem4' }),
          new Item({
            name: 'subItem5',
            children: [new Item({ name: 'test3' })],
          }),
        ],
      }),
    );
  }

  private restore2() {
    this.parentItem2 = new Item({ name: 'ELEMENTS' });
    this.parentItem2.children.push(
      new Item({ name: 'ARRAY', hasNoChildren: true }),
      new Item({ name: 'TREE', hasNoChildren: true }),
      new Item({ name: 'INPUT', hasNoChildren: true }),
    );
  }

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
    this.restore2();
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach(childItem => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
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
