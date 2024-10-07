import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import { User, UserLogin } from "../interfaces/User";
import { useStateContext } from "../components/context/ContextProvider";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Signup() {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const { setUser, setToken } = useStateContext()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload: User = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
        }

        try {
            setLoading(true);
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/signup`, {
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
                setUser({ ...res.data.user })
            }
            setLoading(false);
        } catch (err) {
            console.error(`$Errors -> ${err}`)
        }
    }
    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={(event) => onSubmit(event)}>
                        <h1>Create account</h1>
                        <input ref={nameRef} type="text" placeholder="Full name" />
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                         {!loading ? <button className="btn btn-block">Create</button> : <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />}
                        <p className="message">
                            Already registered? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}