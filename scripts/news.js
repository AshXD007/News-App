// declare & initialize
const pref = localStorage.getItem('pref');
const userPref = pref.split(",");
const loaderElem = document.querySelector('.loader');
userPref.push('all');
const heroElem = document.querySelector('.hero');



// window 
window.addEventListener('DOMContentLoaded',()=>{
    getData()
    setTimeout(() => {
        loaderElem.classList.add('loaderStop');
        heroElem.classList.remove('loaderWorking')
    }, 2500);
})


//functions

const getData = async () => {
    for(let i = 0 ; i < userPref.length ; i++){
        console.log(userPref[i]);
        const response = await fetch(`https://inshortsapi.vercel.app/news?category=${userPref[i]}`);
        const data = await response.json();
        console.log(data);
        for(let j = 0 ; j<data.data.length ; j++){
        const title = data.data[j].title;
        const imgURL = data.data[j].imageUrl;
        const urlL = data.data[j].readMoreUrl;
        setView(title,imgURL)
        }
    }
}

const setView = (title,image) =>{
    const newsItem = document.createElement('div');
    newsItem.classList.add('newsItem');
    const itemImg = document.createElement('img');
    const itemText = document.createElement('span');
    itemImg.classList.add('itemImg');
    itemImg.src = image;
    itemText.innerHTML = title;
    itemText.classList.add('itemText');
    heroElem.appendChild(newsItem);
    newsItem.appendChild(itemImg);
    newsItem.appendChild(itemText);
}


