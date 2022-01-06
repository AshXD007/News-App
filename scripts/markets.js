//declare & grab
const hero = document.querySelector('.hero');



//events







//functions

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
    lsLogo.src = `https://cryptoicons.org/api/color/${sym.toLowerCase()}/400`;
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
