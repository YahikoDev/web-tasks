import React, { useEffect, useRef, useState } from "react"
import { useStateContext } from "../components/context/ContextProvider";
import Status from "./Status";
import { ResponseTask, Task } from "../interfaces/Tasks";
import { Toast } from 'primereact/toast';
import Priority from "./Priority";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import SaveTasks from "../components/SaveTask";

export default function Tasks() {

    const { token } = useStateContext()
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([])
    const toast = useRef<Toast>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        fetchData()
    }, [currentPage])

    const fetchData = async () => {
        try {
            setLoading(true)
            const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/tasks?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const res: ResponseTask = await request.json()

            if (res.response) {
                setTasks(res.data.data)
                setMaxPage(res.data.last_page)
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

    const handlePrevPage = async () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    }

    const handleNextPage = async () => {
        setCurrentPage(prevPage => (prevPage === maxPage ? maxPage : prevPage + 1));
    }

    const actionBodyTemplate = () => {
        return (
            <React.Fragment>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '5px' }}>
                    <Button label="Edit" icon="pi pi-external-link" className="p-button-success" />
                    <Button label="Delete" icon="pi pi-external-link" className="p-button-danger" />
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '5px' }}>
                <Status />
                <Priority />
                <div className="card flex justify-content-center">
                    <Button label="New Task" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                    <Dialog header="Save task" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <SaveTasks />
                    </Dialog>
                </div>

            </div>
            <div className="card">
                {
                    !loading ?

                        <DataTable value={tasks} tableStyle={{ minWidth: '50rem' }} size="small">
                            <Column field="title" header="Title" style={{ width: '25%' }}></Column>
                            <Column field="description" header="Description" style={{ width: '25%' }}></Column>
                            <Column field="status.title" header="Status" style={{ width: '25%' }}></Column>
                            <Column field="priority.title" header="Prioriry" style={{ width: '25%' }}></Column>
                            <Column field="date_limit" header="Date limit" style={{ width: '25%' }}></Column>
                            <Column header="Actions" body={actionBodyTemplate} ></Column>
                        </DataTable>
                        :
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                }

                <div>
                    <span onClick={handlePrevPage}> {'<'} </span>
                    <span>{currentPage}</span>
                    <span onClick={handleNextPage}> {'>'} </span>
                </div>
            </div>
        </>
    )
}