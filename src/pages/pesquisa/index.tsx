import Head from 'next/head';
import { Menu } from "../../components/Menu";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';
import { validaPermissao } from '../../services/validaPermissao';
import { useContext, useEffect, useState } from 'react';
import { PesquisasContext } from '../../contexts/ListaPesquisaContext';
import { useRouter } from 'next/router';
import api from '../../services/request';
import { BsTrash, BsPencil, BsGear, BsMailbox, BsFillPersonFill, BsHash, BsPlusLg, BsEye } from 'react-icons/bs';

interface interfProps {
    token?: string;
}

interface interfpesquisa {
    id: number;
    tema: string;
    descricao: string;
    status?: string;
}


export default function pesquisa(props: interfProps) {
    const router = useRouter();

    const [pesquisas, setpesquisas] = useState<Array<interfpesquisa>>([]);

    function deleteUser(id: number) {
        api.delete(`/pesquisas/${id}`, {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                findPesquisa();
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    function findPesquisa() {
        api.get("/pesquisas", {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                if(res.data.status === "Token is Expired"){
                    //Adicionar Mensagem de Login Expirado
                    alert("Token is Expired");
                    // Swal.fire({
                    //     title: 'Token is Expired',
                    //     text: '',
                    //     icon: 'error',
                    //     confirmButtonText: 'OK'
                    // }).then(() => {
                    //Voltar para a página de login
                    //     router.push("/");
                    // }
                    // );
                } else {
                setpesquisas(res.data);
                }
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    useEffect(() => {
        findPesquisa();
    }, []);
    return(
        <>
            <Head>
                <title>Pesquisa</title>
            </Head>

            <Menu
                active='pesquisa'
                token={props.token}
            >
                <>
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3 border-bottom"
                    >
                        <h2><BsFillPersonFill/> Pesquisas</h2>
                        <div
                            className="btn-toolbar mb-2 mb-md-0"
                        >
                            <button type="button" onClick={() => router.push('/pesquisa/novo')}
                            className="btn btn-success rounded-pill"><BsPlusLg/> Adicionar</button>
                        </div>
                    </div>
                </>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th><BsHash/> ID</th>
                            <th><BsFillPersonFill/> Tema</th>
                            <th><BsFillPersonFill/> Descrição</th>
                            <th><BsMailbox/> Status</th>
                            <th><BsGear/> Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesquisas.map((pesquisa: interfpesquisa) => (
                            <tr key={pesquisa.id}>
                                <td width="10%" className="text-center">{pesquisa.id}</td>
                                <td width="30%">{pesquisa.tema}</td>
                                <td width="40%">{pesquisa.descricao}</td>
                                <td width="10%">{pesquisa.status === '1' ? 'Ativo' : 'Inativo'}</td>
                                <td width="10%">
                                    <button type="button" onClick={() => router.push(`/pesquisa/respostas/${pesquisa.id}`)}
                                    className="btn btn-success btn-sm m-1 rounded-pill"><BsEye/></button>
                                    <button type="button" className="rounded-pill btn btn-primary btn-sm m-1"
                                    onClick={() => {
                                        router.push(`/pesquisa/${pesquisa.id}`)
                                    }}
                                    ><BsPencil/></button>
                                       <button
                                            className="rounded-pill btn btn-danger btn-sm m-1"
                                            onClick={() => {
                                                deleteUser(pesquisa.id);
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

    // console.log(token)

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
