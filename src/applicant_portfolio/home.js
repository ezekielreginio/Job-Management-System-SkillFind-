nav_portfolio = document.getElementsByClassName("nav-portfolio")
for (var i = 0; i < nav_portfolio.length; i++) {
    nav_portfolio[i].addEventListener("click", function(){
        link = this.getAttribute("href")
        window.location.replace(link)
    })
}


//let mods = document.getElementsByClassName("card-header")
//for(let i=0; i<mods.length; i++)
//{
  //  mods[i].classList.remove("cardss")
//}
