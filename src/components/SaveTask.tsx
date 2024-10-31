import { useRef, useState } from "react"
import { ImputTask, PriorityAndStatus, ResponseCrateTask } from "../interfaces/Tasks";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useStateContext, useStateContextStatus, useStateContextPriority } from "../components/context/ContextProvider";
import { Dropdown } from 'primereact/dropdown';

export default function SaveTasks() {

    const { statuses } = useStateContextStatus()
    const { priorities } = useStateContextPriority()
    const { token } = useStateContext()
    const [loading, setLoading] = useState(false);
    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)
    const date_limit = useRef<HTMLInputElement>(null)
    const toast = useRef<Toast>(null);
    const [selectSatus, setSelectStatus] = useState<PriorityAndStatus>({} as PriorityAndStatus);
    const [selectPriority, setSelectPriority] = useState<PriorityAndStatus>({} as PriorityAndStatus);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload: ImputTask = {
            status: selectSatus.id,
            priority: selectPriority.id,
            title: title.current!.value,
            description: description.current!.value,
            date_limit: new Date(date_limit.current!.value),
        }
        try {
            setLoading(true);
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/tasks/create`, {
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
            } else {
                res.messages.forEach(element => {
                    toast.current?.show({ severity: 'warn', summary: 'Error', detail: element });
                });
            }

        } catch (err) {
            console.error(`Errors -> ${err}`)
        }
        setLoading(false);
    }

    return (
        <>
            <form onSubmit={(event) => onSubmit(event)}>
                <Dropdown value={statuses} onChange={(e) => setSelectStatus(e.value)} options={statuses} optionLabel="title" placeholder="Select a status" className="w-full md:w-14rem" />
                <Dropdown value={priorities} onChange={(e) => setSelectPriority(e.value)} options={priorities} optionLabel="title" placeholder="Select a priority" className="w-full md:w-14rem" />
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