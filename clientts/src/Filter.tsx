import React, { ReactElement } from "react";
import './Filter.css'
import { FilterBlockConfig } from "./UETable";

function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

class FilterBlock extends React.Component<FilterBlockConfig, {selection: string[]}>{
    constructor(props: FilterBlockConfig){
        super(props);
        this.state = {selection: props.selected};
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange(e: React.FormEvent<HTMLInputElement>, optionName: string){
        if(e.currentTarget.checked && !this.props.selected.includes(optionName)){
            this.state.selection.push(optionName);
            this.render(); //Refresh
        }
        if(!e.currentTarget.checked && this.props.selected.includes(optionName)){
            this.setState((state, _) => {
                selection: removeItem(state.selection, optionName)
            })
        }
        this.props.handler(this.state.selection);
    }

    render(){
        const rows: React.ReactNode[] = this.props.options.map((option: string, index: number) => {
            return (
                <p>
                    <input type="checkbox" name={index.toString()} checked={this.state.selection.includes(option)} 
                    onClick={(e: React.FormEvent<HTMLInputElement>) => this.handleSelectionChange(e, option)}/>
                    <label htmlFor={index.toString()}>{option}</label>
                </p>
            )
        });
    
        return(
            <div className="category">
                <h4>{this.props.categoryName}</h4>
                <div className="categoryOptions">{rows}</div>
            </div>
        );
    }
}

function FilterList(props: {blocks: FilterBlockConfig[]}): ReactElement{
    const rows: React.ReactNode[] = [];
    props.blocks.forEach((block: FilterBlockConfig) => {
        rows.push(<FilterBlock categoryName={block.categoryName} options={block.options} selected={block.selected} handler={block.handler}/>)
    });

    return (
        <div>
            {rows}
        </div>
    );
}

interface SearchbarProps{
    filterText: string,
    onFilterTextChange: (text: string) => void
}

type FilterPanelProps = {blocks: FilterBlockConfig[]} & SearchbarProps;

class FilterPanel extends React.Component<FilterPanelProps, {}>{
    constructor(props: FilterPanelProps){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e: React.FormEvent<HTMLInputElement>){
        this.props.onFilterTextChange(e.currentTarget.value);
    }

    render(): React.ReactNode {
        return (
            <div>
                <p>
                    <label className="searchLabel search" htmlFor="nameInput">Rechercher par nom</label>
                    <input className="search" type="text" name="nameInput" 
                        value={this.props.filterText} placeholder="Search..." onChange={this.handleFilterTextChange}/>
                </p>
                <p>
                    <FilterList blocks={this.props.blocks}/>
                </p>
            </div>
        );
    }
}

export default FilterPanel;