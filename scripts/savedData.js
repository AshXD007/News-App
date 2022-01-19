// DECLARE & INITIALIZE
const topicBtn = document.querySelectorAll(".intBtn");
const nextBtn = document.querySelector(".nextBtn");
const storedTopics = [];
const spModal = document.querySelector('.startupPage');
const modal = document.querySelector('.modal');
const mdText = document.querySelector('.modalText');
const apiKey = "0b6ee3e8b2ffd5633d2402696d57cc66";
let userCountry = "";
let userCity = "";
let lat;
let lon;
let tempCC ;
let tempLL ;
// DOM LOADED
loaderElem.classList.add('loaderStop')
window.addEventListener('DOMContentLoaded',()=>{
  const checkData = localStorage.getItem('dataAV');
  if(!checkData){
    spModal.classList.add('sp-vis');
  }
  getLoc();
  setTimeout(()=>{
    if(!lat && !lon){
      toggleModal(3,removeModal)
    }
  },8000)
})


//  EVENT LISTENERS
topicBtn.forEach((element) => {
  element.addEventListener("click", () => {
    storedTopics.push(element.id);
    element.classList.add("pressed");
  });
});
nextBtn.addEventListener("click", () => {
  const Country = document.getElementById("countryInput").value;
  const City = document.getElementById("cityInput").value;
  userCity = City;
  userCountry = Country;
  checkApiCC();
  if(lat && lon){
    checkApiLL();
  }
  if (storedTopics.length < 3) {
    toggleModal(1,removeModal);
  }else{
    setLocalStorage('pref',storedTopics);
    
    setTimeout(()=>{
      if(tempLL === true ){
        spModal.classList.add('sp-vis');
        setLocalStorage('dataAV',true);
        location.reload();
      }else if(tempCC === true ){
        spModal.classList.add('sp-vis');
        setLocalStorage('dataAV',true);
        location.reload();
      }
    },1000);
  }

});


// FUNCTIONS

// check api with Country / City

const checkApiCC = async ()=>{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}`);
  const data = await response.json();
  if(data.message){
    console.log(data.message);
    console.log(`CC failed`);
    tempCC = false;
  }else{
    tempCC = true;
    console.log(`cc working`,data,storedTopics);
    setLocalStorage(`userCity`,userCity);
    setLocalStorage(`userCountry`,userCountry);
  }
}

// check if api working with LL
const checkApiLL = async () =>{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  const data = await response.json();
  if(data){
    console.log(`LL working`);
    tempLL = true;
    setLocalStorage(`userLatitude`,lat);
    setLocalStorage(`userLongitude`,lon);
  }else{
    console.log(`LL Failed`);
    tempLL = false;
  }
}


// get user loc
function getLoc(){
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      })
}

// show / hide popup
function toggleModal(n,callback){
  if(n==1){
    modal.classList.remove('md-vis');
    mdText.textContent = 'Please select minimum 3 topics ';
    setTimeout(callback,1500);
  }else if(n==2){
    modal.classList.remove('md-vis');
    mdText.textContent = 'Wrong City / Country '
    setTimeout(callback,1500);
  }else if(n==3){
    modal.classList.remove('md-vis');
    mdText.textContent = 'Cannot get access to location'
    setTimeout(callback,1500);
  }else if(n==4){
    modal.classList.remove('md-vis');
    mdText.textContent = 'Cannot get Weather report'
    setTimeout(callback,1500);
  }
}

function removeModal(){
  modal.classList.add('md-vis');
}


//set items to local storage
function setLocalStorage(key,value){
  localStorage.setItem(key,value);
}
