import React from "react";
import { ReactElement } from "react";
import { FullTAF, FullUE } from "../models";
import { TAFCard, UECard } from "./UECard";
import "./UEDescription.css"

interface SectionInfo{
    header: string,
    elements: string[],
    colNum: number
}

function DetailsSection(props: SectionInfo): ReactElement{
    let index: number = 0;
    const chunks: string[][] = [];
    while(index < props.elements.length){
        chunks.push(props.elements.slice(index, index + props.colNum));
        index += props.colNum;
    }

    return (
        <div className="sectionRow">
            <strong className="sectionCol1">{props.header}</strong>
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

type CourseViewProps = FullUE & {colNum: number};

class CourseView extends React.Component<CourseViewProps, {show: boolean}>{
    constructor(props: CourseViewProps){
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
                <UECard name={this.props.name} logo={this.props.logo} slots={this.props.slots} locations={this.props.locations}
                onExpand={this.handleCardClick}/>
                {this.state.show &&
                    <div>
                        <DetailsSection colNum={this.props.colNum} header="Enseignants" elements={this.props.teachers.map(t => t.name)}/>
                        <DetailsSection colNum={this.props.colNum} header="Etudiants" elements={this.props.students.map(s => s.name)}/>
                    </div>
                }
            </div>
        );
    }
}

type TAFViewProps = FullTAF & {colNum: number};

class TAFView extends React.Component<TAFViewProps, {show: boolean}>{
    constructor(props: TAFViewProps){
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
                <TAFCard name={this.props.name} logo={this.props.logo} locations={this.props.locations}
                onExpand={this.handleCardClick}/>
                {this.state.show &&
                    <div>
                        <DetailsSection colNum={this.props.colNum} header="Enseignants" elements={this.props.teachers.map(t => t.name)}/>
                        <DetailsSection colNum={this.props.colNum} header="Etudiants" elements={this.props.students.map(s => s.name)}/>
                    </div>
                }
            </div>
        );
    }
}

export {DetailsSection, CourseView, TAFView};