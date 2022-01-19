import React from "react";
import { ReactElement } from "react";
import { Campus, Slots, TAFs } from "./enums";
import './Filter.css'
import { FilterBlockConfig } from "./UETable";

interface Filter{
    category: string,
    options: string[]
}

type FilterBlockProps = Filter & {onSelectionChange: (e: string[]) => void}

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
            //Refresh
            this.render();
        }
        if(!e.currentTarget.checked && this.props.selected.includes(optionName)){
            this.setState((state, props) => {
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

export interface FilterOptions{
    slotOptions: string[],
    campusOptions: string[],
    tafOptions: string[]
}

class FilterList extends React.Component<{blocks: FilterBlockConfig[]}, {}>{
    constructor(props: {blocks: FilterBlockConfig[]}){
        super(props);
    }

    render(): React.ReactNode {
        const rows: React.ReactNode[] = [];
        this.props.blocks.forEach((block: FilterBlockConfig) => {
            rows.push(<FilterBlock categoryName={block.categoryName} options={block.options} selected={block.selected} handler={block.handler}/>)
        });

        return (
            <div>
                {rows}
            </div>
        );
    }

}

export default FilterList;