export default function request(url, init) {
    if (!REQUESTS.has(url)) {
        const request = fetch(url, init)
            .then(status)
            .finally(() => {
                REQUESTS.delete(url)
            })

        REQUESTS.set(url, request)
    }

    return REQUESTS.get(url)
}

export class HTTPError extends Error {
    constructor(response) {
        super(response.statusText)
        this.name = 'HTTPError'
        this.response = response
    }
    get status() {
        return this.response.status
    }
}

export function empty() {
    return Promise.resolve()
}

// Constants & utils
const REQUESTS = new Map()
function status(response) {
    if (response.ok) {
        return response.json()
    }

    const error = new HTTPError(response)

    return Promise.reject(error)
}
