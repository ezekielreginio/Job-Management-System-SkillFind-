import { validate_form } from "./validation"

export function create_input(type, placeholder, name, classlist, idname, required){
    let input_field = document.createElement("input")
    input_field.setAttribute("type", type)
    input_field.setAttribute("name", name)
    input_field.setAttribute("class", classlist)
    input_field.setAttribute("id", idname)
    input_field.setAttribute("style", "width: 100px")
    input_field.setAttribute("placeholder", placeholder)
    input_field.setAttribute("required", "true")
    return input_field
}

export function hide(id){
    document.getElementById(id).classList.add("d-none")
}

export function show(id){
    document.getElementById(id).classList.remove("d-none")
}

export function swap_display(hide,show){
    document.getElementById(hide).classList.add("d-none")
    document.getElementById(show).classList.remove("d-none")
}

export function page_navigation(btn_list){
    for(let i = 0; i<btn_list.length; i++){
        btn_list[i].addEventListener("click", function(){
            let flag = false;
            //flag = validate_form(this.parentElement)
            window.scrollTo(0, 0);
            
            if(!flag){
                this.parentElement.classList.add("d-none")
            
                let next_page = this.getAttribute("data-next-page") 
                document.getElementById(next_page).classList.remove("d-none")
            }
        })
    }
}

export function select_borders(selectboxes){
    for(let i = 0; i<selectboxes.length; i++){
        selectboxes[i].classList.add("selectbox-border", "my-3")
        selectboxes[i].addEventListener("click", function(e){
            if(this.firstElementChild.checked)
                this.firstElementChild.checked = false
            else
                this.firstElementChild.checked = true
        })
    }
}

export function radio_borders(selectboxes){
    for(let i = 0; i<selectboxes.length; i++){
        selectboxes[i].classList.add("selectbox-border", "my-3")
        selectboxes[i].addEventListener("click", function(e){
            this.firstElementChild.checked = true
        })
    }
}