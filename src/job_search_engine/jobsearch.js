import { RequestBodyFactory, RequestFactory } from "../_factories/ajax_requests"

document.getElementById("searchbar").addEventListener("submit", (e)=>{
    e.preventDefault()
    let query = document.getElementById("input-searchbar").value
    location.replace("/jobs?q="+query)
})

if(location.href.indexOf('jobs') != -1){
    let jobsearch = (()=>{
        //private members:
        function EventBubble(){
            document.querySelectorAll(".card-results").forEach((job_card)=>{
                job_card.addEventListener("click", async(e)=>{
                    let job_id = job_card.getAttribute("data-job-id")
                    const request = RequestFactory("./ajax/jobquery?id="+job_id)
                    const body = RequestBodyFactory({
                        "method": "GET",

                    })
                    const response = await fetch(request, body)
                        if(response.status == 200){
                            let data = await response.json()
                            data = data[0]

                            let qualifications = data['qualifications']
                            console.log(data)
                            document.getElementById("job-info").innerHTML = `
                            <div class="abstract text-white">
                                <h5>`+data['job_title']+`</h5>
                                <h6>`+data['employer']['company_name']+` - `+data['location']+`</h6>
                                <h6>PHP `+parseFloat(data['initial_salary']).toLocaleString()+` - Fulltime, Permanent - Remote</h6>
                                <button class="btn btn-apply">Apply Now</button>
                                <button class="btn btn-secondary"><i class="fas fa-heart"></i></button>
                                <hr class="bg-white">
                                <div class="search-job-info" id="job-description">
                                    `+data['job_description']+`
                                </div>
                                
                            </div>
                            `
                            if(data['benefits'][0] != "None"){
                                let benefits = data['benefits']
                                document.getElementById("job-description").innerHTML +=`
                                    <p>Benefits: </p>
                                    <ul id="benefits">
                                    </ul>
                                `
                                for(let i=0; i<benefits.length; i++){
                                    document.getElementById("benefits").innerHTML +=`
                                        <li>`+benefits[i]+`</li>
                                    `
                                }
                            }
                            
                            let schedules = data['job_schedules']
                            document.getElementById("job-description").innerHTML +=`
                                <p>Schedule: </p>
                                <ul id="schedule">
                                </ul>
                            `
                            for(let i=0; i<schedules.length; i++){
                                document.getElementById("schedule").innerHTML +=`
                                    <li>`+schedules[i]+`</li>
                                `
                            }
                            
                            let supplemental_pay = data['supplemental_pay']
                            if(supplemental_pay[0] != "None"){
                                document.getElementById("job-description").innerHTML +=`
                                    <p>Supplemental Pay: </p>
                                    <ul id="pay">
                                    </ul>
                                `
                                for(let i=0; i<supplemental_pay.length; i++){
                                    document.getElementById("pay").innerHTML +=`
                                        <li>`+supplemental_pay[i]+`</li>
                                    `
                                }
                            }

                            if(qualifications['qualification_education'][0] != undefined){
                                document.getElementById("job-description").innerHTML +=`
                                    <p>Education: </p>
                                    <ul id="education">
                                    </ul>
                                `
        
                                for(let i in qualifications['qualification_education']){
                                    let value = qualifications['qualification_education'][i]
                                    let info = ""
                                    if(value['major'] != null)
                                        info = value['level']+" Major in "+value['major']
                                    else   
                                        info = value['level']
                                    
                                    
        
                                    document.getElementById("education").innerHTML +=`
                                        <li>`+info+` (`+ required_preferred(value['required']) +`)</li>
                                    `
                                }
                                
                            }

                            if(qualifications['qualification_experience'][0] != undefined){
                                document.getElementById("job-description").innerHTML +=`
                                    <p>Experience: </p>
                                    <ul id="experience">
                                    </ul>
                                `
        
                                for(let i in qualifications['qualification_experience']){
                                    let data = qualifications['qualification_experience'][i]
        
                                    document.getElementById("experience").innerHTML +=`
                                        <li>`+data['name']+`: `+ data['year'] +` (`+ required_preferred(data['required']) +`)</li>
                                    `
                                }
                            }

                            if(qualifications['qualification_licenses'][0] != undefined){
                                document.getElementById("job-description").innerHTML +=`
                                    <p>License: </p>
                                    <ul id="license">
                                    </ul>
                                `
        
                                for(let i in qualifications['qualification_licenses']){
                                    let data = qualifications['qualification_licenses'][i]
        
                                    document.getElementById("license").innerHTML +=`
                                        <li>`+data['license']+` (`+ required_preferred(data['required']) +`)</li>
                                    `
                                }
                            }

                            if(qualifications['qualification_languages'][0] != undefined){
                                document.getElementById("job-description").innerHTML +=`
                                    <p>Language: </p>
                                    <ul id="languages">
                                    </ul>
                                `
        
                                for(let i in qualifications['qualification_languages']){
                                    let data = qualifications['qualification_languages'][i]
        
                                    document.getElementById("languages").innerHTML +=`
                                        <li>`+data['language']+` (`+ required_preferred(data['required']) +`)</li>
                                    `
                                }
                            }
                        }
                        function required_preferred(bool){
                            if(bool == "true")
                                return "Required"
                            else    
                                return "Preferred"
                        }
                })
            })
        }

        //public members:
        return{
            getInstance: ()=>{
                EventBubble()
            }
        }
    })()

    let jobsearch_instance = jobsearch.getInstance()
}