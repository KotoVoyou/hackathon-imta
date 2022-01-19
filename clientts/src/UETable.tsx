import React from 'react';
import { ReactElement } from 'react';
import Card from './Card'
import { Campus, Slots, TAFs } from './enums';
import Filter, { FilterOptions } from './Filter';
import FilterList from './Filter';
import App2 from './Filter'
import logo from './logo.svg';
import './UETable.css'

interface UE{
    name: string,
    slots: string[],
    locations: string[]
    logo?: string
}

const UELIST: UE[] = [
    {name: "Hackathon", slots: ['E'], locations: ["Nantes"], logo: logo},
    {name: "Programmation appliquée aux systèmes embarqués", slots: ['D'], locations: ["Nantes"]},
    {name: "Espagnol", slots: [], locations: ["Brest", "Nantes", "Rennes"]},
    {name: "Un exemple 1", slots: ['E', 'F'], locations: ["Nantes", "Rennes"]},
]

type TableProps = {ues: UE[]} & {filters: FilterOptions};

class Table extends React.Component<TableProps, {}>{
    constructor(props: TableProps){
        super(props);
        this.isAccepted = this.isAccepted.bind(this);
        this.matches = this.matches.bind(this);
    }

    isAccepted(ue: UE): boolean{
        return this.matches(ue.slots, this.props.filters.slotOptions)
            && this.matches(ue.locations, this.props.filters.campusOptions)
            //TAFs
    }

    matches(l1: string[], l2: string[]): boolean{
        return l1.some(el => l2.includes(el));
    }

    render(){
        const rows: React.ReactNode[] = [];
        this.props.ues.forEach((ue: UE) => {
            if(this.isAccepted(ue)){
                rows.push(<Card name={ue.name} logo={ue.logo} slots={ue.slots} locations={ue.locations}/>);
            }
        })
    
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
}

export interface FilterBlockConfig{
    categoryName: string,
    options: string[],
    selected: string[],
    handler: (selection: string[]) => void
}

class FilterableTable extends React.Component<{}, FilterOptions>{
    constructor(props: {}){
        super(props);
        this.state = {
            slotOptions: [...Slots],
            campusOptions: [...Campus],
            tafOptions: [...TAFs]
        }
        this.handleSlotChange = this.handleSlotChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleTAFChange = this.handleTAFChange.bind(this);
    }

    handleSlotChange(selected: string[]){
        this.setState({slotOptions: selected});
    }

    handleCampusChange(selected: string[]){
        this.setState({campusOptions: selected});
    }

    handleTAFChange(selected: string[]){
        this.setState({tafOptions: selected});
    }

    render(){
        const blocks: FilterBlockConfig[] = [
            {categoryName: "Créneau", options: Slots, selected: this.state.slotOptions, handler: this.handleSlotChange},
            {categoryName: "Campus", options: Campus, selected: this.state.campusOptions, handler: this.handleCampusChange},
            {categoryName: "TAF", options: TAFs, selected: this.state.tafOptions, handler: this.handleTAFChange}
        ]

        return (
            <div className='row'>
                <div className='column1'><FilterList blocks={blocks}/></div>
                <div className='column2'><Table ues={UELIST} filters={this.state}/></div>
            </div>
        );
    }
}

function App(): ReactElement{
    return (
        <FilterableTable/>
    );
}

export default App