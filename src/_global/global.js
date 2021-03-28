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