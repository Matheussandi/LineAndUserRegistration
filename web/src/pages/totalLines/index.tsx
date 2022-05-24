import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { ButtonIcon, Table, Container, Content, LabelStyle,  } from "./styles";

interface ITotal {
    id: string;
    line_number: string;
    chip_number: string;
    data_plan: string;
    account_number: string;
    telephone_operator: string;
}

export function TotalLines() {
    const [totalLineVivo, setTotalLineVivo] = useState(0);
    const [totalLineClaro, setTotalLineClaro] = useState(0);
    const [totalLineOi, setTotalLineOi] = useState(0);
    const [totalLineTim, setTotalLineTim] = useState(0);

    const [totalLineNumberVivo, setTotalLineNumberVivo] = useState(0);
    const [totalLineNumberClaro, setTotalLineNumberClaro] = useState(0);
    const [totalLineNumberOi, setTotalLineNumberOi] = useState(0);
    const [totalLineNumberTim, setTotalLineNumberTim] = useState(0);

    let telephone: ITotal[] = [];

    async function loadTelephone() {
        const dataTelephone = await api.get('/telephoneLine').then(dados => dados.data);
        if (dataTelephone) {
            telephone = dataTelephone;
            setTotalLineVivo(telephone.filter(tel => tel.telephone_operator.toLowerCase() === 'vivo').length)
            setTotalLineClaro(telephone.filter(tel => tel.telephone_operator.toLowerCase() === 'claro').length)
            setTotalLineOi(telephone.filter(tel => tel.telephone_operator.toLowerCase() === 'oi' ).length)
            setTotalLineTim(telephone.filter(tel => tel.telephone_operator.toLowerCase() === 'tim').length )

            setTotalLineNumberVivo(telephone.filter(tel => tel.chip_number.slice(0,2) === '24').length)
            setTotalLineNumberClaro(telephone.filter(tel => tel.chip_number.slice(0,2) === '21').length)
            setTotalLineNumberOi(telephone.filter(tel => tel.chip_number.slice(0,2) === '31').length)
            setTotalLineNumberTim(telephone.filter(tel => tel.chip_number.slice(0,2) === '41').length)
        }
    }

    useEffect(() => {
        loadTelephone();
    }, []);

    return (
        <>
        <Container>
            <Header title="Total" />

            <Content>
                <LabelStyle>Linhas da Vivo: {totalLineVivo}</LabelStyle>
                <LabelStyle>Linhas da Claro: {totalLineClaro}</LabelStyle>
                <LabelStyle>Linhas da Oi: {totalLineOi}</LabelStyle>
                <LabelStyle>Linhas Tim: {totalLineTim}</LabelStyle>
                <br />
                <LabelStyle>DDD 24: {totalLineNumberVivo}</LabelStyle>
                <LabelStyle>DDD 21: {totalLineNumberClaro}</LabelStyle>
                <LabelStyle>DDD 31: {totalLineNumberOi}</LabelStyle>
                <LabelStyle>DDD 41: {totalLineNumberTim}</LabelStyle>
            </Content>

            </Container>
        </>
    )
}