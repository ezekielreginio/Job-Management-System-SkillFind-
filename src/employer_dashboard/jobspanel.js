import { RequestBodyFactory, RequestFactory } from "../_factories/ajax_requests"

if(location.href.indexOf('employer/jobspanel') != -1){

    //Singleton Design Pattern
    let JobsPanel = (()=>{
        function EventBubble(){
            document.getElementById("jobspanel-bubble").addEventListener("click", (e)=>{
                if(e.target.classList.contains("btn-set-active")){
                    (async()=>{
                        let response = await Update_JobStatus(e.target.getAttribute("data-job-id"), e.target.getAttribute("data-status"))
                        location.reload()
                    })()
                }
            })
        }

        async function Update_JobStatus(job_id,job_status){
            let json_body ={
                "status": job_status
            }
            const request = RequestFactory("/ajax/updatejoblistingstatus/"+job_id+"/")
            const body = RequestBodyFactory({
                "method": "POST",
                "type": "application/json",
                "body": JSON.stringify(json_body)

            })
            const response = await fetch(request, body)
    
            return await response.json()
        }

        return{
            getInstance: ()=>{
                EventBubble()
            }
        }
    })()

    let jobspanel_instance = JobsPanel.getInstance()
}