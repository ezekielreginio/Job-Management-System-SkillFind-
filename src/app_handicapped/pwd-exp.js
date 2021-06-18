import { speech_ai } from "./../_factories/speech_ai"
const moment = require("moment")
const { create_input, AJAX, csrftoken, autoComplete } = require("../_global/global")
const autocomplete = require('autocompleter');
const { isinvalid } = require("../_global/validation");

if(location.href.indexOf('eeone') != -1){

    let position_title_suggestion = null
    autoComplete("id_position_title", position_title_suggestion, "position_title")

    let company_name_suggestion = null
    autoComplete("id_company_name", company_name_suggestion, "company_name")

    let specialization_suggestion = null
    autoComplete("id_specialization", specialization_suggestion, "specialization")

    let role_suggestion = null
    autoComplete("id_role", role_suggestion, "role")

    let industry_suggestion = null
    autoComplete("id_industry", industry_suggestion, "industry")

    let position_level_suggestion = null
    autoComplete("id_position_level", position_level_suggestion, "position_level")

    let salary_currency_suggestion = null
    autoComplete("id_salary_currency", salary_currency_suggestion, "salary_currency")

    
    //show portfolio button
    
    

    //radio button 3
    if(document.getElementById("id_experience_level_3").checked){
        document.getElementById("experience-duration").classList.remove("d-none")
    }
    
    function radiobutton_listener(){
        document.querySelectorAll('.custom-control-input').forEach(function(x){
            x.addEventListener("change", function(){
                if(document.getElementById("id_experience_level_3").checked){
                    document.getElementById("experience-duration").classList.remove("d-none")
                }
                else{
                    document.getElementById("experience-duration").classList.add("d-none")
                    document.getElementById("id_duration_year").value = ''
                    document.getElementById("id_duration_month").value = ''
                }   
            })
        })
        document.getElementById("submit-id-save").addEventListener("click", (e)=>{
            if(document.getElementById("id_experience_level_3").checked){
                e.preventDefault()
                let flag = true

                if(document.getElementById("id_duration_year").value == ""){
                    flag = false
                    field_year = document.getElementById("id_duration_year")
                    field_year.classList.add("is-invalid")
                    isinvalid(field_year, "Invalid Input")
                }
                if(document.getElementById("id_duration_month").value == ""){
                    flag = false
                    field_month = document.getElementById("id_duration_month")
                    field_month.classList.add("is-invalid")
                    isinvalid(field_month, "Invalid Input")
                }

                if(flag){
                    document.getElementById("experiencelevel-form").submit()
                }
            }
        }) 
    }
    
      
    //Event Listener for Cancel Experience Btn:
    document.getElementById("cancel-experience-form").addEventListener("click", function(){
        location.replace("/handicapped/pwd-1")
    })
    //Event Listener for Cancel Experience level Btn:
    document.getElementById("cancel-experiencelevel-form").addEventListener("click", function(){
        location.replace("/handicapped/pwd-eeone")
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

        radiobutton_listener()
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
 

    //speech recognition
     //Singleton Design Pattern
     let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
            'position title': 'id_position_title',
            'company name': 'id_company_name',
            'start date': 'id_start_date',
            'end date': 'id_end_date',
            'specialization': 'id_specialization',
            'role': 'id_role',
            'country': 'id_country',
            'industry': 'id_industry',
            'position level': 'id_position_level',
            'salary currency': 'id_salary_currency',
            'salary': 'id_salary',
            'experience description': 'id_experience_description',


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
