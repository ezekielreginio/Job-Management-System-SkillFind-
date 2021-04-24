const moment = require("moment")
const { create_input, AJAX, csrftoken, autoComplete } = require("../_global/global")
const autocomplete = require('autocompleter');

if(location.href.indexOf('experience') != -1){

    //Experience Level radio button 3
       

    if(document.getElementById('id_experience_level_3').checked){   
        document.getElementById("experience-duration").classList.remove("d-none")
        document.getElementById("submit-id-submit").type = "button"
        document.getElementById("submit-id-submit").addEventListener("click", function(e){
            e.preventDefault()
         })
    }
    else{
        document.getElementById("experience-duration").classList.add("d-none")
    } 
    
      
    //Event Listener for Cancel Experience Btn:
    document.getElementById("cancel-experience-form").addEventListener("click", function(){
        location.replace("/applicant/experience")
    })
    //Event Listener for Cancel Experience level Btn:
    document.getElementById("cancel-experiencelevel-form").addEventListener("click", function(){
        location.replace("/applicant/experience")
    })

   
     


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
        document.getElementById("cancel-experience-btn").classList.add("d-none")
    }
    else{
        document.getElementById("btn-add-experience").addEventListener("click", function(){
            this.classList.add("d-none")
            document.getElementById("div-experience-form").classList.remove("d-none")
            document.getElementById("cancel-experience-form").classList.add("d-none")
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
    

    let position_title_suggestion = null
    autoComplete("id_position_title",position_title_suggestion,"position_title")

    let company_name_suggestion = null
    autoComplete("id_company_name",company_name_suggestion,"company_name")

    let specialization_suggestion = null
    autoComplete("id_specialization",specialization_suggestion,"specialization")
    // field_position_title.addEventListener("focus", function(){
    //     if(position_title_suggestion == null){
    //         console.log("hello")
    //         AJAX({
    //             "method":"POST",
    //             "action": "/autocomplete?fieldname=position_title",
    //             "body": "#",
    //             "token": csrftoken,
    //             "function": function(response){
    //                 if(response.status == 200){
    //                     response.json().then(json => {
    //                         let data = JSON.parse(json['data'])
    //                         position_title_suggestion = [];
    //                         data.forEach((record)=>{
    //                             console.log(record['fields']['data'])
    //                             position_title_suggestion.push({label: record['fields']['data'], value: record['fields']['data']})
    //                         })
    //                         autocomplete({
    //                             input: field_position_title,
    //                             fetch: function(text, update) {
    //                                 text = text.toLowerCase();                                  
    //                                 var suggestions = position_title_suggestion.filter(n => n.label.toLowerCase().startsWith(text))
    //                                 update(suggestions);
    //                             },
    //                             onSelect: function(item) {
    //                                 field_position_title.value = item.label;
    //                             }
    //                         });
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // })
    // AJAX({
    //     "method":"POST",
    //     "action": "/autocomplete",
    //     "body": "#",
    //     "token": csrftoken,
    //     "function": function(response){
    //         if(response.status == 200){
    //             response.json().then(json => {
    //                 let data = JSON.parse(json['data'])
    //                 let position_title = [];
    //                 data.forEach((record)=>{
    //                     console.log(record['fields']['data'])
    //                     position_title.push({label: record['fields']['data'], value: record['fields']['data']})
    //                 })
    //                 autocomplete({
    //                     input: field_position_title,
    //                     fetch: function(text, update) {
    //                         text = text.toLowerCase();
                            
    //                         var suggestions = position_title.filter(n => n.label.toLowerCase().startsWith(text))
    //                         update(suggestions);
    //                     },
    //                     onSelect: function(item) {
    //                         field_position_title.value = item.label;
    //                     }
    //                 });
    //             })
    //         }
    //     }
    // })

    

    //Script for CSS
    let input_text = document.getElementsByClassName("textInput")

    document.getElementById("nav-applicant-experience").classList.add("nav-applicant-active")

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

    let ex_start = document.getElementsByClassName("experience-startdate")
    for(let i = 0; i<ex_start.length; i++){
        ex_start[i].classList.add("applicant-text-color")
    }

    let ex_end = document.getElementsByClassName("experience-enddate")
    for(let i = 0; i<ex_end.length; i++){
        ex_end[i].classList.add("applicant-text-color")
    }

    let ex_info = document.getElementsByClassName("col-8")
    for(let i = 0; i<ex_info.length; i++){
        ex_info[i].classList.add("ex-info")
    }

    let ex_level = document.getElementsByClassName("col-3")
    for(let i = 0; i<ex_level.length; i++){
        ex_level[i].classList.add("applicant-text-color")
    }

    let ex_info_label = document.getElementsByClassName("col-4")
    for(let i = 0; i<ex_info_label.length; i++){
        ex_info_label[i].classList.add("applicant-text-color")
    }

    //for img header
    document.getElementById("experience-img-header").classList.remove("d-none")
    
}
