const topicBtn = document.querySelectorAll(".intBtn");
const nextBtn = document.querySelector(".nextBtn");
const storedTopics = [];
const apiKey = "0b6ee3e8b2ffd5633d2402696d57cc66";
let userCountry = "";
let userCity = "";

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
  let resp = checkCity();
  if (storedTopics.length < 3) {
    alert("Minimum 3 Topics");
  }
  if(resp === 'error'){
    alert('wrong city / country');

  }
});

const checkCity = () => {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status = 200) {
        console.log(xhr.responseText);
      return 'found'
    }else{
        return 'error'
    }
  };
  xhr.open(
    "GET",
    `api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}`,false
  );
  xhr.send();
};
