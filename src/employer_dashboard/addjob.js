import { hide, select_borders, radio_borders, show, page_navigation, AJAX, csrftoken, isEmpty } from "../_global/global";

if(location.href.indexOf('employer/addjob') != -1){
    let prev_btn_list = document.getElementsByClassName("btn-prev-job")
    let next_btn_list = document.getElementsByClassName("btn-next-job")
    
    page_navigation(next_btn_list)
    page_navigation(prev_btn_list)


    for(let i = 0; i<prev_btn_list.length; i++){
        prev_btn_list[i].addEventListener("click", function(){
            this.parentElement.classList.add("d-none")
            
            let prev_page = this.getAttribute("data-prev-page")
            document.getElementById(prev_page).classList.remove("d-none")    
            
        })
    }

    //Yes No Option for accepting handicapped option
    yes_no_hidden_option("id_accept_handicapped", "div_id_accepted_handicapped_types", "accepted_handicapped_types")
    
    //Yes No Option for starting date option
    yes_no_hidden_option("id_date_prompt", "div_id_start_date", "start_date")

    //Yes No Option for starting date option
    yes_no_hidden_option("id_application_resume", "div_id_application_deadline", "application_deadline")


    

    //Qualification Card for Edit Function
    let qualification_ctr = 1
    // try{
    //     document.getElementsByName("qualification-experience")[0].remove()
    //     // if(!isEmpty(data_qualification_experience) && !isEmpty(data_qualification_education) && !isEmpty(data_qualification_license) && !isEmpty(data_qualification_language) && !isEmpty(data_qualification_location)){
    //     //     document.getElementsByName("qualification-experience")[0].remove()
    //     // }

    //     for (const [key, value] of Object.entries(data_qualification_experience)) {
    //         qualification_ctr++
    //         let qualification_template =  create_qualification_template("Experience", qualification_ctr)
    //         console.log(qualification_template)
    //         qualification_template.querySelector("[name='year']").value = value['year']
    //         qualification_template.querySelector("[name='experience']").value = value['name']
    //         qualification_template.querySelector("[name='required-preferred']").value = value['required']

    //         document.getElementById("p5-container").appendChild(qualification_template)
    //     }

        
    // }
    // catch(e){

    // }

    //Event Listeners:
    
    //Close Qualification Card Event Listener:
    document.getElementById("p5-container").addEventListener("click", (e)=>{
        if(e.target.getAttribute("name") == "card-close"){
            e.target.parentElement.parentElement.parentElement.remove()
            qualification_ctr--
        }
    })

    document.getElementById("p5-container").addEventListener("change", (e)=>{
        if(e.target.getAttribute("name") == "select-level-education"){
            let div_container = e.target.nextElementSibling
            if(e.target.value == "Senior High School"){
                div_container.innerHTML = `
                <h6>SHS Strand 
                    <select class="custom-form-input m-2 p-2" name="major">
                        <option value="STEM">STEM</option>
                        <option value="ABM">ABM</option>
                        <option value="HUMMS">HUMMS</option>
                        <option value="GAS">GAS</option>
                        <option value="ICT">ICT</option>
                        <option value="ICT">Industrial Arts</option>
                        <option value="Home Economics">Home Economics</option>
                    </select>
                </h6>
                `
                
            }

            else if(e.target.value == "Bachelor" || e.target.value == "Master" || e.target.value == "Doctorate"){
                div_container.innerHTML = `
                <h6>Major in 
                <input type="text" class="custom-form-input m-2 p-2" name="major">
                </h6>
                `
            }
            else{
                div_container.innerHTML = ``
            }
        }
    })

    //Add qualification event listener:
    document.getElementById("dropdown-add-qualification").addEventListener("click", (e)=>{
        qualification_ctr++
        let selected_option = e.target.textContent
        let qualification_template = create_qualification_template(selected_option, qualification_ctr)
        
        document.getElementById("p5-container").appendChild(qualification_template)
        
    })


    function create_qualification_template(selected_option, qualification_ctr){
        let qualification_template = document.getElementsByClassName("qualification-template")[0].cloneNode(true)
        qualification_template.classList.remove("d-none")
        qualification_template.querySelectorAll("[name='qualification_required']").forEach((e)=>{ e.setAttribute("name", "qualification_required"+qualification_ctr) })
        qualification_template.querySelector("#qualification-header").textContent = selected_option
        
        if(selected_option == "Experience"){
            qualification_template.setAttribute("name", "qualification-experience")
        }
        else if(selected_option == "Education"){
            qualification_template.setAttribute("name", "qualification-education")
            qualification_template.querySelector("#qualification-body").innerHTML = `
                <h6>Level of Education 
                    <select class="custom-form-input m-2 p-2" name="select-level-education">
                        <option value="Elementary">Elementary/Primary School</option>
                        <option value="Junior High School">Junior High School</option>
                        <option value="Senior High School">Senior High School</option>
                        <option value="Bachelor">Bachelor Degree</option>
                        <option value="Master Degree">Master Degree</option>
                        <option value="Doctorate">Doctorate</option>
                    </select>
                    <div name="education-specific-info"></div>
                </h6>
            `
        }
    
        else if(selected_option == "License"){
            qualification_template.setAttribute("name", "qualification-license")
            qualification_template.querySelector("#qualification-body").innerHTML = `
                <h6>Valid <input type="text" class="custom-form-input m-2 p-2" name="license"> license or certification </h6>
            `
        }
    
        else if(selected_option == "Language"){
            qualification_template.setAttribute("name", "qualification-language")
            qualification_template.querySelector("#qualification-body").innerHTML = `
                <h6>Speaks the following language: <input type="text" class="custom-form-input m-2 p-2" name="language"></h6>
            `
        }
    
        else if(selected_option == "Location"){
            qualification_template.setAttribute("name", "qualification-location")
            qualification_template.querySelector("#qualification-body").innerHTML = `
                <h6>Located in `+document.getElementById("id_location").value+`</h6>
            `
        }

        return qualification_template
    }
    
    //Post Job Btn  
    document.getElementById("btn-post-job").addEventListener("click", (e)=>{
        let qualification_experience = {}
        let qualification_education = {}
        let qualification_license = {}
        let qualification_language = {}
        let qualification_location = null

        
        let experience_data = document.getElementsByName("qualification-experience")
        let education_data = document.getElementsByName("qualification-education")
        let license_data = document.getElementsByName("qualification-license")
        let language_data = document.getElementsByName("qualification-language")
        try{
            qualification_location = document.getElementsByName("qualification-location")[0].querySelector("[name='required-preferred']").value
        }
        catch(e){}

        for(let i=0; i<experience_data.length; i++){
            qualification_experience[i]={
                "year": experience_data[i].querySelector("[name='year']").value,
                "name": experience_data[i].querySelector("[name='experience']").value,
                "required": experience_data[i].querySelector("[name='required-preferred']").value,
            }
        }

        for(let i=0; i<education_data.length; i++){
            let major = null
            try{
                major = education_data[i].querySelector("[name='major']").value
            }
            catch(e){}
            qualification_education[i]={
                "level": education_data[i].querySelector("[name='select-level-education']").value,
                "major": major,
                "required": education_data[i].querySelector("[name='required-preferred']").value,
            }
        }

        for(let i=0; i<license_data.length; i++){
            qualification_license[i]={
                "license": license_data[i].querySelector("[name='license']").value,
                "required": license_data[i].querySelector("[name='required-preferred']").value,
            }
        }
        
        for(let i=0; i<language_data.length; i++){
            qualification_language[i]={
                "language": language_data[i].querySelector("[name='language']").value,
                "required": language_data[i].querySelector("[name='required-preferred']").value,
            }
        }

        let data = {
            "qualification_experience": qualification_experience,
            "qualification_education": qualification_education,
            "qualification_license": qualification_license,
            "qualification_location": qualification_location,
            "qualification_language": qualification_language,
        }


        let formdata_joblist = new FormData(document.getElementById("form-add-job"))
        
        formdata_joblist.append("qualifications", JSON.stringify(data))
        
        AJAX({
            "method":"POST",
            "action": "./addjob",
            "body": formdata_joblist,
            "token": csrftoken,
            "function": function(response){
                if(response.status == 200){
                    response.json().then(json => {
                        location.replace("/employer/jobspanel")
                    })
                }
            }
        })
    })
    
    //Functions:
    function yes_no_hidden_option(yesno_field, hidden_target, target_fieldname){
        document.getElementById(yesno_field).addEventListener("change", (e)=>{
            if(e.target.value == "true"){
                document.getElementById(hidden_target).classList.remove("d-none")
                
                document.getElementById(hidden_target).querySelectorAll('[name="'+target_fieldname+'"]').forEach((e)=>{
                    e.setAttribute("data-required", "True")
                })
            }
                
            else if(e.target.value == "false"){
                document.getElementById(hidden_target).classList.add("d-none")
                document.getElementById(hidden_target).querySelectorAll('[name="'+target_fieldname+'"]').forEach((e)=>{
                    e.checked = false
                    e.setAttribute("data-required", "False")
                })
            }
                
        })
    }
    //Scripts for Add Job CSS Styling

    //CSS for handicapped types
    document.getElementById("div_id_accepted_handicapped_types").classList.add("d-none")

    //CSS for multi select borders
    let multi_checkbox = document.getElementsByClassName("custom-checkbox")
    let multi_radio = document.getElementsByClassName("custom-radio")
    select_borders(multi_checkbox)
    let yes_opt = null


    //Start Date CSS
    document.getElementById("div_id_start_date").firstElementChild.remove()
    document.getElementById("id_start_date").setAttribute("placeholder", "Start Date (MM/DD/YYYY)")
    document.getElementById("id_start_date").classList.add("w-50")
    document.getElementById("id_start_date").addEventListener("focus", function(){
        this.setAttribute("type", "date")
    })
    hide("div_id_start_date")

    //Application Deadline CSS
    document.getElementById("id_application_deadline").classList.add("w-50")
    document.getElementById("id_application_deadline").setAttribute("data-required", "True")
    //hide("div_id_application_deadline")
    
}
//Improvement of create_qualification_template (Module Design Pattern)
export var create_qualification = (()=>{
    //private members:
    
    function clone_template(){
        let qualification_template = document.getElementsByClassName("qualification-template")[0].cloneNode(true)
        qualification_template.classList.remove("d-none")
        qualification_template.querySelectorAll("[name='qualification_required']").forEach((e)=>{ e.setAttribute("name", "qualification_required") })
        return qualification_template
    }

    function add_experience(){
        let qualification_experience = clone_template()
        qualification_experience.querySelector("#qualification-header").textContent = "Experience"
        qualification_experience.setAttribute("name", "qualification-experience")
        return qualification_experience
    }

    function add_education(){
        let qualification_education = clone_template()
        qualification_education.querySelector("#qualification-header").textContent = "Education"
        qualification_education.setAttribute("name", "qualification-education")
        qualification_education.querySelector("#qualification-body").innerHTML = `
            <h6>Level of Education 
                <select class="custom-form-input m-2 p-2" name="select-level-education">
                    <option value="Elementary">Elementary/Primary School</option>
                    <option value="Junior High School">Junior High School</option>
                    <option value="Senior High School">Senior High School</option>
                    <option value="Bachelor">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Doctorate">Doctorate</option>
                </select>
                <div name="education-specific-info">
                    
                </div>
            </h6>
        `
        return qualification_education
    }

    function add_location(){
        let qualification_location = clone_template()
        qualification_location.querySelector("#qualification-header").textContent = "Location"
        qualification_location.setAttribute("name", "qualification-location")
        qualification_location.querySelector("#qualification-body").innerHTML = `
            <h6>Located in `+document.getElementById("id_location").value+`</h6>
        `
        return qualification_location
    }

    function add_license(){
        let qualification_license = clone_template()
        qualification_license.querySelector("#qualification-header").textContent = "License"
        qualification_license.setAttribute("name", "qualification-license")
        qualification_license.querySelector("#qualification-body").innerHTML = `
            <h6>Valid <input type="text" class="custom-form-input m-2 p-2" name="license"> license or certification </h6>
        `
        return qualification_license
    }

    function add_language(){
        let qualification_language = clone_template()
        qualification_language.querySelector("#qualification-header").textContent = "Language"
        qualification_language.setAttribute("name", "qualification-language")
        qualification_language.querySelector("#qualification-body").innerHTML = `
            <h6>Speaks the following language: <input type="text" class="custom-form-input m-2 p-2" name="language"></h6>
        `
        return qualification_language
    }

    return{
        add_experience: add_experience,
        add_education: add_education,
        add_location: add_location,
        add_language: add_language,
        add_license: add_license
    }
    //public members:
    // return{
    //     add_experience: function(){
    //         console.log("pasok sa exp")
    //         qualification_template.querySelector("#qualification-header").textContent = "Experience"
    //         qualification_template.setAttribute("name", "qualification-experience")
    //         let qualification_experience = qualification_template
    //         return qualification_experience
    //     },
    //     add_education: function(){
    //         console.log("pasok sa educ")
    //         qualification_template.setAttribute("name", "qualification-education")
    //         qualification_template.querySelector("#qualification-body").innerHTML = `
    //             <h6>Level of Education 
    //                 <select class="custom-form-input m-2 p-2" name="select-level-education">
    //                     <option value="Elementary">Elementary/Primary School</option>
    //                     <option value="Junior High School">Junior High School</option>
    //                     <option value="Senior High School">Senior High School</option>
    //                     <option value="Bachelor">Bachelor Degree</option>
    //                     <option value="Master Degree">Master Degree</option>
    //                     <option value="Doctorate">Doctorate</option>
    //                 </select>
    //                 <div name="education-specific-info"></div>
    //             </h6>
    //         `
    //         let qualification_education = qualification_template
    //         return qualification_education
    //     },
    //     add_language: function(){
    //         console.log("pasok sa language")
    //         qualification_template.setAttribute("name", "qualification-language")
    //         qualification_template.querySelector("#qualification-body").innerHTML = `
    //             <h6>Speaks the following language: <input type="text" class="custom-form-input m-2 p-2" name="language"></h6>
    //         `
            
    //     }
    // };
})()