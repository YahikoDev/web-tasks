import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { UserSignup, UserLogin } from "../interfaces/User"
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useStateContext } from "../components/context/ContextProvider";

export default function Login() {

    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);
    const { setToken, setUser } = useStateContext()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload: UserSignup = {
            email: email.current!.value,
            password: password.current!.value,
        }
        try {
            setLoading(true);
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const res: UserLogin = await request.json()

            if (request.status === 422) {
                res.messages.forEach(element => {
                    toast.current?.show({ severity: 'warn', summary: 'Error', detail: element });
                });
            }

            if (request.status === 200) {
                setToken(res.data.token)
                setUser({...res.data.user})
            }
            setLoading(false);
        } catch (err) {
            console.error(`$Errors -> ${err}`)
        }

    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={(event) => onSubmit(event)}>
                    <h1>Login</h1>
                    <input ref={email} type="email" placeholder="Email" />
                    <input ref={password} type="password" placeholder="Password" />
                    {
                        !loading ?
                            <Button className="btn btn-block">Login</Button> :
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                    }
                    <p className="message">
                        Not registered? <Link to="/signup">Create account</Link>
                    </p>
                </form>
                <Toast ref={toast} />
            </div>
        </div>
    )
}