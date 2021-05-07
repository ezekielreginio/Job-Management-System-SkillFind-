export var create_qualification = (()=>{
    //private members:  
    function clone_template(){
        let qualification_template = document.getElementsByClassName("qualification-template")[0].cloneNode(true)
        qualification_template.classList.remove("d-none")
        qualification_template.querySelectorAll("[name='qualification_required']").forEach((e)=>{ e.setAttribute("name", "qualification_required") })
        return qualification_template
    }

    function add_experience(){
        let qualification_experience = clone_template()
        qualification_experience.querySelector("#qualification-header").textContent = "Experience"
        qualification_experience.setAttribute("name", "qualification-experience")
        return qualification_experience
    }

    function add_education(){
        let qualification_education = clone_template()
        qualification_education.querySelector("#qualification-header").textContent = "Education"
        qualification_education.setAttribute("name", "qualification-education")
        qualification_education.querySelector("#qualification-body").innerHTML = `
            <h6>Level of Education 
                <select class="custom-form-input m-2 p-2" name="select-level-education">
                    <option value="Elementary">Elementary/Primary School</option>
                    <option value="Junior High School">Junior High School</option>
                    <option value="Senior High School">Senior High School</option>
                    <option value="Bachelor">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Doctorate">Doctorate</option>
                </select>
                <div name="education-specific-info">
                    
                </div>
            </h6>
        `
        return qualification_education
    }

    function add_location(){
        let qualification_location = clone_template()
        qualification_location.querySelector("#qualification-header").textContent = "Location"
        qualification_location.setAttribute("name", "qualification-location")
        qualification_location.querySelector("#qualification-body").innerHTML = `
            <h6>Located in `+document.getElementById("id_location").value+`</h6>
        `
        return qualification_location
    }

    function add_license(){
        let qualification_license = clone_template()
        qualification_license.querySelector("#qualification-header").textContent = "License"
        qualification_license.setAttribute("name", "qualification-license")
        qualification_license.querySelector("#qualification-body").innerHTML = `
            <h6>Valid <input type="text" class="custom-form-input m-2 p-2" name="license"> license or certification </h6>
        `
        return qualification_license
    }

    function add_language(){
        let qualification_language = clone_template()
        qualification_language.querySelector("#qualification-header").textContent = "Language"
        qualification_language.setAttribute("name", "qualification-language")
        qualification_language.querySelector("#qualification-body").innerHTML = `
            <h6>Speaks the following language: <input type="text" class="custom-form-input m-2 p-2" name="language"></h6>
        `
        return qualification_language
    }

    function create_qualification_card(qualification){
        if(qualification == "Experience")
            return add_experience()
        else if(qualification == "Education")
            return add_education()
        else if(qualification == "Location")
            return add_location()
        else if(qualification == "Language")
            return add_language()
        else if(qualification == "License")
            return add_license()
    }

    //public members:
    return{
        add_experience: add_experience,
        add_education: add_education,
        add_location: add_location,
        add_language: add_language,
        add_license: add_license,
        create_qualification_card: create_qualification_card
    }
    
})()