const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationSearch = search.value

    fetch('/weather?address=' + locationSearch).then((response) =>{
        response.json().then((data) =>{
            if (data.error){
                console.log(data.error)
            }
            else{                
                messageOne.textContent = 'Weather in: ' + data.location + ' is ' + data.forecast + ', temperature is: ' + data.temperature + 'ºC, humidity is ' + data.humidity + '%'
            }
        })
    })
})