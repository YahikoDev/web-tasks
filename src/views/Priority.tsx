import { useEffect, useState } from "react"
import { useStateContext, useStateContextPriority } from "../components/context/ContextProvider";
import { CommonResponsePriorityAndStatus } from "../interfaces/Tasks";
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Priority() {

    const { setPriorities, priorities } = useStateContextPriority()
    const [selectPriority, setSelectPriority] = useState(null);
    const { token } = useStateContext()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const request = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/priority`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const res: CommonResponsePriorityAndStatus = await request.json()

                if (res.response) {
                    setPriorities(res.data)
                }
                setLoading(false)
            } catch (err) {
                console.error(`Errors -> ${err}`)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="card flex justify-content-center">
            <p>Priority:</p>
            {
                !loading ?
                    <Dropdown value={selectPriority} onChange={(e) => setSelectPriority(e.value)} options={priorities} optionLabel="title"
                        placeholder="Select a priority" className="w-full md:w-14rem" />
                    :
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
            }
        </div>
    )
}