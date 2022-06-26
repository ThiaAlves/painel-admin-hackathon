import Head from 'next/head';
import { Menu } from "../../../components/Menu";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';
import { validaPermissao } from '../../../services/validaPermissao';
import { useContext, useEffect, useRef, useState } from 'react';
import { PesquisasContext } from '../../../contexts/ListaPesquisaContext';
import { useRouter } from 'next/router';
import api from '../../../services/request';
import { BsTrash, BsPencil, BsGear, BsMailbox, BsFillPersonFill, BsHash, BsPlusLg, BsEye, BsSearch, BsStars, BsArrowBarLeft, BsArrowLeft, BsShieldCheck, BsShieldX, BsXLg } from 'react-icons/bs';

interface interfProps {
    token?: string;
}

interface interfpesquisa {
    id_resposta: number;
    nome_pessoa: string;
    tema_pesquisa: string;
    perguntas: string;
    respostas: string;
    status_resposta?: string;
}



export default function pesquisa(props: interfProps) {
    const router = useRouter();

    const { id } = router.query;

    const refForm = useRef<any>();


    const [pesquisas, setpesquisas] = useState<Array<interfpesquisa>>([]);


    function findPesquisa() {
        api.get(`v1/respostasPorPesquisa/${id}`, {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                if (res.data.status === "Token is Expired") {
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

    function getStatus(status) {
        if (status === 1) {
            return <span className="badge bg-success"><BsShieldCheck/> Normal</span>
        } else {
            return <span className="badge bg-warning"><BsShieldX/> Pendente</span>
        }
    }

    function openModal(id, nome, tema, perguntas, respostas, status) {

        refForm.current['nome_pessoa'].value = nome;
        refForm.current['tema_pesquisa'].value = tema;
        refForm.current['perguntas'].value = perguntas;
        refForm.current['respostas'].value = respostas;
        refForm.current['status_resposta'].value = status;
}



    useEffect(() => {
        findPesquisa();
    }, []);
    return (
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
                        <h3><BsSearch /> Respostas da Pesquisa: {pesquisas.map((pesquisa: interfpesquisa) => (pesquisa.tema_pesquisa))}</h3>
                        <div
                            className="btn-toolbar mb-2 mb-md-0"
                        >
                            <button type="button" onClick={() => router.push('/pesquisa')}
                                className="btn btn-secondary rounded-pill"><BsArrowLeft /> Voltar</button>
                        </div>
                    </div>
                </>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th><BsHash /> ID</th>
                            <th><BsFillPersonFill /> Usuário</th>
                            <th><BsStars /> Status</th>
                            <th><BsGear /> Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesquisas.map((pesquisa: interfpesquisa) => (
                            <tr key={pesquisa.id_resposta}>
                                <td width="10%" className="text-center">{pesquisa.id_resposta}</td>
                                <td width="40%">{pesquisa.nome_pessoa}</td>
                                <td width="20%">{getStatus(pesquisa.status_resposta)}</td>
                                <td width="10%">
                                    <button type="button" onClick={() => openModal(pesquisa.id_resposta, pesquisa.nome_pessoa, pesquisa.tema_pesquisa, pesquisa.perguntas, pesquisa.respostas, pesquisa.status_resposta)}
                                        className="btn btn-success btn-sm m-1 rounded-pill" title="Visualizar" data-bs-toggle="modal" data-bs-target="#modal-resposta"><BsEye /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="modal fade" id="modal-resposta" tabIndex={-1} role="dialog" aria-labelledby="modal-resposta-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modal-resposta-label">Resposta</h5>
                                <button type="button" className="btn btn-sm btn-secondary close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true"><BsXLg/></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form ref={refForm}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="nome_pessoa">Nome da Pessoa:</label>
                                            <input type="text" className="form-control" id="nome_pessoa" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tema_pesquisa">Tema da Pesquisa:</label>
                                            <input type="text" className="form-control" id="tema_pesquisa" disabled />
                                            <div className="form-group">
                                                <label htmlFor="perguntas"></label>
                                                <textarea className="form-control" id="perguntas" rows={10} disabled></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="respostas">Respostas:</label>
                                                <textarea className="form-control" id="respostas" rows={10} disabled></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="status_resposta">Status:</label>
                                                <select className="form-control" id="status_resposta" disabled>
                                                    <option value="1">Normal</option>
                                                    <option value="0">Pendente</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </Menu>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (contexto) => {

    const { 'painel-token': token } = parseCookies(contexto);

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
