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
    line_number: string;
    chip_number: string;
    data_plan: string;
    account_number: string;
    telephone_operator: string;
}

export function Line() {
    const [line_number, setLine_number] = useState('');
    const [chip_number, setChip_number] = useState('');
    const [data_plan, setData_plan] = useState('');
    const [account_number, setAccount_number] = useState('');
    const [telephone_operator, setTelephone_operator] = useState('');

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
        const line = {
            line_number,
            chip_number,
            data_plan,
            account_number,
            telephone_operator
        };

        console.log(line)
        if (status === 'addLine') {
            const { id } = await api.post('/telephoneline', line).then(dados => dados.data)
            setLines([...lines, { id, line_number, chip_number, data_plan, account_number, telephone_operator }]);
        } else {
            await api.put(`/telephoneline/${status}`, line);
        }
        setLine_number('');
        setChip_number('');
        setData_plan('');
        setAccount_number('');
        setTelephone_operator('');
        setStatus('addLine');
        setIsOpen(false);
    }


    async function handleDeleteLine(id: string) {
        setLines(lines.filter(cli => cli.id !== id));
        await api.delete(`/telephoneline/${id}`);
    }

    async function handleUpdateLine(id: string) {
        const dados = await api.get(`/telephoneline/${id}`).then
            (dados => dados.data);

        setLine_number(dados.line_number);
        setChip_number(dados.chip_number);
        setData_plan(dados.data_plan);
        setAccount_number(dados.account_number);
        setTelephone_operator(dados.telephone_operator);
        setStatus(id);

        openModal();
    }

    async function loadLines() {
        const dataLine = await api.get('/telephoneline').then(dados => dados.data);
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
                            value={line_number}
                            onChange={e => setLine_number(e.target.value)}

                        />

                        <Input
                            placeholder='Número do chip'
                            value={chip_number}
                            onChange={e => setChip_number(e.target.value)}
                        />

                        <Input
                            placeholder='Plano de dados'
                            value={data_plan}
                            onChange={e => setData_plan(e.target.value)}
                        />

                        <Input
                            placeholder='Número da conta'
                            value={account_number}
                            onChange={e => setAccount_number(e.target.value)}
                        />

                        <Input
                            placeholder='Operadora'
                            value={telephone_operator}
                            onChange={e => setTelephone_operator(e.target.value)}
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
                                <td>{li.line_number}</td>
                                <td>{li.chip_number}</td>
                                <td>{li.data_plan}</td>
                                <td>{li.account_number}</td>
                                <td>{li.telephone_operator}</td>
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