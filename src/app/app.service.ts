import { Injectable } from '@angular/core';
import { Item } from './shared/models/item';

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

  restore1() {
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

  restore2() {
    this.parentItem2 = new Item({ name: 'ELEMENTS' });
    this.parentItem2.children.push(
      new Item({ name: 'ARRAY' }),
      new Item({ name: 'TREE' }),
      new Item({ name: 'INPUT' }),
    );
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach(childItem => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }
}
