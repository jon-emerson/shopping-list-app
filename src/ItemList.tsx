import * as React from "react";
import { IItem, Item } from './Item';

export class ItemList extends React.Component<{
  items: IItem[];
  togglePurchased: Function;
}> {

  render() {
    return (
      this.props.items.map(item => {
        return <Item key={item.key} item={item} togglePurchased={this.props.togglePurchased} />
      })
    );
  }
}

export default ItemList;
