import { useState, FormEvent, useEffect } from 'react';
import { GrClose } from "react-icons/gr";
import { MdMobileFriendly, MdEdit, MdMobileOff } from "react-icons/md";
import Modal from "react-modal";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Form, Table, ButtonIcon, ButtonClose } from "./styles"

import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface ILine {
    id: string;
    lineNumber: number;
    chipNumber: number;
    dataPlan: string;
    accountNumber: number;
    telephoneOperator: string;
}

export function Line() {
    const [lineNumber, setLineNumber] = useState(0);
    const [chipNumber, setChipNumber] = useState(0);
    const [dataPlan, setDataPlan] = useState('');
    const [accountNumber, setAccountNumber] = useState(0);
    const [telephoneOperator, setTelephoneOperator] = useState('');

    const [lines, setLines] = useState<ILine[]>([]);

    const [status, setStatus] = useState('addLine');

    const [modalIsOpen, setIsOpen] = useState(false);

    const customModal = {
        content: {
            top: '50%',
            left: '50%',
            right: '100vh',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border: 0,
        }
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    async function handleaddLine(e: FormEvent) {
        e.preventDefault();
        const user = {
            lineNumber,
            chipNumber,
            dataPlan,
            accountNumber,
            telephoneOperator
        };

        if (status === 'addLine') {
            const { id } = await api.post('/users', user).then(dados => dados.data)
            setLines([...lines, { id, lineNumber, chipNumber, dataPlan, accountNumber, telephoneOperator }]);
        } else {
            await api.put(`/users/${status}`, user);
        }
        setLineNumber(0);
        setChipNumber(0);
        setDataPlan('');
        setAccountNumber(0);
        setTelephoneOperator('');
        setStatus('addUsuario');
        setIsOpen(false);
    }


    async function handleDeleteLine(id: string) {
        setLines(lines.filter(cli => cli.id !== id));
        await api.delete(`/lines/${id}`);
    }

    async function handleUpdateLine(id: string) {
        const dados = await api.get(`/lines/${id}`).then
            (dados => dados.data);

        setLineNumber(dados.lineNumber);
        setChipNumber(dados.chipNumber);
        setDataPlan(dados.dataPlan);
        setAccountNumber(dados.accountNumber);
        setTelephoneOperator(dados.telephoneOperator);
        setStatus(id);
    }

    async function loadLines() {
        const dataLine = await api.get('/lines').then(dados => dados.data);
        setLines(dataLine);
    }

    useEffect(() => {
        loadLines();
    }, [lines])

    const navigate = useNavigate();

    return (
        <>
            <ButtonClose
                title="Usuário"
                onClick={() => navigate('/')}
                style={{ fontFamily: 'Poppins' }}
            >Sair</ButtonClose>

            <Container>
                <Header
                    title="Linhas"
                />

                <Button
                    title="Adicionar"
                    type='button'
                    style={{ fontFamily: 'Poppins', fontSize: '1.5rem' }}
                    onClick={() => openModal()}
                />

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="react-modal-overlay"
                    style={customModal}
                >
                    <Form onSubmit={handleaddLine}>
                        <ButtonClose
                            type='button'
                            onClick={closeModal}
                        >
                            <GrClose size={20} />
                        </ButtonClose>

                        <Input
                            placeholder='Número da linha'
                            value={lineNumber}
                            onChange={e => setLineNumber(Number(e.target.value))}

                        />

                        <Input
                            placeholder='Número do chip'
                            value={chipNumber}
                            onChange={e => setChipNumber(Number(e.target.value))}
                        />

                        <Input
                            placeholder='Plano de dados'
                            value={dataPlan}
                            onChange={e => setDataPlan(e.target.value)}
                        />

                        <Input
                            placeholder='Número da conta'
                            value={accountNumber}
                            onChange={e => setAccountNumber(Number(e.target.value))}
                        />

                        <Input
                            placeholder='Operadora'
                            value={telephoneOperator}
                            onChange={e => setTelephoneOperator(e.target.value)}
                        />

                        <Button
                            title="Enviar"
                            type="submit"
                            style={{ marginBottom: '1rem' }}
                        />
                    </Form>
                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>Número da linha</th>
                            <th>Número do chip</th>
                            <th>Plano de dados</th>
                            <th>Número da conta</th>
                            <th>Operadora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map((li) => (
                            <tr key={li.id}>
                                <td>{li.lineNumber}</td>
                                <td>{li.chipNumber}</td>
                                <td>{li.dataPlan}</td>
                                <td>{li.accountNumber}</td>
                                <td>{li.telephoneOperator}</td>
                                <td>
                                    <ButtonIcon
                                        type='button'
                                        onClick={() => handleUpdateLine(li.id)}
                                        style={{ background: '#ffd60a' }}
                                    >
                                        <MdEdit size={30} color='#000' />
                                    </ButtonIcon>

                                    <ButtonIcon
                                        type='button'
                                        onClick={() => handleDeleteLine(li.id)}
                                        style={{ background: '#ff453a' }}
                                    >
                                        <MdMobileOff size={30} color='#000' />
                                    </ButtonIcon>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}