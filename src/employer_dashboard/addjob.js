import { hide, select_borders, radio_borders, show, page_navigation } from "../_global/global";

if(location.href.indexOf('employer/addjob') != -1){
    let prev_btn_list = document.getElementsByClassName("btn-prev-job")
    let next_btn_list = document.getElementsByClassName("btn-next-job")
    
    page_navigation(next_btn_list)
    page_navigation(prev_btn_list)

    // for(let i = 0; i<next_btn_list.length; i++){
    //     next_btn_list[i].addEventListener("click", function(){
    //         this.parentElement.classList.add("d-none")
            
    //         let next_page = this.getAttribute("data-next-page") 
    //         document.getElementById(next_page).classList.remove("d-none")
    //     })
    // }

    for(let i = 0; i<prev_btn_list.length; i++){
        prev_btn_list[i].addEventListener("click", function(){
            this.parentElement.classList.add("d-none")
            
            let prev_page = this.getAttribute("data-prev-page") 
            document.getElementById(prev_page).classList.remove("d-none")
        })
    }

    //Scripts for Add Job CSS Styling

    //CSS for multi select borders
    let multi_checkbox = document.getElementsByClassName("custom-checkbox")
    let multi_radio = document.getElementsByClassName("custom-radio")
    select_borders(multi_checkbox)
    let yes_opt = null
    for(let i = 0; i<multi_radio.length; i++){
        multi_radio[i].classList.add("selectbox-border", "my-3")
        multi_radio[i].addEventListener("click", function(e){
            if(i==0)
                yes_opt = this.firstElementChild
            
            this.firstElementChild.checked = true

            if(yes_opt.checked){
                show("id_start_date")
                document.getElementById("id_start_date").setAttribute("required","")
            }
                
            else{
                hide("id_start_date")
                document.getElementById("id_start_date").value = ""
                document.getElementById("id_start_date").classList.remove("is-invalid")
                document.getElementById("id_start_date").nextElementSibling.remove()
                document.getElementById("id_start_date").removeAttribute("required")
            }
                
        })
    }

    //Start Date CSS
    document.getElementById("div_id_start_date").firstElementChild.remove()
    document.getElementById("id_start_date").setAttribute("placeholder", "Start Date (MM/DD/YYYY)")
    document.getElementById("id_start_date").classList.add("w-50")
    document.getElementById("id_start_date").addEventListener("focus", function(){
        this.setAttribute("type", "date")
    })
    hide("id_start_date")
}