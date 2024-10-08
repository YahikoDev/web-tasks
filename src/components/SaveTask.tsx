import { useRef, useState } from "react"
import { ImputTask, ResponseCrateTask } from "../interfaces/Tasks";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useStateContext } from "../components/context/ContextProvider";

export default function SaveTasks() {

    const { token } = useStateContext()
    const [loading, setLoading] = useState(false);
    const id_status = useRef<HTMLInputElement>(null)
    const id_priority = useRef<HTMLInputElement>(null)
    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)
    const date_limit = useRef<HTMLInputElement>(null)
    const toast = useRef<Toast>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload: ImputTask = {
            status: Number(id_status.current!.value),
            priority: Number(id_priority.current!.value),
            title: title.current!.value,
            description: description.current!.value,
            date_limit: new Date(date_limit.current!.value),
        }
        try {
            setLoading(true);
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const res: ResponseCrateTask = await request.json()

            if (request.status === 422) {
                res.messages.forEach(element => {
                    toast.current?.show({ severity: 'warn', summary: 'Error', detail: element });
                });
            }

            if (request.status === 200) {
                res.messages.forEach(element => {
                    toast.current?.show({ severity: 'success', summary: 'OK', detail: element });
                });
            }else{
                res.messages.forEach(element => {
                    toast.current?.show({ severity: 'warn', summary: 'Error', detail: element });
                });
            }
            setLoading(false);
        } catch (err) {
            console.error(`Errors -> ${err}`)
        }
    }

    return (
        <>
            <form onSubmit={(event) => onSubmit(event)}>
                <input ref={id_status} type="number" placeholder="Status" />
                <input ref={id_priority} type="number" placeholder="Priority" />
                <input ref={title} type="text" placeholder="Title" />
                <input ref={description} type="text" placeholder="Description" />
                <input ref={date_limit} type="date" placeholder="Date limit" />
                {
                    !loading ?
                        <Button className="btn btn-block">Create Task</Button>
                        :
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                }
            </form>
            <Toast ref={toast} />
        </>

    )
}