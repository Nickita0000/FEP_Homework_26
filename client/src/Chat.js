export default class Chat {
    static URL = 'ws://localhost:8081'

    constructor(option) {
        this.option = option
        this.ws = new WebSocket(Chat.URL)

        this.ws.onopen = this.onopen
        this.ws.onclose = this.onclose
        this.ws.onerror = this.onerror
        this.ws.onmessage = this.onmessage.bind(this)

    }

    onopen() {
        console.log('Connection was established')
    }

    onclose() {
        console.log('Connection was stopped')
    }

    onerror(error) {
        console.error('Connection was interrupted: ', error.message)
    }

    onmessage(event) {
        try {
            const data = JSON.parse(event.data)
            this.option.onSubmitButton(data)
        } catch(e) {
            this.option.onError(e)
        }
    }

    send(data) {
        const messageStr = JSON.stringify({
            name: data.name,
            message: data.message
        })

        try {
            this.ws.send(messageStr)
        } catch(e) {
            this.option.onError(e)
        }
    }
}