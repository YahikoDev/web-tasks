import { useRef, useState } from "react"
import { useStateContext } from "../components/context/ContextProvider";
import { PriorityAndStatus } from "../interfaces/Tasks";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from "primereact/button";

export default function Status() {

    const { token } = useStateContext()
    const [statuses, setStatuses] = useState<PriorityAndStatus[]>([])
    const [loading, setLoading] = useState(false);
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const name = useRef<HTMLInputElement>(null)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }


    return (
        <form onSubmit={(event) => onSubmit(event)}>

            <input ref={name} type="name" placeholder="Full name" />
            <input ref={password} type="password" placeholder="Password" />
            <input ref={email} type="email" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            {
                !loading ?
                    <Button className="btn btn-block">Create Task</Button>
                    :
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
            }
        </form>
    )
}