const moment = require("moment")
const { create_input } = require("../_global/global")

if(location.href.indexOf('experience') != -1){

    //Experience Level Validator:
    if(document.getElementById("experience-level-desc").textContent == 'None'){
        document.getElementById("experience-level").classList.add("d-none")
        document.getElementById("experience-level-form").classList.remove("d-none")
    }

    //Edit Experience Indicator
    if(location.href.indexOf('edit') != -1){
        document.getElementById("div-experience-form").classList.remove("d-none")
        try{
            document.getElementById("div-experience-list").classList.add("d-none")
        }
        catch{
            
        }
    }

    if(document.getElementById("div-experience-list") == null){
        document.getElementById("div-experience-form").classList.remove("d-none")
        document.getElementById("cancel-experience-form").classList.add("d-none")
    }
    else{
        document.getElementById("btn-add-experience").addEventListener("click", function(){
            this.classList.add("d-none")
            document.getElementById("div-experience-form").classList.remove("d-none")
        })
        document.getElementById("cancel-experience-form").addEventListener("click", function(){
            document.getElementById("div-experience-form").classList.add("d-none")
            document.getElementById("btn-add-experience").classList.remove("d-none")
        })

        let experience_list = document.getElementsByClassName("experience-record")
        for (var i = 0; i < experience_list.length; i++) {
            let end_date = moment(document.getElementsByClassName("experience-enddate")[i].getAttribute("value"))
            let start_date = moment(document.getElementsByClassName("experience-startdate")[i].getAttribute("value"))
            
            //var duration = end_date.diff(start_date, "months");
            
            let years = end_date.diff(start_date, 'year')
            start_date.add(years, 'years')
            
            let months = end_date.diff(start_date, 'months')
            start_date.add(months, 'months')

            let y_str= ""
            let m_str = ""
            if(years >= 1)
                if(years == 1)
                    y_str = years+" year "
                else
                    y_str = years+" years "
            if(months >= 1)
                if(months == 1)
                    m_str = months+" month"
                else
                    m_str = months+" months"
            console.log(y_str + m_str)
            document.getElementsByClassName("experience-span")[i].textContent = y_str + m_str
         }
    }

    document.getElementById("edit-experience-level").addEventListener("click", function(){
        document.getElementById("experience-level").classList.add("d-none")
        document.getElementById("experience-level-form").classList.remove("d-none")

        document.querySelectorAll('.custom-control-input').forEach(function(x){
            x.addEventListener("change", function(){
                if(x.value == "1"){
                    document.getElementById("experience-duration").classList.remove("d-none")
                }
                else{
                    document.getElementById("experience-duration").classList.add("d-none")
                    document.getElementById("id_duration_year").value = ''
                    document.getElementById("id_duration_month").value = ''
                }
                    
            })
        })
    })

    //Event Listeners for Delete Experience Buttons
    let delete_btn_array = document.getElementsByClassName("delete-experience")
    for(let i = 0; i<delete_btn_array.length; i++){
        delete_btn_array[i].addEventListener('click', function(){
            $("#modal-delete").modal("show")
            document.getElementById("modal-title-delete").textContent = "Delete Experience Record"
            document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Experience Record?"
            let link_href = this.getAttribute("data-link")
            document.getElementById("form-delete").setAttribute("action", link_href)
        });
     }
    // document.getElementById("btn-delete-experience").addEventListener("click", function(){
    //     $("#modal-delete").modal("show")
    //     document.getElementById("modal-title-delete").textContent = "Delete Experience Record"
    //     document.getElementById("modal-body-delete").textContent = "Are You Sure You Want To Delete This Experience Record?"
    //     let link_href = this.getAttribute("data-link")
    //     document.getElementById("modal-btn-delete").setAttribute("href", link_href)
    // })
    
    //Script for CSS
    let input_text = document.getElementsByClassName("textInput")
    for(let i = 0; i<input_text.length; i++){
        input_text[i].classList.add("text_Input")
        
    }
    
    let ExperienceLevel_label = document.getElementsByClassName("custom-control-label")
    for(let i = 0; i<ExperienceLevel_label.length; i++){
        ExperienceLevel_label[i].classList.add("exlabel")
        
    }

    let Input_date = document.getElementsByClassName("dateinput")
    for(let i = 0; i<Input_date.length; i++){
        Input_date[i].classList.add("date_Input")
        
    }

    let ex_textarea = document.getElementsByClassName("textarea")
    for(let i = 0; i<ex_textarea.length; i++){
        ex_textarea[i].classList.add("date_Input")
    }
    
}
