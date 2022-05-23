import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { ButtonIcon, Table } from "./styles";

interface ILine {
    id: string;
    line_number: string;
    chip_number: string;
    data_plan: string;
    account_number: string;
    telephone_operator: string;
}

/* const [totLines, setTotLines] = useState<ILine[]>([]);

let dataLines: ILine[] = []

async function loadtotLines() {
    const dataLines = await api.get('/telephoneline');
    setTotLines(dataLines);
}

useEffect(() => {
    loadtotLines();
}, []) */


export function TotalLines() {
    return (
        <>
            <Table>
                <thead>
                    <tr >
                        <th>Operadora</th>
                        <th >Total de linhas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>Vivo</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td>Claro</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td>Tim</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td>20Gb</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td>30Gb</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}