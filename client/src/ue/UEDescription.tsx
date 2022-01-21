import React from "react";
import { ReactElement } from "react";
import { FullUE } from "../models";
import Card from "./UECard";
import "./UEDescription.css"

interface ParticipantList{
    role: string,
    names: string[],
    colNum: number
}

function ParticipantSection(props: ParticipantList): ReactElement{
    let index: number = 0;
    const chunks: string[][] = [];
    while(index < props.names.length){
        chunks.push(props.names.slice(index, index + props.colNum));
        index += props.colNum;
    }

    return (
        <div className="sectionRow">
            <strong className="sectionCol1">{props.role}</strong>
            <table className="sectionCol2">
                <tbody>
                    {chunks.map(chunk => <tr>{
                        chunk.map(name => <td>{name}</td>)
                    }</tr>)}
                </tbody>
            </table>
        </div>
    );
}

type UEViewProps = FullUE & {colNum: number};

class UEView extends React.Component<UEViewProps, {show: boolean}>{
    constructor(props: UEViewProps){
        super(props);
        this.state = {show: false};
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(){
        this.setState(state => ({show: !state.show}));
    }

    render(){
        return (
            <div className="view">
                <Card name={this.props.name} logo={this.props.logo} slots={this.props.slots} locations={this.props.locations}
                onExpand={this.handleCardClick}/>
                {this.state.show &&
                    <div>
                        <ParticipantSection colNum={this.props.colNum} role="Enseignants" names={this.props.teachers.map(t => t.name)}/>
                        <ParticipantSection colNum={this.props.colNum} role="Etudiants" names={this.props.students.map(s => s.name)}/>
                    </div>
                }
            </div>
        );
    }
}

export {UEView};