import { validate_form } from "./validation"

//Global Variables:
export let csrftoken = getCookie('csrftoken')


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

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
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

export function AJAX(context){
    /*
    context = {
        'method',
        'action',
        'body',
        'type',
        'token',
        'function',
    }
    */
    let header = {}
    if(context['type'] != null){
        header = {
            'Content-Type': context['type'], //'application/json',
            'X-CSRFToken': context['token'] //csrftoken
        }
    }
    else{
        header = {
            'X-CSRFToken': context['token'] //csrftoken
        }
    }
    const request = new Request(
        context['action'] // "./request/reorder_task"
    );
    let thisFunct = context['function']
    fetch(request, {
        method: context['method'], //POST,
        body: context['body'], //JSON.stringify(json_order),
        headers: header,
        mode: 'same-origin'  // Do not send CSRF token to another domain.
    }).then(function(response) {
        thisFunct(response)
    });
}