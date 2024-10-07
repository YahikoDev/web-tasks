export interface Common {
    response: boolean
    messages: []
}

export interface PriorityAndStatus {
    id: number
    title: string
    created_at: Date
    updated_at: Date
}

export interface Task {
    id: number
    id_user: number
    id_status: number
    id_priority: number
    title: string
    description: string
    date_limit: Date
    created_at: Date
    updated_at: Date
}

export interface CommonResponsePriorityAndStatus extends Common {
    data: [PriorityAndStatus]
}

export interface ResponseTask extends Common {
    data: [Task]
}