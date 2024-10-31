import { Paginate } from "./common"

export interface Common {
    response: boolean
    messages: []
}

export interface PriorityAndStatus {
    id: number
    title: string
}

export interface FullData extends Paginate{
    data: Task[]
}

export interface Task {
    id: number
    id_user: number
    id_status: number
    id_priority: number
    title: string
    description: string | null
    date_limit: Date
    created_at: Date
    updated_at: Date
    status: {
        id: number
        title: string
    },
    priority: {
        id: number
        title: string
    }
}

export interface CommonResponsePriorityAndStatus extends Common {
    data: [PriorityAndStatus]
}

export interface ResponseTask extends Common {
    data: FullData
}

export interface ImputTask {
    status: number
    priority: number
    title: string
    description: string | null
    date_limit: string
}

export interface ResponseCrateTask extends Common {
    data: Task
}