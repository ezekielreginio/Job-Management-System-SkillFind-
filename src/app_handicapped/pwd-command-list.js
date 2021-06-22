import { speech_ai } from "./../_factories/speech_ai"
const moment = require("moment")
const { create_input, AJAX, csrftoken, autoComplete } = require("../_global/global")
const autocomplete = require('autocompleter');
const { isinvalid } = require("../_global/validation");

if(location.href.indexOf('commands') != -1){

    
   

   let home= document.getElementById("nav-home")
   home.getAttribute("href")
   home.setAttribute("href", "/handicapped/index")
   let logo= document.getElementById("skillfind-logo")
   logo.getAttribute("href")
   logo.setAttribute("href", "/handicapped/index")
    document.getElementById("pwdinput-searchbar").classList.remove("d-none")
    document.getElementById("input-searchbar").classList.add("d-none")
    
    let login_handicapped_singleton = (()=>{
        //Private Members:
        let fields = {
        

        }

        

        function EventBubble(){
           
        }

        

        //Public Members
        return{
            getInstance: ()=>{
                EventBubble()
                let speech_ai_instance = speech_ai.getInstance(fields)
            }
            
        }
    })()

    let login_handicapped_instance = login_handicapped_singleton.getInstance()
    
  
}
