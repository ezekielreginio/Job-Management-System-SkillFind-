import { speech_ai } from "./../_factories/speech_ai"
if(location.href.indexOf('handicapped/login') != -1 ||  location.href.indexOf('handicapped/signup') != -1 ){
    
    //Singleton Design Pattern
    let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'email': 'id_login',
            'password': 'id_password',
            'first name': 'id_first_name',
            'last name': 'id_last_name',

        }

        function EventBubble(){
           
        }

        

        //Public Members
        return{
            getInstance: ()=>{
                EventBubble()
                let speech_ai_instance = speech_ai.getInstance(fields)
            }
            
        }
    })()

    let login_handicapped_instance = login_handicapped_singleton.getInstance()

    
    // let fields = [
    //     {
    //         'command': 'email',
    //         'field': 'id_login'
    //     },
    //     {
    //         'command': 'password',
    //         'field': 'id_password'
    //     }
    // ]



  
    // const text = document.querySelector('.form-control')

    // window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


    // const recognition = new window.SpeechRecognition()
    // recognition.interimResults = true

    

    // recognition.addEventListener("result", (e)=> {
    //     const text = Array.from(e.results)
    //     .map(result => result[0])
    //     .map(result => result.transcript)
    //     .join('')
    //     let tts = window.speechSynthesis
       
    //     console.log(text)

    //     if(text=="email"){
    //         document.getElementById("id_login").focus() 
    //         let command = "your in email field"
    //         let speech = new SpeechSynthesisUtterance(command)  
    //         tts.speak(speech)
            
            
    //     }

    //     if(text=="password"){
    //         document.getElementById("id_password").focus()
    //         let command = "your in password field"
    //         let speech = new SpeechSynthesisUtterance(command)   
    //         tts.speak(speech)
            
    //     }



    // })

    // recognition.addEventListener("end", ()=>{
    //     recognition.start()
    // })
    

    // recognition.start()


    // window.onunload = function(event)
    // {
    //     recognition.stop()
    // };
    
      
}