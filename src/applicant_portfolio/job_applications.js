import {DataTable} from "simple-datatables"
import { RequestBodyFactory } from "../_factories/ajax_requests";

if(location.href.indexOf('applyjob') != -1 || location.href.indexOf('applications') != -1){
    var myTable = document.querySelector("#table-job-applications");
    var dataTable = new DataTable(myTable);

    myTable.addEventListener("click", (e)=>{
        if(e.target.classList.contains("btn-withdraw")){
           let id = e.target.getAttribute("data-id");
           document.getElementById("btn-withdraw-submit").setAttribute("data-id", id);
        }
    })

    document.getElementById("btn-withdraw-submit").addEventListener("click", function(){
        let json_body ={
            "status": "Withdrawn",
            "applicant_id": this.getAttribute("data-user"),
            "joblisting_id":this.getAttribute("data-id")
        }

        console.log(json_body)

        const body = RequestBodyFactory({
            "method": "POST",
            "type": "application/json",
            "body": JSON.stringify(json_body)
            
        })

        const response = fetch("/updateapplication/", body).then(response => response.json())
        .then(data => {
            location.reload();
        })
        
    })
 
    let datatablefooter=document.getElementsByClassName('dataTable-info')
    for(let i = 0; i<datatablefooter.length; i++ ){
        datatablefooter[i].classList.add("text-white")
    }

    let datatableheader=document.getElementsByClassName('dataTable-dropdown')
    for(let i = 0; i<datatableheader.length; i++ ){
        datatableheader[i].classList.add("text-white")
    }
    
   

}