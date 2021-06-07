import { autoComplete } from "../_global/global"


if(location.href.indexOf('education') != -1){



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
        location.replace("/applicant/education")
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

    //CSS
    let edu_input = document.getElementsByClassName("form-control")
    for(let i= 0; i<edu_input.length; i++){
        edu_input[i].classList.add("eduinp")
    }

    //for Image header
    document.getElementById("education-img-header").classList.remove("d-none")

    let mods = document.getElementsByClassName("requiredField")
    for(let i=0; i<mods.length; i++)
    {
        mods[i].classList.remove("text-white")
    }
   
}