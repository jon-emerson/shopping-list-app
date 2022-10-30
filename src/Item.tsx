import { render } from "@testing-library/react";
import * as React from "react";

export interface IItem {
    key: string
    product: string
    purchased: boolean
}

export class Item extends React.Component<{
    item: IItem;
    togglePurchased: Function;
}> {

    handleItemClick() {
        this.props.togglePurchased(this.props.item.key);
    }

    render() {
        return (
            <div>
                <label>
                    <input type="checkbox"
                            checked={this.props.item.purchased}
                            onChange={this.handleItemClick.bind(this)} />
                    {this.props.item.product}
                </label>
            </div>
        )
    }
}
