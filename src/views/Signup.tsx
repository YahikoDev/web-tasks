import { useRef } from "react";
import { Link } from "react-router-dom"
import { User } from "../interfaces/User";
import { useStateContext } from "../components/context/ContextProvider";

export default function Signup() {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { setUser, setToken } = useStateContext()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload: User = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
        }

        setUser({...payload})
        setToken('token_test')

        console.log(payload)
    }
    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={(event) => onSubmit(event)}>
                        <h1>Crear una cuenta</h1>
                        <input ref={nameRef} type="text" placeholder="Full name" />
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="btn btn-block">Create</button>
                        <p className="message">
                        Already registered? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}