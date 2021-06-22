import { speech_ai } from "./../_factories/speech_ai"
if(location.href.indexOf('handicapped/index') != -1 ){
    let home= document.getElementById("nav-home")
    home.getAttribute("href")
    home.setAttribute("href", "/handicapped/index")
    let logo= document.getElementById("skillfind-logo")
    logo.getAttribute("href")
    logo.setAttribute("href", "/handicapped/index")
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")

    let tts = window.speechSynthesis

    let command = "Hello. your in home page, the commands are available is edit portfolio, resume, command list, and application status. say edit portfolio, for you to open your portfolio page. say resume, for you to upload your resume. say command list, to view list of commands. say application status for you to view your application status"
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