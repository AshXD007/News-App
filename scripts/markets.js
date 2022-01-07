//declare & grab
const hero = document.querySelector('.hero');



//events


window.addEventListener('DOMContentLoaded', ()=>{
    fetchData(0,30);
})



//functions
const fetchData = async (x,y) =>{
    const response = await fetch(`https://api.coinlore.net/api/tickers/?start=${x}&limit=${y}`);
    const data = await response.json();
    console.log(data);
    for(let i = 0;i<data.data.length;i++){
        const symbols = data.data[i].symbol;
        const priceUSD = `$${data.data[i].price_usd}`;
        const change = data.data[i].percent_change_24h;
        let movement;
        if(change[0] === '-'){
            movement = '-';
        }else{
            movement = '+';
        }
        setView(symbols,priceUSD,change,movement);
    }
}
const setView = (sym,price,change,move) => {
    const lsItem = document.createElement('div');
    const lsLogo = document.createElement('img');
    const lsName = document.createElement('span');
    const lsMove = document.createElement('img');
    const lsPrice = document.createElement('span');
    lsItem.appendChild(lsLogo);
    lsItem.appendChild(lsName);
    lsItem.appendChild(lsMove);
    lsItem.appendChild(lsPrice);
    lsItem.classList.add('lsItem');
    lsLogo.classList.add('lsLogo');
    // https://cryptoicons.org/api/color/${sym.toLowerCase()}/200
    lsLogo.src = `https://creepy-corp.eu/git/jsupa/crypto-icons/get.php?token=${sym}`;
    lsName.classList.add('lsName');
    lsName.textContent = sym.toUpperCase();
    lsMove.classList.add('lsMove');
    lsPrice.classList.add('lsPrice');
    lsPrice.innerHTML = change +`<br>`+price;
    if(move === '+'){
        lsMove.src = `../assets/markets/icons8-increase.svg`;
        lsPrice.style.color = 'green';
    }else if (move === '-'){
        lsMove.src = `../assets/markets/icons8-decrease.svg`;
        lsPrice.style.color = 'red';
    }
    hero.appendChild(lsItem);
}
