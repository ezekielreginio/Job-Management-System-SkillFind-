import { hide } from "../_global/global";

if(location.href.indexOf('employer/addjob') != -1){
    let multi_checkbox = document.getElementsByClassName("custom-checkbox")
    for(let i = 0; i<multi_checkbox.length; i++){
        multi_checkbox[i].classList.add("checkbox-border", "my-3")
        multi_checkbox[i].addEventListener("click", function(e){
            if(this.firstElementChild.checked)
                this.firstElementChild.checked = false
            else
                this.firstElementChild.checked = true
        })
    }

    let next_btn_list = document.getElementsByClassName("btn-next-job")
    for(let i = 0; i<multi_checkbox.length; i++){
        try{
            next_btn_list[i].addEventListener("click", function(){
                this.parentElement.classList.add("d-none")
                
                let next_page = this.getAttribute("data-next-page") 
                document.getElementById(next_page).classList.remove("d-none")
            })
        } 
        catch (error) {
        }     
    }

    //Scripts for Add Job CSS Styling

    //Removes Start Date Label
    document.getElementById("div_id_start_date").firstElementChild.remove()
    //Sets Start Date Placeholder
    document.getElementById("div_id_start_date").setAttribute("placeholder", "YYYY/MM/DD")

    //Gets job_schedule reference node
    let job_schedules = document.getElementById("div_id_job_schedules")
    //Creates Startdate prompt
    let stardate_prompt = document.createElement('div')
    stardate_prompt.classList.add("form-group")
    stardate_prompt.innerHTML = `
        <label for="" class=" requiredField">
        Is there a planned start date for this job? <span class="asteriskField">*</span> 
        </label>
        <div class>
            <div class="custom-control custom-radio checkbox-border my-3"> 
                <input type="radio">
                
            </div>
        </div>
    `

    job_schedules.after(stardate_prompt)
    hide("id_start_date")
}