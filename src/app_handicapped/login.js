import { speech_ai } from "./../_factories/speech_ai"
if(location.href.indexOf('handicapped/login') != -1 ||  location.href.indexOf('handicapped/signup') != -1 ){
    
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