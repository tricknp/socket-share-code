const socket = io('http://localhost:3000')
const submit = document.querySelector('#btn-submit')

const renderCode = (data) => {         
    let section = document.querySelector('#cards');
    let card_response_output = document.createElement('div')
    let pre = document.createElement('pre')

    pre.innerText = data.code 

    card_response_output.innerHTML = `<h1>${data.title}</h1>`
    card_response_output.appendChild(pre)

    section.appendChild(card_response_output);
}


socket.on('previousCodes', codes => {
    codes.forEach(code => {
        renderCode(code)
    })
})


socket.on('receivedCode', data => {
    renderCode(data)
})


submit.addEventListener('click', (e) => {
    const title = document.querySelector('#title-field').value 
    const code = document.querySelector('#code-field').value
    
    e.preventDefault()
    
    if (code.length > 0 ) {
        let data = {
            title: title,
            code: code
        }  

        renderCode(data)
        socket.emit('sendData', data)
    }
})