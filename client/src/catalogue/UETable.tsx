import React from "react";
import { ReactElement } from "react";
import { Campus, Slots, TAFs } from "../enums";
import FilterPanel from "./Filter";
import { GET_UES } from "../queries"
import "./UETable.css";

import { useQuery } from "@apollo/client";
import { FullUE } from "../models";
import { UEView } from "../ue/UEDescription";

interface FilterOptions {
    slotOptions: string[];
    campusOptions: string[];
    tafOptions: string[];
}

interface SearchOptions extends FilterOptions {
    filterText: string;
}

type TableProps = { ues: FullUE[] } & { filters: FilterOptions };

class Table extends React.Component<TableProps, {}> {
    constructor(props: TableProps) {
        super(props);
        this.isAccepted = this.isAccepted.bind(this);
        this.matches = this.matches.bind(this);
    }

    isAccepted(ue: FullUE): boolean {
        return (
            this.matches(ue.slots, this.props.filters.slotOptions) &&
            this.matches(ue.locations, this.props.filters.campusOptions)
        );
    }

    matches(l1: string[], l2: string[]): boolean {
        return l1.some((el) => l2.includes(el));
    }

    render() {
        const rows: React.ReactNode[] = [];
        this.props.ues.forEach((ue: FullUE) => {
            if (this.isAccepted(ue)) {
                rows.push(
                    <UEView name={ue.name} logo={ue.logo} slots={ue.slots} locations={ue.locations} 
                        teachers={ue.teachers} 
                        students={ue.students} 
                            colNum={3} />
                );
            }
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
}

export interface FilterBlockConfig {
    categoryName: string;
    options: string[];
    selected: string[];
    handler: (selection: string[]) => void;
}

class FilterableTable extends React.Component<{ues: FullUE[]}, SearchOptions> {
    constructor(props: {ues: FullUE[]}) {
        super(props);
        this.state = {
            slotOptions: [...Slots],
            campusOptions: [...Campus],
            tafOptions: [...TAFs],
            filterText: "",
        };
        this.handleSlotChange = this.handleSlotChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleTAFChange = this.handleTAFChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleSlotChange(selected: string[]) {
        this.setState({ slotOptions: selected });
    }

    handleCampusChange(selected: string[]) {
        this.setState({ campusOptions: selected });
    }

    handleTAFChange(selected: string[]) {
        this.setState({ tafOptions: selected });
    }

    handleFilterTextChange(filterText: string) {
        this.setState({ filterText: filterText });
    }

    render() {
        const blocks: FilterBlockConfig[] = [
            {
                categoryName: "Créneau",
                options: Slots,
                selected: this.state.slotOptions,
                handler: this.handleSlotChange,
            },
            {
                categoryName: "Campus",
                options: Campus,
                selected: this.state.campusOptions,
                handler: this.handleCampusChange,
            },
            {
                categoryName: "TAF",
                options: TAFs,
                selected: this.state.tafOptions,
                handler: this.handleTAFChange,
            },
        ];

        return (
            <div className="row">
                <div className="column1">
                    <FilterPanel
                        blocks={blocks}
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                    />
                </div>
                <div className="column2"><Table ues={this.props.ues} filters={this.state} /></div>
            </div>
        );
    }
}

function App(): ReactElement {
    const { loading, error, data } = useQuery(GET_UES);

    if (loading) return <p>Chargement des UEs...</p>;
    if (error) return <p>Erreur</p>;
    
    const listUes: FullUE[] = data.courses;

    return <FilterableTable ues={listUes}/>;
}

export default App;
