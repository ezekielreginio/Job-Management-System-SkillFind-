import {DataTable} from "simple-datatables"

if(location.href.indexOf('pwdapplyjob') != -1 || location.href.indexOf('pwdapplications') != -1){
    var myTable = document.querySelector("#table-job-applications");
    var dataTable = new DataTable(myTable);

    myTable.addEventListener("click", (e)=>{
        
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