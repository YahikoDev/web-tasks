export interface Common {
    response: boolean
    messages: [string]
}

export interface UserOutput {
    name: string
    email: string
}

export interface User extends UserOutput{
    password: string
}

export interface UserSignup {
    email: string
    password: string
}

export interface UserLogin extends Common {
    data: {
        token: string
        user: UserInfo
    }
}

export interface UserInfo {
    id: number
    name: string
    email: string
    updated_at: Date,
    created_at: Date
}