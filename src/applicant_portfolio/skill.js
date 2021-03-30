if(location.href.indexOf('skills') != -1){
    //Checks if the user has skills data. If none, the add language form will be hidden
    if(document.getElementById("div-skill-list") == null){
        document.getElementById("div-skill-form").classList.remove("d-none")
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
    
    //Event Listener for Cancel Skill Form Btn:
    document.getElementById("cancel-education-form").addEventListener("click", function(){
        location.replace(this.getAttribute("name"))
    })

    //Event Listener for Delete Education Btn:
    let delete_btn_array = document.getElementsByClassName("btn-delete-skill")
    for(let i = 0; i<delete_btn_array.length; i++){
        delete_btn_array[i].addEventListener("click", function(){
            $("#modal-delete").modal("show")
            document.getElementById("modal-title-delete").textContent = "Delete Skill"
            document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Skill?"
            let link_href = this.getAttribute("data-link")
            document.getElementById("form-delete").setAttribute("action", link_href)
        })
    }
}