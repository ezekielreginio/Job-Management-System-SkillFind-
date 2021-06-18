import {DataTable} from "simple-datatables"

if(location.href.indexOf('applyjob') != -1 || location.href.indexOf('applications') != -1){
    var myTable = document.querySelector("#table-job-applications");
    var dataTable = new DataTable(myTable);
}