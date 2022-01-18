import { ReactElement } from "react";
import './Filter.css'

interface Filter{
    category: string,
    options: string[]
}

function FilterBlock(props: Filter): ReactElement{
    const rows: React.ReactNode[] = props.options.map((option: string, index: number) => {
        return (
            <p>
                <input type="checkbox" name={index.toString()}/>
                <label htmlFor={index.toString()}>{option}</label>
            </p>
        )
    });

    return(
        <div className="category">
            <h4>{props.category}</h4>
            <div className="categoryOptions">{rows}</div>
        </div>
    );
}

const filters: Filter[] = [
    {category: "Créneau", options: ['D', 'E', 'F']},
    {category: "Campus", options: ['Brest', 'Nantes', 'Rennes']},
    {category: "TAF", options: ['LOGIN', 'COPSI']}
]

function App2(): ReactElement{
    const blocks: React.ReactNode[] = [];
    filters.forEach((filter) => {
        blocks.push(<FilterBlock category={filter.category} options={filter.options}/>)
    })

    return (
        <div>
            {blocks}
        </div>
    );
}

export default App2;