import { speech_ai } from "./../_factories/speech_ai"
if(location.href.indexOf('handicapped/login') != -1){
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")
    
    $(document).ready(function() {
       
        $("#id_login").focus()
        

        
    });
    
    let tts = window.speechSynthesis

    let command = "Hello. welcome to skill find login page, the fields that are available is email login, and password login, your currently in email login field. just say your eamil to input its value. And it will automaticaly navigate to the next field. If you want to navigate to the fields individualy, just say the commands, email login, or password login, Then, you can say the command login for you to login"
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
            'password again': 'id_password2',
            'search': 'pwdinput-searchbar'


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