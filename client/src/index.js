import Chat from "./Chat";

const form = document.querySelector('#form')
const dialog = document.querySelector('#container')
const chat = new Chat({
    onSubmitButton: renderMessage,
    onError: showError,
})

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()

    const data = getMessage()

    if(isDataValid(data)) {
        showError(e)
    } else {
        chat.send(data)
    }
}

function renderMessage(data) {
    dialog.insertAdjacentHTML('beforeend', `<li>${data.name}: ${data.message}</li>`)
}


 function isDataValid(data) {
     return data.name === '' || data.message === ''
}

function getMessage() {
    return {
            name : form.name.value,
            message: form.message.value
        }
}

function showError(e) {
    alert(e.message)
}