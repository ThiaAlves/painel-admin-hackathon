import Head from 'next/head';
import { Menu } from "../../components/Menu";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';
import { validaPermissao } from '../../services/validaPermissao';
import { useContext, useEffect, useState } from 'react';
import { UsuariosContext } from '../../contexts/ListaUsuarioContext';
import { useRouter } from 'next/router';
import api from '../../services/request';
import { BsTrash, BsPencil, BsGear, BsMailbox, BsFillPersonFill, BsHash, BsPlusLg } from 'react-icons/bs';

interface interfProps {
    token?: string;
}

interface interfUsuario {
    bairro?: string;
    cpf?: string;
    email: string;
    endereco?: string;
    id: number;
    nome: string;
    numero?: string;
    telefone: string;
    tipo: string;
}


export default function Usuario(props: interfProps) {
    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Array<interfUsuario>>([]);

    function deleteUser(id: number) {
        api.delete(`/pessoas/${id}`, {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                findUser();
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    function findUser() {
        api.get("/pessoas", {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                setUsuarios(res.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    useEffect(() => {
        findUser();
    }, []);
    return(
        <>
            <Head>
                <title><BsFillPersonFill/> Usuário</title>
            </Head>

            <Menu
                active='usuario'
                token={props.token}
            >
                <>
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3 border-bottom"
                    >
                        <h2><BsFillPersonFill/> Usuário</h2>
                        <div
                            className="btn-toolbar mb-2 mb-md-0"
                        >
                            <button type="button" onClick={() => router.push('/usuario/novo')}
                            className="btn btn-success rounded-pill"><BsPlusLg/> Adicionar</button>
                        </div>
                    </div>
                </>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th><BsHash/> ID</th>
                            <th><BsFillPersonFill/> Nome</th>
                            <th><BsMailbox/> E-mail</th>
                            <th><BsGear/> Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario: interfUsuario) => (
                            <tr key={usuario.id}>
                                <td width="10%">{usuario.id}</td>
                                <td width="30%">{usuario.nome}</td>
                                <td width="30%">{usuario.email}</td>
                                <td width="15%">
                                    <button type="button" className="rounded-pill btn btn-primary btn-sm m-1"
                                    onClick={() => {
                                        router.push(`/usuario/${usuario.id}`)
                                    }}
                                    ><BsPencil/></button>
                                       <button
                                            className="rounded-pill btn btn-danger btn-sm m-1"
                                            onClick={() => {
                                                deleteUser(usuario.id);
                                            }}
                                        >
                                            <BsTrash />
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Menu>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (contexto) => {

    const {'painel-token': token} = parseCookies(contexto);

    console.log(token)

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const temPermissaoPage = validaPermissao(
        token, ['admin']
    )

    if (!temPermissaoPage) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    return {
        props: {
            token
        }
    }
}
