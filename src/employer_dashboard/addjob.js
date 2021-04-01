
if(location.href.indexOf('employer/addjob') != -1){
    let multi_checkbox = document.getElementsByClassName("custom-checkbox")
    theCheckbox = document.querySelector('input');
    for(let i = 0; i<multi_checkbox.length; i++){
        multi_checkbox[i].classList.add("checkbox-border", "my-3")
        multi_checkbox[i].addEventListener("click", function(e){
            if(this.firstElementChild.checked)
                this.firstElementChild.checked = false
            else
                this.firstElementChild.checked = true
        })
    }

    
}