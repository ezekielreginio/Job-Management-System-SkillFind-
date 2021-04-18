export function validate_form(form){
    reset_validation()
    let flag = false
    let inputs = form.getElementsByTagName("input")
    let is_invalid = ""
    for(let i=0; i<inputs.length; i++){
        console.log(inputs[i])
        if(inputs[i].value == "" && inputs[i].hasAttribute("required")){
            flag = isinvalid(inputs[i], "This is a Required Field.")
        }
        else if(!inputs[i].getAttribute("type") == "checkbox"){
            if(inputs[i].classList.contains("textInput")){
                let message = validate_alphanumericsym(inputs[i].value)
                if(message != 0)
                    flag = isinvalid(inputs[i], message)
            }
        }
        else if(inputs[i].getAttribute("type") == "checkbox" && inputs[i].getAttribute("data-required") == "True"){
            let input_checklist = document.getElementsByName(inputs[i].getAttribute("name"))
            let list_size = input_checklist.length
            i+=(list_size-1)
            let list_flag = true
            for(let j=0;j<input_checklist.length;j++){
                console.log(input_checklist[j])
                if(input_checklist[j].checked)
                    list_flag = false
            }
            if(list_flag){
                isinvalid(input_checklist[list_size-1].parentElement, "Please Select an Option Above")
                flag = true
            }
                
        }
    }
    return flag
}

export function reset_validation(){
    document.querySelectorAll(".is-invalid").forEach(function(e){
        e.classList.remove("is-invalid")
        e.nextSibling.remove()
    })
}

export function validate_alphanumericsym(value){
    let min_characters = /.{6,}/
    let pattern = /^[a-zA-Z0-9 .,-_ñ]*$/
    if(!value.match(min_characters))
        return "Input Too Short. Minimum of six(6) Characters. Try again"
    else if(!value.match(pattern))
        return "Invalid Input. List of Acceptable Characters: A-Z,a-z,0-9,(-.,space)"
    else   
        return 0
}

export function isinvalid(input, message){
    let is_invalid = document.createElement("div")
    is_invalid.classList.add("invalid-feedback")
    input.classList.add("is-invalid")
    is_invalid.textContent = message
    input.after(is_invalid)
    
    return true
}