import {DataTable} from "simple-datatables"

if(location.href.indexOf('employer/dashboard') != -1){
    adjust_logo()
    document.getElementById("employer-nav-dashboard").classList.add("sidebar-active")
}

if(location.href.indexOf('employer/jobspanel') != -1){
    adjust_logo()
    document.getElementById("employer-nav-jobspanel").classList.add("sidebar-active")
    var myTable = document.querySelector("#table-job-posting");
    var dataTable = new DataTable(myTable);
}

if(location.href.indexOf('employer/viewapplicants') != -1){
    var myTable = document.querySelector("#table-job-applicants");
    var dataTable = new DataTable(myTable);
}


//Functions
function adjust_logo(){
    document.getElementById("skillfind-logo").classList.add("logo-nav")
    document.getElementById("collapsibleNavId").classList.add("ml-4")
}