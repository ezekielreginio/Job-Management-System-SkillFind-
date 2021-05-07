
export let Validation = (()=>{
    let flag = false
    function validate_form(form){
        /*Parameter:
            form: Form Should be an object not an ID or Class
        */

        //Variable Declarations:
        let inputs = form.getElementsByTagName("input")
        let i= 0
        let error = null

        //Function Calls:
        reset_validation()

        for(i=0; i<inputs.length; i++){
            if(inputs[i].required)
                validate_required(inputs[i])
            
            if(inputs[i].getAttribute("type")=="text")
                validate_text(inputs[i])
            else if(inputs[i].getAttribute("type")=="checkbox" && inputs[i].getAttribute("data-required").toLowerCase() == "true"){
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
                    invalid_message(input_checklist[list_size-1].parentElement, "Please Select an Option Above")
                    flag = true
                }
            }
            // if(inputs[i].getAttribute("type") == "text")
            //     validate_text(inputs[i]) 
        }  

        if(flag == true){
            error = document.getElementsByClassName("is-invalid")[0].getBoundingClientRect()
            window.scrollTo(error.x,error.y-50);
        }
        return flag
    }

    function validate_required(input){
        if(input.value == ""){
            flag = true
            invalid_message(input, "This is a Required Field")
        }
    }

    function validate_text(input){
        let pattern = /^[a-zA-Z0-9 .,-_ñ]*$/
        if(!input.value.match(pattern)){
            flag = true
            invalid_message(input, "Invalid Input. List of Acceptable Characters: A-Z,a-z,0-9,(-.,space)")
        }
    }

    function invalid_message(input, message){
        let is_invalid = document.createElement("div")
        is_invalid.classList.add("invalid-feedback")
        input.classList.add("is-invalid")
        is_invalid.textContent = message
        input.after(is_invalid)
    }

    function reset_validation(){
        flag = false
        document.querySelectorAll(".is-invalid").forEach(function(e){
            e.classList.remove("is-invalid")
            e.nextSibling.remove()
        })
    }

    return{
        validate_form: validate_form
    }
})()