import { autoComplete } from "../_global/global"
import { speech_ai } from "./../_factories/speech_ai"

if(location.href.indexOf('llfour') != -1){

    let language_suggestion = null
    autoComplete("id_language", language_suggestion, "language")

    let proficiency_suggestion = null
    autoComplete("id_proficiency", proficiency_suggestion, "proficiency")
    

    //Checks if the user has languages data. If none, the add language form will be hidden
    if(document.getElementById("div-language-list") == null){
        document.getElementById("div-language-form").classList.remove("d-none")
        document.getElementById("cancel-language-form").classList.add("d-none")
    }

    //Checks if URL is in edit skill
    if(location.href.indexOf('edit') != -1){
        document.getElementById("div-language-form").classList.remove("d-none")
    }

    //Event Listeners:

    //Event Listener for Add Skill Btn:
    document.getElementById("btn-add-language").addEventListener("click", function(){
        this.classList.add("d-none")
        document.getElementById("div-language-form").classList.remove("d-none")
    })

    document.getElementById("cancel-language-form").addEventListener("click", function(){
        location.replace("/handicapped/pwd-llfour")
    })
    
   

    //Event Listener for Delete Education Btn:
    let delete_btn_array = document.getElementsByClassName("btn-delete-language")
    for(let i = 0; i<delete_btn_array.length; i++){
        delete_btn_array[i].addEventListener("click", function(){
            $("#modal-delete").modal("show")
            document.getElementById("modal-title-delete").textContent = "Delete Language"
            document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Language?"
            let link_href = this.getAttribute("data-link")
            document.getElementById("form-delete").setAttribute("action", link_href)
        })
    }

  
    //speech recognition
     //Singleton Design Pattern
     let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'l name': 'id_language',
            'proficiency': 'id_proficiency',
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