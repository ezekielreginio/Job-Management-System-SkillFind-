import { speech_ai } from "./../_factories/speech_ai"
if(location.href.indexOf('handicapped/signup') != -1 ){
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")

    document.getElementById("login-title").innerHTML = "Welcome!"
    
    $(document).ready(function() {
       
        $("#id_first_name").focus()

        
    });
    
    let tts = window.speechSynthesis

    let command = "Hello. wellcome to skill find signup page. The available fields are first name. last name. email. password, password again. Currently your in first name field, just say your first name to input its value, after that it will automaticaly navigate to the next field. If you want to navigate to the fields individualy you can say the commands. first name. last name. email. password. password again. Then you can say the command sign up for you to sign up"
    let speech = new SpeechSynthesisUtterance(command)  
    tts.speak(speech)

    
     

    
    //Singleton Design Pattern
    let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'email login': 'id_login',
            'password login': 'id_password',
            'first name': 'id_first_name',
            'last name': 'id_last_name',
            'email': 'id_email',
            'password': 'id_password1',
            'password again': 'id_password2'


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