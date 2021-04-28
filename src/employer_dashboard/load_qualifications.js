import { csrftoken } from "../_global/global";
import { RequestFactory, RequestBodyFactory } from "../_factories/ajax_requests"
import { create_qualification} from "../employer_dashboard/addjob"

if(location.href.indexOf('employer/addjob') != -1){
    let url = location.href
    let data = (url.match(/(\d+)/g) || []);

    let id = 0
    if(data[0] == 127)
        id = data[5]
    else
        id = data[0]
    if(id != null){
        document.getElementsByName("qualification-experience")[0].remove()

        async function loadQualifications(){
            const request = RequestFactory("/ajax/requestqualifications/"+id)
            const body = RequestBodyFactory({
                "method": "POST",
            })
            const response = await fetch(request, body)
    
            return await response.json()
        }
    
        (async () =>{
            let data_samp = await loadQualifications()
            let qualification_location_data = data_samp['qualification_location']
            //console.log(data_samp)
            for (const [key, value] of Object.entries(data_samp['qualification_experience'])) {
                let qualification_experience = create_qualification.add_experience()
                qualification_experience = populate_qualification(qualification_experience, value).populate_experience()
                document.getElementById("p5-container").appendChild(qualification_experience)
            }
    
            for (const [key, value] of Object.entries(data_samp['qualification_education'])) {
                let qualification_education = create_qualification.add_education()
                qualification_education = populate_qualification(qualification_education, value).populate_education()
                document.getElementById("p5-container").appendChild(qualification_education)
            }

            if(qualification_location_data != null){
                let qualification_location = create_qualification.add_location()
                qualification_location = populate_qualification(qualification_location, qualification_location_data).populate_location()
                document.getElementById("p5-container").appendChild(qualification_location)
            }

            for (const [key, value] of Object.entries(data_samp['qualification_licenses'])) {
                let qualification_license = create_qualification.add_license()
                qualification_license = populate_qualification(qualification_license, value).populate_license()
                document.getElementById("p5-container").appendChild(qualification_license)
            }
            for (const [key, value] of Object.entries(data_samp['qualification_languages'])) {
                let y = create_qualification.add_language()
            }
        })()

        let populate_qualification = (qualification, data)=>{
            //Private Members
            function populate_experience(){
                qualification.querySelector("[name='year']").value = data['year']
                qualification.querySelector("[name='experience']").value = data['name']
                qualification.querySelector("[name='required-preferred']").value = data['required']
                return qualification
            }

            function populate_education(){
                qualification.querySelector("[name='select-level-education']").value = data['level']
                qualification.querySelector("[name='required-preferred']").value = data['required']
                
                if(data['level'] == "Bachelor" || data['level'] == "Master" || data['level'] == "Doctorate"){
                    qualification.querySelector("[name='education-specific-info']").innerHTML = `
                        <h6>Major in 
                            <input type="text" class="custom-form-input m-2 p-2" name="major">
                        </h6>
                    `
                }
                else if(data['level'] == "Senior High School"){
                    qualification.querySelector("[name='education-specific-info']").innerHTML = `
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
                qualification.querySelector("[name='major']").value = data['major']
                
                return qualification
            }

            function populate_location(){
                qualification.querySelector("[name='required-preferred']").value = data
                return qualification
            }

            function populate_license(){
                qualification.querySelector("[name='license']").value = data['license']
                qualification.querySelector("[name='required-preferred']").value = data['required']
                return qualification
            }

            //Public Members
            return{
                populate_experience: populate_experience,
                populate_education: populate_education,
                populate_location: populate_location,
                populate_license: populate_license
            }
        }
    }
}