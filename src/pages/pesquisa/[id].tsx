import { GetServerSideProps } from "next";
import Head from 'next/head';
import { useRouter } from "next/router"
import { parseCookies } from "nookies";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "../../components/Menu";
import api from "../../services/request";
import { validaPermissao } from "../../services/validaPermissao";
import { BsXLg, BsCheckLg } from "react-icons/bs";

interface interfProps {
    token?: string;
}

export default function Usuario(props: interfProps) {

    const [inputList, setInputList] = useState([{ pergunta: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { pergunta: "" }]);
    };


    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const [estaEditando, setEstaEditando] = useState(false);

    const editForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            let obj: any = new Object;

            for (let i = 0; i < refForm.current.elements.length; i++) {
                const id = refForm.current.elements[i].id;
                const value = refForm.current.elements[i].value;

                if (id === 'botao' || (id === 'status' && value === '')) break;
                obj[id] = value;
            }

            api.put(`/pesquisas/${id}`, obj, {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            })
                .then(() => {
                    router.push('/usuario');
                })
                .catch((erro) => {
                    console.log(erro);
                })

        } else {
            refForm.current.classList.add('was-validated');
        }
    }, []);

    useEffect(() => {
        const idParam = Number(id);

        if (Number.isInteger(idParam)) {
            setEstaEditando(true);

            api.get('/pesquisas/' + idParam, {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            }).then((res) => {

                if (res.data) {
                    refForm.current['tema'].value = res.data.tema;
                    refForm.current['descricao'].value = res.data.descricao;
                    refForm.current['perguntas'].value = res.data.perguntas;
                    refForm.current['status'].value = res.data.status;
                }

            }).catch((erro) => {
                console.log(erro);
            })
        }
    }, [])

    const submitForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {

            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === 'botao') break;
                obj[id] = value;

            }

            api.post('/pesquisas/', obj, {
                headers: {
                    'Authorization': `Bearer ${props.token}`
                }
            })
                .then((res) => {
                    router.push('/usuario');

                }).catch((erro) => {
                    console.log(erro);
                });

        } else {
            refForm.current.classList.add('was-validated');
        }
    }, [])

    return (
        <>

            <Head>
                <title>{estaEditando ? 'Editar' : 'Cadastrar'} Pesquisa</title>
            </Head>
            <Menu
                active='usuario'
                token={props.token}
            >
                <h2 className="pt-4">{estaEditando ? 'Editar' : 'Cadastrar'} Pesquisa</h2>

                <form
                    className='row g-3 needs-validation pt-4'
                    noValidate
                    ref={refForm}
                >
                    <div
                        className='col-md-12'
                    >
                        <label
                            htmlFor='tema'
                            className='form-label'
                        >
                            Tema:
                        </label>
                        <div
                            className='input-group has-validation'
                        >
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Informe o tema'
                                id="tema"
                                required
                            />
                            <div className='invalid-feedback'>
                                Por favor, informe o tema.
                            </div>
                        </div>
                    </div>
                    <div
                        className='col-md-12'
                    >
                        <label
                            htmlFor='Descrição'
                            className='form-label'
                        >
                            Descrição:
                        </label>
                        <div
                            className='input-group has-validation'
                        >
                            <textarea
                                className='form-control'
                                placeholder='Informe a descrição da pesquisa'
                                id="descricao"
                                required
                                rows={3}
                            />
                            <div className='invalid-feedback'>
                                Por favor, informe a descrição da Pesquisa.
                            </div>
                        </div>
                    </div>
                    <div
                        className='col-md-12'
                    >
                        <label
                            htmlFor='perguntas'
                            className='form-label'
                        >
                            Perguntas:
                        </label>
                        {inputList.map((x, i) => {
                            return (
                                <div className="box">
                                    <input
                                        name="pergunta"
                                        className='form-control'
                                        id={`pergunta${i}`}
                                        placeholder={`Informe a pergunta ${i + 1}`}
                                        value={x.pergunta}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <div className="btn">
                                        {inputList.length !== 1 && <button
                                            className="btn btn-sm btn-secondary m-1 rounded"
                                            onClick={() => handleRemoveClick(i)}>Apagar Pergunta</button>}
                                        {inputList.length - 1 === i && <button className="btn btn-sm btn-success m-1 rounded" onClick={handleAddClick}>Adicionar Pergunta</button>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className='col-md-12'
                    >
                        <label
                            htmlFor='status'
                            className='form-label'
                        >
                            Status
                        </label>
                        <div
                            className='input-group has-validation'
                        >
                            <select required className="form-select" defaultValue={""} id='status'>
                                <option value={""} disabled>Selecione o status</option>
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </select>
                            <div className='invalid-feedback'>
                                Por favor, selecione o tipo.
                            </div>
                        </div>
                    </div>
                    <div
                        className='col-md-12'
                    >

                        <div className=' text-end'>
                            <div className='col'>
                                <button
                                    type='button'
                                    className='btn btn-danger m-1 rounded-pill'
                                    onClick={() => {
                                        router.push('/pesquisa')
                                    }
                                    }
                                >
                                    <BsXLg /> Cancelar
                                </button>


                                <button
                                    className='btn btn-success m-1 rounded-pill'
                                    type='submit'
                                    id='botao'
                                    onClick={(e) => {
                                        submitForm(e)
                                        //Adicionar ou editar
                                        estaEditando ? setEstaEditando(false) : setEstaEditando(true)
                                    }
                                    }
                                >
                                    <BsCheckLg /> Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>


            </Menu>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (contexto) => {

    const { 'painel-token': token } = parseCookies(contexto);

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
