import { ReactElement } from "react";
import "./CardItems.css"

function CardItem(props: {name: string}): ReactElement{
    return (
        <div className="item">
            {props.name}
        </div>
    );
}

function CardItemList(props: {names: string[]}): ReactElement{
    const items: React.ReactNode[] = props.names.map((name: string) => <CardItem name={name}/>);
    return (
        <div className="itemList">
            {items}
        </div>
    );
}

export {CardItemList}