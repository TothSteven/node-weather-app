console.log('Client side js file loaded')

const weatherform = document.querySelector('form')
const serarch = document.querySelector('input')

const message1 = document.getElementById('text1')
const message2 = document.getElementById('text2')
const message3 = document.getElementById('text3')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = serarch.value

    message1.textContent = ''
    message2.textContent = '... Loading'
    message3.textContent = ''

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{

        response.json().then((data)=>{
            
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
                message3.textContent = ''
            }else{
                message1.textContent = ''
                message2.textContent = 'Location: '+data.location
                message3.textContent = 'Forecast: '+data.forecast
            }
            console.log(data)        
        })

    })
})