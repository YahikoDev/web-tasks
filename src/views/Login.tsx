import { Link } from "react-router-dom"

export default function Login() {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={(event) => onSubmit(event)}>
                    <h1>Iniciar Sesión</h1>
                    <input type="email" placeholder="Correo" />
                    <input type="password" placeholder="Contraseña" />
                    <button className="btn btn-block">Ingresar</button>
                    <p className="message">
                        ¿No está registrado? <Link to="/signup">Crear una cuenta</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}