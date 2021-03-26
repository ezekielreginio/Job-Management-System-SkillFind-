const moment = require("moment")

if(location.href.indexOf('experience') != -1){
    if(document.getElementById("div-experience-list") == null){
        document.getElementById("div-experience-form").classList.remove("d-none")
        document.getElementById("cancel-experience-form").classList.add("d-none")
    }
    else{
        document.getElementById("btn-add-experience").addEventListener("click", function(){
            this.classList.add("d-none")
            document.getElementById("div-experience-form").classList.remove("d-none")
        })
        document.getElementById("cancel-experience-form").addEventListener("click", function(){
            document.getElementById("div-experience-form").classList.add("d-none")
            document.getElementById("btn-add-experience").classList.remove("d-none")
        })

        let experience_list = document.getElementsByClassName("experience-record")
        for (var i = 0; i < experience_list.length; i++) {
            let end_date = moment(document.getElementsByClassName("experience-enddate")[i].getAttribute("value"))
            let start_date = moment(document.getElementsByClassName("experience-startdate")[i].getAttribute("value"))
            
            //var duration = end_date.diff(start_date, "months");
            
            let years = end_date.diff(start_date, 'year')
            start_date.add(years, 'years')
            
            let months = end_date.diff(start_date, 'months')
            start_date.add(months, 'months')

            let y_str= ""
            let m_str = ""
            if(years >= 1)
                if(years == 1)
                    y_str = years+" year "
                else
                    y_str = years+" years "
            if(months >= 1)
                if(months == 1)
                    m_str = months+" month"
                else
                    m_str = months+" months"
            console.log(y_str + m_str)
            document.getElementsByClassName("experience-span")[i].textContent = y_str + m_str
         }
    }
    
}
