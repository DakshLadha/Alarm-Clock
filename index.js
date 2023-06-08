const currentTime=document.querySelector("h1");
const alarmbtn=document.querySelector("button");
const content=document.querySelector(".content");
const menu=document.querySelectorAll("select");
// console.log(menu);
let alarmTime;  isAlarmSet=false;
ringtone=new Audio("alarm_ring.mp3");
for(let i=12;i>0;i--){
    i=i<10 ? "0"+i : i;
    let option= `<option value"${i}">${i}</option>`;
    menu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--){
    i=i<10 ? "0"+i : i;
    let option= `<option value"${i}">${i}</option>`;
    menu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2;i>0;i--){
    i=i<10 ? "0"+i : i;
    let ampm= i==1? "AM" : "PM";
    let option= `<option value"${ampm}">${ampm}</option>`;
    menu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}


setInterval(()=>{
    let date=new Date();
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    ampm="AM";

    if(h>=12){
        h=h-12;
        ampm="PM";
    }
    h=h==0 ? 12 : h;

    h=h<10 ? "0"+h:h;
    m=m<10 ? "0"+m:m;
    s=s<10 ? "0"+s:s;
    currentTime.innerHTML =`${h}:${m}:${s} ${ampm}`;
    if(alarmTime==`${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop=true;
    }
    
},1000);


function setAlarm(){

    if(isAlarmSet){
        alarmTime="";
        ringtone.pause();
        content.classList.remove("disable");
        alarmbtn.innerHTML="Set Alarm";
        return isAlarmSet=false;
    }


    let time=`${menu[0].value}:${menu[1].value} ${menu[2].value}`;

    if(time.includes("Hour")||time.includes("Minute")||time.includes("AM/PM")){
        return alert("Please, select a valid time to set alarm");
    }

    isAlarmSet=true;
    alarmTime=time;

    content.classList.add("disable");
    console.log(time);
    alarmbtn.innerHTML="Clear Alarm";
}

alarmbtn.addEventListener("click",setAlarm);