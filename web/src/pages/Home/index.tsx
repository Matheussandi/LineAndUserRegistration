import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header'

import { FiSmartphone } from "react-icons/fi";

import { Container } from "./styles";

export function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Header title="Cadastrar" />

                <Button
                    title="Usuário"
                    style={{ fontFamily: 'Poppins', fontSize: '1.5rem' }}
                    onClick={() => navigate('/Dashboards')}
                />

                <Button
                    title="Linha"
                    style={{ fontFamily: 'Poppins', fontSize: '1.5rem' }}
                    onClick={() => navigate('/Lines')}
                />

                <Button
                    title="Total de linhas"
                    style={{ fontFamily: 'Poppins', fontSize: '1.5rem' }}
                    onClick={() => navigate('/TotalLines')}
                />
            </Container>
        </>
    )
}