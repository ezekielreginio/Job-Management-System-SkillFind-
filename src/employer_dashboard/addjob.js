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
                        let target_name = checkbox.getAttribute("name")
                        if(checkbox.value == "None"){
                            DeselectOnNone(checkbox, target_name)
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

                function DeselectOnNone(target, target_name){
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