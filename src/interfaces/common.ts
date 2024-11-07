export interface Paginate {
    current_page: number
    first_page_url: string
    from: number
    last_page: number
    last_page_url: number
    links: links[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

interface links {
    url: string | null
    label: string
    active: boolean
}