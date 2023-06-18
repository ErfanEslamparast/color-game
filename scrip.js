const colors=['#f7b081','#bad94e','#a3e4f0','#AFCBFF','#FFB86F','#E0CA3C','#7ee085','#c3eb9d','#e0dd5e','#928C6F'];
const items=document.querySelectorAll('.item');
const modal=document.querySelector(".modal-container");
const modalEnd=document.querySelector(".modalEnd")
const modalP=document.querySelector(".modal P");
const closeBtn=document.querySelector(".close");
let scoreText=document.querySelector('#score');
let score;
closeBtn.addEventListener("click",function(){
    modal.classList.remove("show");
    initialGame();
})
function lightenColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
function lightenAmount(){
    if(score<=10) return 90
    else if(score<=20) return 70
    else if(score<=30) return 50
    else if(score<=40) return 30
    else return 10
}
function nextLevel(){
   score++;
   colorizeItems();
}
function loseGame(){
    modal.classList.add("show");
    modalP.innerText="امتیاز شما:"+score;

}
function colorizeItems(){
    let mainColor=colors[Math.floor(Math.random()*colors.length)]
    items.forEach(item=>item.style.backgroundColor=mainColor)
    let diffrentItem=items[Math.floor(Math.random()*items.length)]
    diffrentItem.style.backgroundColor=lightenColor(mainColor,lightenAmount());
    scoreText.innerText=`امتیاز شما:${score}`;
    items.forEach(item=>
        {if(item==diffrentItem){
            item.removeEventListener('click',loseGame)
            item.addEventListener('click',nextLevel)
        }else{
            item.removeEventListener('click',nextLevel)
            item.addEventListener('click',loseGame)
        }
     } )
     if(score==50){
    modalEnd.classList.add('show');
    }
}
function initialGame(){
    score=0;
    colorizeItems();
}
initialGame();
