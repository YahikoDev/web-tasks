import { useEffect, useRef, useState } from "react"
import { Common, UserInfo } from "../interfaces/User"
import { Toast } from 'primereact/toast';
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function DefaultLayout() {
    const { user, token, setToken, setUser } = useStateContext()
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const onLogout = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        try {
            setLoading(true);
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify([])
            });

            const res: Common = await request.json()

            if (!res.response) {
                res.messages.forEach(element => {
                    toast.current!.show({ severity: 'warn', summary: 'Error', detail: element });
                });
            }

            if (request.status === 200) {
                setToken(null)
            }
            setLoading(false);
        } catch (err) {
            console.error(`$Errors -> {err}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const res: UserInfo = await request.json()

                if (request.status === 200) {
                    setUser(res)
                }
            } catch (err) {
                console.error(`$Errors -> ${err}`)
            }
        }

        fetchData()
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }
    return (
        <div id="defaultLayout">
            <Link to="/tasks"></Link>

            <div className="content">
                <header>
                    <div>
                        API Tasks
                    </div>
                    <div>
                        {user.name}

                        {!loading ? <a href="#" onClick={(event) => onLogout(event)} className="btn-logout">Log out</a> : <ProgressSpinner className="btn-logout" style={{ width: '18px', height: '18px' }} strokeWidth="8" />}
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            <Toast ref={toast} />
        </div>
    )
}