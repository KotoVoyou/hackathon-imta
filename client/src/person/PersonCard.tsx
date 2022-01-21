import React from "react";
import { ReactElement } from "react";
import { FullUE, Person } from "../models";
import { CardDetailColumn, CardHeader } from "../ue/UECard";
import "../ue/UECard.css"
import { DetailsSection } from "../ue/UEDescription";

function PersonCard(props: {name: string, onExpand: () => void}): ReactElement {
    return(
        <div className="card">
            <CardHeader name={props.name} onExpand={props.onExpand} color="green"/>
        </div>
    );
}

type PersonViewProps = Person & {colNum: number};

class PersonView extends React.Component<PersonViewProps, {show: boolean}>{
    constructor(props: PersonViewProps){
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
                <PersonCard name={this.props.name}
                onExpand={this.handleCardClick}/>
                {this.state.show &&
                    <div>
                        <DetailsSection colNum={this.props.colNum} header="Cours" elements={this.props.courses.map(c => c.name)}/>
                    </div>
                }
            </div>
        );
    }
}

function PersonTable(props: {people: Person[]}): ReactElement{
    const rows: React.ReactNode[] = [];
    props.people.forEach((p: Person) => {
        rows.push(
            <PersonView name={p.name} courses={p.courses} colNum={2}/>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Résultat de la recherche</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export {PersonTable}

