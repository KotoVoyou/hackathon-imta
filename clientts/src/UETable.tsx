import { ReactElement } from 'react';
import Card from './Card'
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
    {name: "Espagnol", slots: [], locations: ["Brest", "Nantes", "Rennes"]}
]

function Table(props: {ues: UE[]}): ReactElement{
    const rows: React.ReactNode[] = [];
    props.ues.forEach((ue: UE) => {
        rows.push(<Card name={ue.name} logo={ue.logo} slots={ue.slots} locations={ue.locations}/>);
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

function FilterableTable(): ReactElement{
    return (
        <div className='row'>
            <div className='column1'><App2/></div>
            <div className='column2'><Table ues={UELIST}/></div>
        </div>
    );
}

function App(): ReactElement{
    return (
        <FilterableTable/>
    );
}

export default App