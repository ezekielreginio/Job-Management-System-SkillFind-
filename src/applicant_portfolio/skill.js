import { autoComplete } from "../_global/global"

if(location.href.indexOf('skills') != -1){

    let skill_suggestion = null
    autoComplete("id_skill", skill_suggestion, "skill")

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
        location.replace("/applicant/skills")
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
      
}