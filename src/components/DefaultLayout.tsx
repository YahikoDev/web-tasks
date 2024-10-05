import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";

export default function DefaultLayout() {

    const { user, token } = useStateContext()

    const onLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
    }

    if (!token) {
        return <Navigate to="/login" />
    }
    return (
        <div id="defaultLayout">
            <Link to="/tasks"></Link>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={(event) => onLogout(event)} className="btn-logout">Cerrar Sesión</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}