import { useEffect, useState } from "react"
import { useStateContext } from "../components/context/ContextProvider";
import { CommonResponsePriorityAndStatus, PriorityAndStatus } from "../interfaces/Tasks";
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Status() {

    const [selectSatus, setSelectStatus] = useState(null);
    const { token } = useStateContext()
    const [statuses, setStatuses ] = useState<[PriorityAndStatus]>([{} as PriorityAndStatus])
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/status`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const res: CommonResponsePriorityAndStatus = await request.json()

                if (res.response) {
                    setStatuses(res.data)
                }
                setLoading(false)
            } catch (err) {
                console.error(`$Errors -> ${err}`)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="card flex justify-content-center">
            { 
                !loading ?
                <Dropdown value={selectSatus} onChange={(e) => setSelectStatus(e.value)} options={statuses} optionLabel="title" 
                placeholder="Select a status" className="w-full md:w-14rem" />
                :
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
            }
        </div>
    )
}