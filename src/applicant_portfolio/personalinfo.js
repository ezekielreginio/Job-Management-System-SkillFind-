if(location.href.indexOf('personal_info') != -1){

    if(document.getElementById("div-personal-info-list") == null){
       document.getElementById("div-personal-info-form").classList.remove("d-none")
    }

    else{
        document.getElementById("div-personal-info-form").classList.add("d-none")
    }

    let mods = document.getElementsByClassName("requiredField")
    for(let i=0; i<mods.length; i++)
    {
        mods[i].classList.remove("text-white")

    }

    let edu_input = document.getElementsByClassName("form-control")
    for(let i= 0; i<edu_input.length; i++){
        edu_input[i].classList.add("blank")
    }
     
}

