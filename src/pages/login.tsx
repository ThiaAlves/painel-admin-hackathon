import Head from 'next/head'
import { FormEvent, useCallback, useContext, useRef } from 'react'
import { AutenticacaoContext } from '../contexts/AutenticacaoContext';

export default function Login() {

    const refForm = useRef<any>();

    const {logar} = useContext(AutenticacaoContext);

    const submitForm = useCallback((e: FormEvent) => {
        //não renderiza a pagina quando executa o submit do formulario
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === 'botao') break;
                obj[id] = value;


            }
            logar(obj)
        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [])

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="login">


            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <div
                    style={{
                        border: 2,
                        borderColor: '#ccc',
                        borderStyle: 'solid',
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 20,
                        maxWidth: 400
                    }}
                >
                    <div
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <h1
                            style={{ color: "#0d6efd" }}
                        >
                            Login
                        </h1>
                        <p>
                            Digite seus dados para entrar no sistema!
                        </p>
                    </div>
                    <hr />
                    <form
                        className='row g-3 needs-validation'
                        noValidate
                        ref={refForm}
                    >
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <div
                                className='input-group has-validation'
                            >
                                <span
                                    className='input-group-text'
                                >@</span>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Digite o email'
                                    id="email"
                                    required
                                />
                                <div className='invalid-feedback'>
                                    Por favor, digite seu email.
                                </div>
                            </div>
                        </div>
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='senha'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='password'
                                required
                            />
                            <div className='invalid-feedback'>
                                Por favor, digite sua senha.
                            </div>
                        </div>
                        <div
                            className='col-md-12'
                        >
                            <button
                                className='btn btn-primary mt-3'
                                type='submit'
                                id='botao'
                                onClick={(e) => submitForm(e)}
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
