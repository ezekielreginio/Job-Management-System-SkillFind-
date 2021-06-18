import { RequestBodyFactory, RequestFactory } from "../_factories/ajax_requests"

if(location.href.indexOf('employer/viewapplicants') != -1){
    
    let view_applicants = (()=>{
        function EventBubble(){
            document.getElementById("view-applications-bubble").addEventListener("click", (e)=>{
                if(e.target.classList.contains("change-application-status")){
                    let json_body ={
                        "status": e.target.textContent,
                        "applicant_id": e.target.parentElement.getAttribute("data-applicant-id"),
                        "joblisting_id": e.target.parentElement.getAttribute("data-joblisting-id")
                    }

                    const body = RequestBodyFactory({
                        "method": "POST",
                        "type": "application/json",
                        "body": JSON.stringify(json_body)
                        
                    })

                    const response = fetch("/updateapplication/", body)
                    .then(response => response.json())
                    .then(data => {
                        e.target.parentElement.parentElement.previousSibling.textContent = e.target.textContent
                    })
                }
            })
        }
        return({
            getInstance: ()=>{
                EventBubble()
            }
        })
    })()

    let view_applicants_instance = view_applicants.getInstance()
}