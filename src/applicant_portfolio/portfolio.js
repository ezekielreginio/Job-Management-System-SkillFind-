

  if(location.href.indexOf('portfolio') != -1){

    let clicked_card = document.getElementsByClassName("portfolio_detail")
    let card_clickk = document.getElementsByClassName("card_click")
    let card_clickkk = document.getElementsByClassName("card_click2")
    for(let i = 0; i<clicked_card.length; i++){
      clicked_card[i].addEventListener("click", function(){
        
       if(clicked_card[i].classList.contains("task")){
        clicked_card[i].classList.remove("task")
        clicked_card[i].classList.add("task_click")
        for(let i =0; i<card_clickkk.length; i++){
          card_clickkk[i].classList.remove("d-none")
         }
      
       }

       else{
        clicked_card[i].classList.remove("task_click")
        clicked_card[i].classList.add("task")
        for(let i =0; i<card_clickk.length; i++){
          card_clickk[i].classList.remove("d-none")
         }
        
       }
      
      })
      
    }
    
  


    /*document.getElementById("portfolio_detail").addEventListener("click", function(){

      if(this.classList.contains("task")){
        this.classList.remove("task")
        this.classList.add("task_click")
        document.getElementById("card_click").classList.add("d-none")
        document.getElementById("card_click2").classList.remove("d-none")
      }
      else{
        this.classList.remove("task_click")
        this.classList.add("task")
        document.getElementById("card_click").classList.remove("d-none")
        document.getElementById("card_click2").classList.add("d-none")  
      }
    })*/

    
  }