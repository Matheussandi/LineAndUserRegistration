import { useState, FormEvent, useEffect } from 'react';
import { GrClose } from "react-icons/gr";
import { MdPersonAdd, MdPersonRemove } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Modal from "react-modal";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Form, Table, ButtonIcon, ButtonClose } from "./styles"

import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface IDashboard {
    id: string;
    cpf: string;
    name: string;
    sector: string;
    company: string;
}

export function Dashboard() {
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [company, setCompany] = useState('');
    const [usuarios, setUsuarios] = useState<IDashboard[]>([]);

    const [status, setStatus] = useState('addUsuario');

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

    async function handleaddUsuario(e: FormEvent) {
        e.preventDefault();
        const user = {
            cpf,
            name,
            sector,
            company
        };

        if (status === 'addUsuario') {
            const { id } = await api.post('/users', user).then(dados => dados.data)
            setUsuarios([...usuarios, { id, cpf, name, sector, company }]);
        } else {
            await api.put(`/users/${status}`, user);
        }
        setCpf('');
        setName('');
        setSector('');
        setCompany('');
        setStatus('addUsuario');
        setIsOpen(false);
    }


    async function handleDeleteUsuario(id: string) {
        setUsuarios(usuarios.filter(cli => cli.id !== id));
        await api.delete(`/users/${id}`);
    }

    async function handleUpdateUsuario(id: string) {
        const dados = await api.get(`/users/${id}`).then
            (dados => dados.data);

        setCpf(dados.cpf);
        setName(dados.name);
        setSector(dados.sector);
        setCompany(dados.company);
        setStatus(id);
    }

    async function loadUsuarios() {
        const dataUser = await api.get('/users').then(dados => dados.data);
        setUsuarios(dataUser);
    }

    useEffect(() => {
        loadUsuarios();
    }, [usuarios])

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
                    title="Usuários"
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
                    <Form onSubmit={handleaddUsuario}>
                        <ButtonClose
                            type='button'
                            onClick={closeModal}
                        >
                            <GrClose size={20} />
                        </ButtonClose>

                        <Input
                            placeholder='CPF'
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}

                        />

                        <Input
                            placeholder='Insira seu nome'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            placeholder='Diga qual é seu setor'
                            value={sector}
                            onChange={e => setSector(e.target.value)}
                        />

                        <Input
                            placeholder='Informe a empresa'
                            value={company}
                            onChange={e => setCompany(e.target.value)}
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
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Empresa</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((cli) => (
                            <tr key={cli.id}>
                                <td>{cli.cpf}</td>
                                <td>{cli.name}</td>
                                <td>{cli.sector}</td>
                                <td>{cli.company}</td>
                                <td>
                                    <ButtonIcon
                                        type='button'
                                        onClick={() => handleUpdateUsuario(cli.id)}
                                        style={{ background: '#ffd60a' }}
                                    >
                                        <FaUserEdit size={30} color='#000' />
                                    </ButtonIcon>

                                    <ButtonIcon
                                        type='button'
                                        onClick={() => handleDeleteUsuario(cli.id)}
                                        style={{ background: '#ff453a' }}
                                    >
                                        <MdPersonRemove size={30} color='#000' />
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