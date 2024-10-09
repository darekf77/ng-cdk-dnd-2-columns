import * as uuid from 'uuid';

export class Item {
  hasNoChildren: boolean;
  name: string;
  uId: string;
  children: Item[];

  constructor(options: {
    name: string;
    hasNoChildren?: boolean;
    children?: Item[];
  }) {
    this.hasNoChildren = options.hasNoChildren || false;
    this.name = options.name;
    this.uId = uuid.v4();
    this.children = options.children || [];
  }
}
