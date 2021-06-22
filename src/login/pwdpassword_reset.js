import { speech_ai } from "./../_factories/speech_ai"
let tts = window.speechSynthesis
if((location.href == "http://127.0.0.1:8000/login/handicapped/password_reset/")){

    
    
    let home= document.getElementById("nav-home")
    home.getAttribute("href")
    home.setAttribute("href", "/handicappe/login")
    let logo= document.getElementById("skillfind-logo")
    logo.getAttribute("href")
    logo.setAttribute("href", "/handicapped/login")
  
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")

    document.getElementById("id_email").classList.add("form-control")
    document.getElementById("id_email").classList.add("pass-reset-input")
    document.getElementById("id_email").focus()
    
    let command = "your in password reset page. currently your in eamil field, just say your email to input its value. Then you can say the command, submit email to continue"
    let speech = new SpeechSynthesisUtterance(command)  
    tts.speak(speech)

    let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'email': 'id_email',
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
     
    

}


else if(location.href.indexOf('password_reset_confirm') != -1){

    document.getElementById("id_new_password1").classList.add("form-control")
    document.getElementById("id_new_password1").classList.add("pass-reset-input")
    document.getElementById("id_new_password2").classList.add("form-control")
    document.getElementById("id_new_password2").classList.add("pass-reset-input")

    let command = "your in password confirm page. currently your in first password field, just say your desired new password to input its value. Then it will authomaticaly navigate to the password repeat field. you can say the command, submit new password to continue"
    let speech = new SpeechSynthesisUtterance(command)  
    tts.speak(speech)

    let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'new password': 'id_new_password1',
            'repeat password': 'id_new_password2'
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

}