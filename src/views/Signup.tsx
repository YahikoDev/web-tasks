import { Link } from "react-router-dom"

export default function Signup() {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={(event) => onSubmit(event)}>
                        <h1>Crear una cuenta</h1>
                        <input type="text" placeholder="Nombre completo" />
                        <input type="email" placeholder="Correo" />
                        <input type="password" placeholder="Contraseña" />
                        <button className="btn btn-block">Crear Cuenta</button>
                        <p className="message">
                            ¿Ya está registrado? <Link to="/login">Iniciar Sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}