import { speech_ai } from "./../_factories/speech_ai"
import { autoComplete } from "../_global/global"

if(location.href.indexOf('sltree') != -1){
    let home= document.getElementById("nav-home")
   home.getAttribute("href")
   home.setAttribute("href", "/handicapped/index")
   let logo= document.getElementById("skillfind-logo")
   logo.getAttribute("href")
   logo.setAttribute("href", "/handicapped/index")
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")
    let skill_suggestion = null
    autoComplete("id_skill", skill_suggestion, "skill")

    let tts = window.speechSynthesis
    let command = "Hello. your in skill page, the commands that are available are, add skill, submit skill, and cancel skill. say add skill, for you to add skill. say submit skill, for you to submit your skill form. say cancel skill for you to cancel adding skill"
    let speech = new SpeechSynthesisUtterance(command)  
    tts.speak(speech)

    //Checks if the user has skills data. If none, the add language form will be hidden
    if(document.getElementById("div-skill-list") == null){
        document.getElementById("div-skill-form").classList.remove("d-none")
        document.getElementById("cancel-skill-form").classList.add("d-none")
    }

    //Checks if URL is in edit skill
    if(location.href.indexOf('edit') != -1){
        document.getElementById("div-skill-form").classList.remove("d-none")
    }

    //Event Listeners:

    //Event Listener for Add Skill Btn:
    document.getElementById("btn-add-skill").addEventListener("click", function(){
        this.classList.add("d-none")
        document.getElementById("div-skill-form").classList.remove("d-none")
        
    })

    document.getElementById("cancel-skill-form").addEventListener("click", function(){
        location.replace("/handicapped/pwd-sltree")
    })


    
    

    //Event Listener for Delete Skill Btn:
    let delete_btn_skill = document.getElementsByClassName("btn-delete-skill")
    for(let i = 0; i<delete_btn_skill.length; i++){
        delete_btn_skill[i].addEventListener("click", function(){
            $("#modal-delete").modal("show")
            document.getElementById("modal-title-delete").textContent = "Delete Skill"
            document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Skill?"
            let link_href = this.getAttribute("data-link")
            document.getElementById("form-delete").setAttribute("action", link_href)
        })
    }

     //speech recognition
     //Singleton Design Pattern
     let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'skill name': 'id_skill',
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