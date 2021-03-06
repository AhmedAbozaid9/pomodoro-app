//a sound
let sound = new Audio('sound.mp3')
//get the elements i need.
const input = document.querySelector('input');
let circles = document.querySelectorAll('.circle');
let btn = document.querySelector('.btn')
let body = document.querySelector('body');
let counter = document.querySelector('.counter')
//the value that the user chooses.
let finalValue = null;
//the interval
let intervalId
//add event listener to the timers
for(let i = 0; i < circles.length; i++){
    circles[i].addEventListener('click',function(){
       if(!isActivated()){
           this.classList.add('activeCircle');
       }
       if(isActivated()){
           deactivateAll()
           this.classList.add('activeCircle')
       }
       finalValue = valueOf(this.innerHTML)
    })

}
//add event listener to the body
document.body.addEventListener('click',function(e){
    if(e.target === e.currentTarget){
        deactivateAll();
        finalValue = null;
    }
})

//add event listener to the start button
btn.addEventListener('click',function(){
   if(finalValue !== null&& btn.innerHTML === 'Start'){
        btn.innerHTML = 'Stop';
        body.classList.add('start')
        setTimeout(function(){
            body.classList.add('showCount')
        },370)
        countDown(finalValue);
   }else if(btn.innerHTML === 'Stop'){
       clearInterval(intervalId);
       body.classList.remove('start')
       body.classList.remove('showCount')
       sound.play()
       btn.innerHTML = 'Start';
   }
   else{
       alert('please choose a time first');
   }
})

//a function that returns only the specified 
function valueOf(elementText){
    let isHours = false;
    if(elementText.includes('hr')){
        isHours = true;
    }
    let value = '';
    for(let j = 0;j < elementText.length;j++){
        for(let i = 0;i < 10;i++){
            if(parseInt(elementText[j]) === i){
                value += i;
            }
        }

    }
    //turn the value to a number in minutes
    value = parseInt(value);
    if(isHours){
        value*= 60;
    }
    return value;

}

//a function that counts down
function countDown(value){
    let sec = 60;
    intervalId = setInterval(() => {
        sec--;
        document.querySelector('span').innerText = value-1 + " : " + sec;
        if(sec < 1){
            sec = 60;
            value--;
        }
        if(value < 1){
            clearInterval(intervalId);
            //play sound
            sound.play()
        }
    }, 1000);
}

// a function that makes sure there's only one activated element
function isActivated(){
    let check = false;
    for(let i = 0; i < circles.length;i++){
        if(circles[i].classList.contains('activeCircle')){
            check = true;
        }
    }
    return check;
}
function deactivateAll(){
    for(let i = 0; i < circles.length;i++){
        circles[i].classList.remove('activeCircle');
    }
}
//add the dark mode
let darkbtn = document.querySelector('.activeDark');
darkbtn.addEventListener('click',function(){
    if(darkbtn.innerHTML === '<i class="fas fa-moon"></i>'){
        body.classList.add('darkMode');
        darkbtn.innerHTML = '<i class="fas fa-sun"></i>';
    }else if(darkbtn.innerHTML === '<i class="fas fa-sun"></i>'){
        body.classList.remove('darkMode')
        darkbtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
})

