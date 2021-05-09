import { swap_display } from "../_global/global"
import { RequestBodyFactory, RequestFactory } from "../_factories/ajax_requests"
import { Validation } from "../_factories/validation"
import { create_qualification } from "./create_qualification"

if(location.href.indexOf('employer/addjob') != -1){

    let AddJob = (()=>{

        let hidden_elements = []
        let deselect_on_none = [
            'supplemental_pay',
            'benefits'           
        ]

        function EventBubble(){
            //Click Event Inside Bubble:
            document.getElementById("addjob-bubble").addEventListener("click", (e)=>{
                
                if(e.target.classList.contains("btn-move-page")){
                    window.scrollTo(0,0);
                    let page_target = e.target.getAttribute("data-target-page")
                    let validate_page = Validation.validate_form(e.target.parentElement)
                    if(!validate_page || e.target.innerHTML == "Previous Page")
                        swap_display(e.target.parentElement.getAttribute("id") , page_target)
                }

                else if(e.target.getAttribute("id") == "btn-preview-job"){
                    swap_display(e.target.parentElement.getAttribute("id") , "p6-add-job")
                    
                    let compensation_type = document.getElementById("id_compensation_range").value
                    let compensation = ""
                    if(compensation_type == "Range")
                        compensation = "From PHP "+document.getElementById("id_initial_salary").value+" - PHP "+ document.getElementById("id_max_salary").value
                    else if(compensation_type == "Exact Rate")
                        compensation ="PHP "+ document.getElementById("id_initial_salary").value
                    else
                        compensation = compensation_type+"  PHP "+document.getElementById("id_initial_salary").value
                    
                    let benefits = []
                    let benefits_checkboxes = document.getElementsByName("benefits")
                    for(let i=0; i <benefits_checkboxes.length; i++){
                        if(benefits_checkboxes[i].checked)
                            benefits.push(benefits_checkboxes[i].value)
                    }

                    let schedules = []
                    let schedule_checkboxes = document.getElementsByName("job_schedules")
                    for(let i=0; i <schedule_checkboxes.length; i++){
                        if(schedule_checkboxes[i].checked)
                            schedules.push(schedule_checkboxes[i].value)
                    }

                    let supplemental_pay = []
                    let supplemental_pay_checkboxes = document.getElementsByName("supplemental_pay")
                    for(let i=0; i <supplemental_pay_checkboxes.length; i++){
                        if(supplemental_pay_checkboxes[i].checked)
                            supplemental_pay.push(supplemental_pay_checkboxes[i].value)
                    }

                    let qualification_data = CompileQualifications()
                    console.log(qualification_data)
                    document.getElementById("job-preview").innerHTML = `
                        <h4> `+document.getElementById("id_job_title").value+` </h4>
                        <p>`+sessionStorage.getItem("company_name")+` | `+document.getElementById("id_location").value+`</p>
                        <button type="button" name=""  class="btn btn-secondary">Apply Now</button>
                        <button type="button" name="" id="" class="btn btn-applicant">Save</button>

                        <div>
                            `+ document.getElementById("id_job_description").value +`
                        </div>
                        <br>
                        <p>Job Types: `+ document.getElementById("id_employment_type").value +`</p>
                        <p>Salary: `+ compensation +`</p>

                        <div id="preview-other-info">
                            
                        </div>
                    `
                    if(benefits[0] != "None"){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>Benefits: </p>
                            <ul id="preview-benefits">
                            </ul>
                        `
                        for(let i=0; i<benefits.length; i++){
                            document.getElementById("preview-benefits").innerHTML +=`
                                <li>`+benefits[i]+`</li>
                            `
                        }
                    }

                    document.getElementById("preview-other-info").innerHTML +=`
                            <p>Schedule: </p>
                            <ul id="preview-schedule">
                            </ul>
                        `
                    for(let i=0; i<schedules.length; i++){
                        document.getElementById("preview-schedule").innerHTML +=`
                            <li>`+schedules[i]+`</li>
                        `
                    }

                    if(supplemental_pay[0] != "None"){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>Supplemental Pay: </p>
                            <ul id="preview-pay">
                            </ul>
                        `
                        for(let i=0; i<supplemental_pay.length; i++){
                            document.getElementById("preview-pay").innerHTML +=`
                                <li>`+supplemental_pay[i]+`</li>
                            `
                        }
                    }
                    if(qualification_data['qualification_education'][0] != undefined){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>Education: </p>
                            <ul id="preview-education">
                            </ul>
                        `

                        for(let i in qualification_data['qualification_education']){
                            let value = qualification_data['qualification_education'][i]
                            let info = ""
                            if(value['major'] != null)
                                info = value['level']+" Major in "+value['major']
                            else   
                                info = value['level']
                            
                            

                            document.getElementById("preview-education").innerHTML +=`
                                <li>`+info+` (`+ required_preferred(value['required']) +`)</li>
                            `
                        }
                        
                    }

                    if(qualification_data['qualification_experience'][0] != undefined){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>Experience: </p>
                            <ul id="preview-experience">
                            </ul>
                        `

                        for(let i in qualification_data['qualification_experience']){
                            let data = qualification_data['qualification_experience'][i]

                            document.getElementById("preview-experience").innerHTML +=`
                                <li>`+data['name']+`: `+ data['year'] +` (`+ required_preferred(data['required']) +`)</li>
                            `
                        }
                    }

                    if(qualification_data['qualification_licenses'][0] != undefined){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>License: </p>
                            <ul id="preview-license">
                            </ul>
                        `

                        for(let i in qualification_data['qualification_licenses']){
                            let data = qualification_data['qualification_licenses'][i]

                            document.getElementById("preview-license").innerHTML +=`
                                <li>`+data['license']+` (`+ required_preferred(data['required']) +`)</li>
                            `
                        }
                    }

                    if(qualification_data['qualification_languages'][0] != undefined){
                        document.getElementById("preview-other-info").innerHTML +=`
                            <p>Language: </p>
                            <ul id="preview-languages">
                            </ul>
                        `

                        for(let i in qualification_data['qualification_languages']){
                            let data = qualification_data['qualification_languages'][i]

                            document.getElementById("preview-languages").innerHTML +=`
                                <li>`+data['language']+` (`+ required_preferred(data['required']) +`)</li>
                            `
                        }
                    }

                    function required_preferred(bool){
                        if(bool == "true")
                            return "Required"
                        else    
                            return "Preferred"
                    }
                }

                else if(e.target.getAttribute("id") == "btn-post-job"){
                    (async()=>{
                        let formdata_joblist = new FormData(document.getElementById("form-add-job"))
                        let qualification_data = CompileQualifications()
                        formdata_joblist.append("qualifications", JSON.stringify(qualification_data))
                        
                        const request = RequestFactory("./addjob")
                        const body = RequestBodyFactory({
                            "method": "POST",
                            "body": formdata_joblist

                        })
                        const response = await fetch(request, body)
                        if(response.status == 200){
                            location.replace("/employer/jobspanel")
                        }
                    })()
                }

                else if(e.target.classList.contains("custom-checkbox") || deselect_on_none.includes(e.target.getAttribute("name"))){
                    let checkbox = ""
                    let parentElement = ""

                    if(e.target.getAttribute("type") == "checkbox"){
                        checkbox = e.target
                        parentElement = e.target.parentElement.parentElement
                    }

                    else{
                        checkbox = e.target.firstElementChild
                        parentElement = e.target.parentElement
                        if(checkbox.checked)
                            checkbox.checked = false
                        else
                            checkbox.checked = true
                    }
                    
                    if(deselect_on_none.includes(checkbox.getAttribute("name"))){
                        
                        if(checkbox.value == "None"){
                            DeselectOnNone(checkbox)
                        }
                        else{
                            parentElement.querySelector('[value="None"]').checked = false
                        }
                    }
                }

                else if(e.target.parentElement.getAttribute("id") == "dropdown-add-qualification"){
                    let qualification = e.target.textContent
                    let qualification_template = create_qualification.create_qualification_card(qualification)
                    document.getElementById("p5-container").appendChild(qualification_template)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }

                else if(e.target.getAttribute("name") == "card-close"){
                    e.target.parentElement.parentElement.parentElement.remove()
                }

                function DeselectOnNone(target){
                    let target_name = target.getAttribute("name")
                    document.querySelectorAll('[name="'+target_name+'"]').forEach((x)=>{
                        x.checked = false
                    })
                    target.checked = true
                }

            })

            //Change Event Inside Bubble:
            document.getElementById("addjob-bubble").addEventListener("change", (e)=>{
                if(e.target.classList.contains("yes-no-option") && e.target.value == "true"){
                    let next_sibling = e.target.parentElement.parentElement.nextElementSibling
                    next_sibling.classList.remove("d-none")
                    ChangeRequired(next_sibling, true)
                }
                else if(e.target.classList.contains("yes-no-option") && e.target.value == "false"){
                    let next_sibling = e.target.parentElement.parentElement.nextElementSibling
                    next_sibling.classList.add("d-none")
                    ChangeRequired(next_sibling, false)
                }
                else if(e.target.getAttribute("name") == "compensation_range"){
                    if(e.target.value != "Range"){
                        document.getElementById("id_max_salary").value = ""
                        HideElements([
                            document.getElementById("div_id_max_salary"),
                            document.getElementById("span-compensation")
                        ])
                        document.getElementById("id_max_salary").required = false
                    }
                    else{
                        document.getElementById("div_id_max_salary").classList.remove("d-none")
                        document.getElementById("span-compensation").classList.remove("d-none")
                        document.getElementById("id_max_salary").required = true
                    }
                }

                else if(e.target.getAttribute("name") == "select-level-education"){
                    if(e.target.value == "Bachelor" || e.target.value == "Master Degree" || e.target.value == "Doctorate"){
                        e.target.nextElementSibling.innerHTML = `
                        <h6>Major in 
                            <input type="text" class="custom-form-input m-2 p-2" name="major">
                        </h6>
                        `
                    }
                    else if(e.target.value == "Senior High School"){
                        e.target.nextElementSibling.innerHTML = `
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
                    else{
                        e.target.nextElementSibling.innerHTML = ``
                    }
                }


                function ChangeRequired(next_sibling, bool_value){
                    next_sibling.querySelectorAll('[name="'+e.target.getAttribute("data-name")+'"]').forEach((x)=>{
                        if(x.getAttribute("type") == "checkbox"){
                            if(!bool_value)
                                x.checked = bool_value
                            x.setAttribute("data-required", bool_value)
                        }

                        if(x.getAttribute("type")=="text" || x.getAttribute("type")=="date"){
                            x.required = bool_value
                            if(!bool_value)
                                x.value=""
                        }
                    })
                }
            })
        }

        function CompileQualifications(){
            let qualification_experience = {}
            let qualification_education = {}
            let qualification_licenses = {}
            let qualification_languages = {}
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
                qualification_licenses[i]={
                    "license": license_data[i].querySelector("[name='license']").value,
                    "required": license_data[i].querySelector("[name='required-preferred']").value,
                }
            }
            
            for(let i=0; i<language_data.length; i++){
                qualification_languages[i]={
                    "language": language_data[i].querySelector("[name='language']").value,
                    "required": language_data[i].querySelector("[name='required-preferred']").value,
                }
            }

            let data = {
                "qualification_experience": qualification_experience,
                "qualification_education": qualification_education,
                "qualification_licenses": qualification_licenses,
                "qualification_location": qualification_location,
                "qualification_languages": qualification_languages,
            }

            return data
        }

        //Adds Borders to Select Checkbox Fields
        function SelectBorders(selectboxes){
            for(let i = 0; i<selectboxes.length; i++){
                selectboxes[i].classList.add("selectbox-border", "my-3")
            }
        }

        function HideElements(elements){
            for(let i=0; i < elements.length; i++){
                try{
                    elements[i].classList.add("d-none")
                }
                catch(e){

                }
            }
        }

        function CheckBoolean(element, target){
            if(element.value == "false")
                return target
        }

        //Public_Members:
        return{
            getInstance: ()=>{
                hidden_elements = [
                    
                    CheckBoolean(document.getElementById("id_accept_handicapped"), document.getElementById("div_id_accepted_handicapped_types")),
                    
                    (()=>{
                        if(document.getElementById("id_start_date").value == "")
                            return document.getElementById("div_id_start_date")
                        else
                            document.getElementById("id_date_prompt").value = "true"
                    })(),

                    (()=>{
                        if(document.getElementById("id_compensation_range").value != "Range"){
                            HideElements([
                                document.getElementById("div_id_max_salary"),
                                document.getElementById("span-compensation")
                            ])
                        }
                    })(),

                    (()=>{
                        if(document.getElementById("id_application_deadline").value == "")
                            return document.getElementById("div_id_application_deadline")
                        else
                            document.getElementById("id_application_resume").value = "true"
                    })()
                    
                ]
                EventBubble()
                SelectBorders(document.getElementsByClassName("custom-checkbox"))
                HideElements(hidden_elements)
            }
        }
    })()
    let addJob_instance = AddJob.getInstance()
}