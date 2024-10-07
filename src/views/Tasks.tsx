import { useEffect, useRef, useState } from "react"
import { useStateContext } from "../components/context/ContextProvider";
import Status from "./Status";
import { ResponseTask, Task } from "../interfaces/Tasks";
import { Toast } from 'primereact/toast';
import Priority from "./Priority";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function Tasks() {

    const { token } = useStateContext()
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<[Task]>([{} as Task])
    const toast = useRef<Toast>(null);

    const accept = () => {
        toast.current!.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current!.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/tasks`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const res: ResponseTask = await request.json()

                if (res.response) {
                    setTasks(res.data)
                } else {
                    res.messages.forEach(element => {
                        toast.current?.show({ severity: 'warn', summary: 'Error', detail: element });
                    });
                }
                setLoading(false)
            } catch (err) {
                console.error(`$Errors -> ${err}`)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '5px' }}>
                <Status />
                <Priority />
            </div>
            <div className="card">
                {
                    !loading ?

                        <DataTable value={tasks} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="title" header="Title" style={{ width: '25%' }}></Column>
                            <Column field="description" header="Description" style={{ width: '25%' }}></Column>
                            <Column field="date_limit" header="Date limit" style={{ width: '25%' }}></Column>
                        </DataTable>
                        :
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                }

                <ConfirmDialog />
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={confirm1} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
                    <Button onClick={confirm2} icon="pi pi-times" label="Delete"></Button>
                </div>

            </div>
        </>
    )
}