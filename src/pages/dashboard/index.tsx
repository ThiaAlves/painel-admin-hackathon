import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Menu } from "../../components/Menu";
import { validaPermissao } from "../../services/validaPermissao";

interface interfProps {
    token?: string;
}

export default function Dashboard(props: interfProps) {

    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Menu
                active="dashboard"
                token={props.token}
            >
                <>
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h2>Dashboard</h2>
                        <div
                            className="btn-toolbar mb-2 mb-md-0"
                        >
                            <button type="button" className="btn btn-dark">Teste</button>
                        </div>
                    </div>
                </>
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


    return {
        props: {
            token
        }
    }
}
