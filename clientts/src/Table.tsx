import React from "react";
import { ReactElement } from "react";
import './Table.css';

interface FilterData{
    filterText: string,
    inStockOnly: boolean
}

class FilterableProductTable extends React.Component<{}, FilterData>{
    constructor(props: {}){
        super(props);
        this.state = {filterText: "", inStockOnly: false};
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText: string){
        this.setState({filterText: filterText});
    }

    handleInStockChange(inStock: boolean){
        this.setState({inStockOnly: inStock});
    }

    render(): React.ReactNode {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange} onInStockChange={this.handleInStockChange}/>
                <ProductTable products={PRODUCTS} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
            </div>
        );
    }
}

type SearchBarProps = FilterData & {onFilterTextChange: any, onInStockChange: any};

class SearchBar extends React.Component<SearchBarProps,{}>{
    constructor(props: SearchBarProps){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }


    handleFilterTextChange(e: React.FormEvent<HTMLInputElement>){
        this.props.onFilterTextChange(e.currentTarget.value);
    }

    handleInStockChange(e: React.FormEvent<HTMLInputElement>){
        this.props.onInStockChange(e.currentTarget.checked);
    }

    render(): React.ReactNode {
        return (
            <div>
                <p>
                    <input type="text" value={this.props.filterText} placeholder="Search..." onChange={this.handleFilterTextChange}/>
                </p>
                <p>
                    <input type="checkbox" name="inStock" checked={this.props.inStockOnly} onClick={this.handleInStockChange}/>
                    <label htmlFor="inStock">Only show products in stock</label>
                </p>
            </div>
        );
    }
}

class ProductTable extends React.Component<{products: Product[]} & FilterData,{}>{
    render(): React.ReactNode {
        const rows: React.ReactNode[] = [];
        let lastCategory: string = "";

        this.props.products.forEach((product: Product) => {
            if(this.props.inStockOnly && !product.stocked
                || !product.name.includes(this.props.filterText)){
                    return;
                }
            if(product.category != lastCategory){
                rows.push(<ProductCategoryRow name={product.category}/>);
            }
            rows.push(<ProductRow name={product.name} value={product.price}/>)
            lastCategory = product.category;
        });

        return (

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

function ProductCategoryRow(props: {name: string}): ReactElement{
    return (
        <tr>
            <th colSpan={2}>
                {props.name}
            </th>
        </tr>
    );
}

interface Item{
    name: string,
    value: string
}

function ProductRow(props: Item): ReactElement{
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.value}</td>
        </tr>
    );
}

interface Product{
    category: string,
    price: string,
    stocked: boolean,
    name: string
}

const PRODUCTS: Product[] = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];


function App(){
    return(
        <FilterableProductTable/>
    );
}

export default App;