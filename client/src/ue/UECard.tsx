import React from "react";
import { ReactElement } from "react";
import imtalogo from '../assets/IMT_Atlantique_logo.png'
import { UE } from "../models";
import "./UECard.css"

interface HeaderProps{
    name: string,
    logo?: string,
    onExpand: () => void
}

const EXPANDED: string = 'v';
const COLLAPSED: string = '^';
class CardHeader extends React.Component<HeaderProps, {buttonText: string}>{
    constructor(props: HeaderProps){
        super(props);
        this.state = {buttonText: EXPANDED};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onExpand();
        this.setState(state => ({buttonText: state.buttonText === EXPANDED ? COLLAPSED : EXPANDED}));
    }

    render(){
        return (
            <div className="header">
                <img src={this.props.logo ?? imtalogo} className="headerLogo"/>
                <span className="headerName">{this.props.name}</span>
                <button className="expandButton" onClick={this.handleClick}>{this.state.buttonText}</button>
            </div>
        );
    }
}

interface UEDetails{
    slots: string[],
    locations: string[]
}

function CardDetailColumn(props: {header: string, data: string[]}): ReactElement{
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

function Card(props: UE & {onExpand: () => void}): ReactElement{
    return(
        <div className="card">
            <CardHeader name={props.name} logo={props.logo} onExpand={props.onExpand}/>
            <CardDetails slots={props.slots} locations={props.locations}/>
        </div>
    );
}

export default Card;