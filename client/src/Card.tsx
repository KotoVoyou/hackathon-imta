import { ReactElement } from "react";
import logo from './logo.svg';
import imtalogo from './assets/IMT_Atlantique_logo.png'
import "./Card.css"

enum Campus{
    Brest,
    Nantes,
    Rennes
}

interface UEHeader{
    name: string,
    logo?: string
}

function CardHeader(props: UEHeader): ReactElement{
    return (
        <div className="header">
            <img src={props.logo ?? imtalogo} className="headerLogo"/>
            <span className="headerName">{props.name}</span>
        </div>
    );
}

interface UEDetails{
    slots: string[],
    locations: string[] | Campus[]
}

function CardDetailColumn(props: {header: string, data: string[] | Campus[]}): ReactElement{
    return (
        <div className="column">
            <h4>{props.header}</h4>
            {props.data.join(", ")}
        </div>
    )
}

function CardDetails(props: UEDetails): ReactElement{
    return (
        <div className="row details">
            <CardDetailColumn header="Créneau(x)" data={props.slots}/>
            <CardDetailColumn header="Campus" data={props.locations}/>
        </div>
    );
}

function Card(props: UEHeader & UEDetails): ReactElement{
    return(
        <div className="card">
            <CardHeader name={props.name} logo={props.logo}/>
            <CardDetails slots={props.slots} locations={props.locations}/>
        </div>
    );
}

export default Card;