
let options = { weekday: 'long', month: 'long', day: 'numeric' };
let help;

function updateDate(){
    let date=new Date();
    document.querySelector('.time').innerHTML=date.toLocaleTimeString();
    document.querySelector('.date').innerHTML=date.toLocaleDateString("en-US", options);
    let greetings;
    if (date.getHours()>=6 && date.getHours()<12) {greetings="Good morning"; help="morning";}
    if (date.getHours()>=12 && date.getHours()<18) {greetings="Good afternoon";help="afternoon";}
    if (date.getHours()>=18 && date.getHours()<24) {greetings="Good evening";help="evening";}
    if (date.getHours()>=0 && date.getHours()<6) {greetings="Good night";help="night";}
    document.querySelector('.greeting').innerHTML=greetings;
}
updateDate();
setInterval(updateDate, 1000);


function preLoad(){
    for (let i=1;i<21;i++){
        var img=new Image();
        let j=i;
        if (j<10) j='0' +j;
        img.src="https://raw.githubusercontent.com/Padede/stage1-tasks/assets/images/"  + help + "/" + j + ".jpg" ;
    }
}
preLoad();
let input=document.querySelector('.name');
input.value=localStorage.getItem('input');
input.oninput = () => {
    localStorage.setItem('input', input.value)
};

//let url="https://raw.githubusercontent.com/Padede/stage1-tasks/assets/images/afternoon/11.jpg"
let ran=(Math.floor(Math.random() * (21 - 1) + 1));
if (ran<10) ran='0' +ran;
let url="https://raw.githubusercontent.com/Padede/stage1-tasks/assets/images/" + help + "/" + ran + ".jpg" ;
document.body.style.background=`url('${url}') center/cover, rgba(0, 0, 0, 0.5)`;
document.body.style.backgroundSize="cover";

function next(){
    if (ran!=20)  {ran++; if (ran<10) ran='0' +ran;}
    else ran='01';
    let url="https://raw.githubusercontent.com/Padede/stage1-tasks/assets/images/" + help + "/" + ran + ".jpg" ;
    document.body.style.background=`url('${url}') center/cover, rgba(0, 0, 0, 0.5)`;
}

function prev(){
    if (ran!=01)   {ran--; if (ran<10) ran='0' +ran;}
    else ran='20'; 
    let url="https://raw.githubusercontent.com/Padede/stage1-tasks/assets/images/" + help + "/" + ran + ".jpg" ;
    document.body.style.background=`url('${url}') center/cover, rgba(0, 0, 0, 0.5)`;
}



let inputWeather=document.querySelector('.city');
if (localStorage.getItem('inp') !== null  && localStorage.getItem('inp')!==""){
    inputWeather.value=localStorage.getItem('inp');
}
else inputWeather.value="Minsk";
    inputWeather.oninput = () => {
        localStorage.setItem('inp', inputWeather.value)
    };



Weather();


function Weather(){
    
    let apiKey="7b68f4e59179a584892201957c6bd6c1";
    let city=document.querySelector('.city').value;
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    axios.get(url).then(res => {
    document.querySelector('.temperature').innerHTML = Math.floor(res.data.main.temp) + '°С' + " " +res.data.weather[0].main;
    document.querySelector('.humidity').innerHTML = "Humidity: " + Math.floor(res.data.main.humidity) + '%'
    document.querySelector('.wind').innerHTML = 'Wind speed: ' + Math.floor(res.data.wind.speed) + " m/s"
    let secondImage = document.getElementById('weatherimg');
    document.querySelector(".afterbegin").src=`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
    console.log(res)
    }).catch(err=>{
        document.querySelector('.temperature').innerHTML="Error! city not found!";
        document.querySelector('.humidity').innerHTML="";
        document.querySelector('.wind').innerHTML="";
        document.querySelector(".afterbegin").src="";

        console.log(err);
    })
}

fetch("./quotes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.quotes[0].author);
  })