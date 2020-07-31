console.log('Client side js loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationSearch = search.value

    fetch('http://localhost:3000/weather?address=' + locationSearch).then((response) =>{
        response.json().then((data) =>{
            if (data.error){
                console.log(data.error)
            }
            else{                
                messageOne.textContent = 'Weather in: ' + data.location + ' is ' + data.forecast + ', temperature is: ' + data.temperature + 'ºC'
            }
        })
    })
})