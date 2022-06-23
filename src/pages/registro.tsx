import Head from "next/head";
import { FormEvent, useCallback, useContext, useRef } from "react";
import { AutenticacaoContext } from "../contexts/AutenticacaoContext";
import { BsKey, BsEnvelope } from "react-icons/bs";
import { useRouter } from 'next/router';

export default function Login() {
    const refForm = useRef<any>();

    const router = useRouter();

    const { logar } = useContext(AutenticacaoContext);

    const submitForm = useCallback((e: FormEvent) => {
        //não renderiza a pagina quando executa o submit do formulario
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            let obj: any = new Object();

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === "botao") break;
                obj[id] = value;
            }
            logar(obj);
        } else {
            refForm.current.classList.add("was-validated");
        }
    }, []);

    return (
        <>
            <Head>
                <title>Registro</title>
            </Head>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                }}
                className="back-login"
            >
                <div
                    style={{
                        border: 2,
                        borderColor: "#ccc",
                        borderStyle: "solid",
                        borderRadius: 8,
                        padding: 20,
                        maxWidth: 800,
                    }}
                    className="back-painel-login"
                >
                    <div
                        style={{
                            alignItems: "center",
                        }}
                        className="log-login"
                    >
                        <img src="img/log-login.png" alt="" />
                        {/* <h1 style={{ color: "#0d6efd" }}>Login</h1> */}
                        <p  style={{
                                color: "#0d6efd",
                                fontSize: "18px",
                                fontWeight: "bolder"
                            }}>Cadastre seus dados para entrar no sistema, e conseguir votar!</p>
                    </div>
                    <hr />
                    <form
                        className="row g-3 needs-validation"
                        noValidate
                        ref={refForm}
                    >
                        <div className=" d-flex col-md-12">
                            <div className="p-1 col-md-6">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="nome"
                                        className="form-control"
                                        placeholder="Digite o nome"
                                        id="nome"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu nome.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="telefone" className="form-label">
                                    Telefone
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Digite o telefone"
                                        id="telefone"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu Telefone.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="cpf" className="form-label">
                                    CPF
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Digite o cpf"
                                        id="cpf"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu CPF.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-md-12">
                            <div className="p-1 col-md-9">
                                <label htmlFor="endereco" className="form-label">
                                    Endereço
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o endereço"
                                        id="endereco"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu Endereço.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="numero" className="form-label">
                                    Numero
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o numero"
                                        id="numero"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu Numero.
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex col-md-12">
                            <div className="p-1 col-md-3">
                                <label htmlFor="cep" className="form-label">
                                    CEP
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="cep"
                                        className="form-control"
                                        placeholder="Digite o cep"
                                        id="cep"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu CEP.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="estado" className="form-label">
                                    Estado
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o estado"
                                        id="estado"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu Estado.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="cidade" className="form-label">
                                    Cidade
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="cidade"
                                        className="form-control"
                                        placeholder="Digite a cidade"
                                        id="cidade"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite sua Cidade.
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 col-md-3">
                                <label htmlFor="bairro" className="form-label">
                                    Bairro
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="bairro"
                                        className="form-control"
                                        placeholder="Digite o bairro"
                                        id="bairro"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Por favor, digite seu Bairro.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-md-12">
                        <div className="p-1 col-md-6">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <BsEnvelope />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite seu email"
                                    id="email"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Por favor, digite seu email.
                                </div>
                            </div>
                        </div>
                        <div className="p-1 col-md-6">
                            <label htmlFor="password" className="form-label">
                                Senha
                            </label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <BsKey />
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    id="password"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Por favor, digite sua senha.
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className="d-flex col-md-12">
                            <div className="col-md-6 col-button">
                                <button
                                    className="btn btn-primary mt-3 form-control rounded-pill"
                                    type="button"
                                    id="botao"
                                    onClick={(e) => submitForm(e)}
                                >
                                    Registrar
                                </button>
                            </div>
                            <div className="col-md-6 col-button">
                                <button
                                    className="btn btn-secondary mt-3 form-control rounded-pill"
                                    type="button"
                                    id="botao"
                                    onClick={() => router.push('/login')}
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}