import { autoComplete } from "../_global/global"
import { speech_ai } from "./../_factories/speech_ai"

if(location.href.indexOf('edtwo') != -1){



     let qualification_suggestion = null
     autoComplete("id_qualification", qualification_suggestion, "qualification")

     let fieldofstudy_suggestion = null
     autoComplete("id_field_of_study", fieldofstudy_suggestion, "field_of_study")

     let major_suggestion = null
     autoComplete("id_major", major_suggestion, "major")
     
     let university_suggestion = null
     autoComplete("id_university", university_suggestion, "university")
    
     let university_location_suggestion = null
     autoComplete("id_university_location", university_location_suggestion, "location")


    //Checks if the user has education data. If none, the add education form will be hidden
    if(document.getElementById("div-education-list") == null){
        document.getElementById("div-education-form").classList.remove("d-none")
        document.getElementById("cancel-education-form").classList.add("d-none")
    }

    else{
       //Event Listener for Add Education Btn:
    document.getElementById("btn-add-education").addEventListener("click", function(){
        this.classList.add("d-none")
        document.getElementById("div-education-form").classList.remove("d-none")
    })
    
    //Event Listener for Cancel Education Btn:
    document.getElementById("cancel-education-form").addEventListener("click", function(){
        location.replace("/handicapped/pwd-edtwo")
    })

    }

    //Check if the user is editing education record
    if(location.href.indexOf('edit') != -1){
        document.getElementById("div-education-form").classList.remove("d-none")
        document.getElementById("div-education-list").classList.add("d-none")
    }
    
  
    
   

    //Event Listener for Delete Education Btn:
    let delete_btn_array = document.getElementsByClassName("btn-delete-education")
    for(let i = 0; i<delete_btn_array.length; i++){
        delete_btn_array[i].addEventListener("click", function(){
            $("#modal-delete").modal("show")
            document.getElementById("modal-title-delete").textContent = "Delete Education Info"
            document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Education Information?"
            let link_href = this.getAttribute("data-link")
            document.getElementById("form-delete").setAttribute("action", link_href)
        })
    }


    //speech recognition
     //Singleton Design Pattern
     let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'graduation date': 'id_graduation_date',
            'university': 'id_university',
            'qualification': 'id_qualification',
            'university location': 'id_university_location',
            'field_of_study': 'id_field_of_study',
            'major': 'id_major',
            'grade': 'id_grade',
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