//Практика
// 1. Добавить модальное окно "игра окончена". В этом окне должно быть написано
// количество кротов, которые появились за время игры, сколько кротов было поймано и кнопка закрыть
// 2. Добавить уровни сложности (уменьшать или увеличивать время, которое крот проводит на поверхности)
// 3. Добавить таблицу рейтинга. Выводить последние 10 игр. В таблице должно быть шапка и колонки с именем и количеством очков.
// 4. Добавить валидацию на поле с именем. Чтобы мы не могли начать игру, пока имя не ввели. А если нажимать на кнопку старт,
// то справа от инпута появляется красная надпись вроде "Введите имя"


const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const score = document.querySelector('.score');
const startBtn = document.querySelector('.start');
const menu = document.querySelector('.menu');
const currentName = document.querySelector('#name');
const errorMessage = document.querySelector('.error-message');
const  finishForm = document.querySelector('.finish');
const  finishUserName = document.querySelector('.name-user');
const totalMoles = document.querySelector('.total-moles');
const caughtMoles = document.querySelector('.caught-moles');
const closePopup = document.querySelector('.close-popup');
const difficultLevel =document.querySelector('.difficult-level');
const btnTable = document.querySelector('.btn-rating');
const tableRes = document.querySelector('.table-res');
const tableBody = document.querySelector('.table tbody');
const closeTable = document.querySelector('.close-table');

let isPlaying = false;
let countMoles = 0;
let countMolesClick = 0;
let time = 0;

closePopup.addEventListener('click', function () {
    finishForm.style.display = 'none';
});

closeTable.addEventListener('click', function () {
    tableRes.style.display = 'none';
});

startBtn.addEventListener('click', startGame);
moles.forEach((mole) => {
    mole.addEventListener('click', catchMole)
});

function catchMole() {
    countMolesClick++;
    score.textContent = countMolesClick;
    this.parentElement.classList.remove('up');
    return countMolesClick;
}

function randomTime(min, max) {
    return Math.round( Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const id = Math.floor(Math.random() * holes.length);
    const hole = holes[id];
    return hole;
}

function showMole() {
    if(difficultLevel.value === 'light'){
        time = randomTime(1000, 2000);
    } else if(difficultLevel.value === 'medium'){
        time = randomTime(700, 1200);
    } else {
        time = randomTime(300, 700);
    }
    const hole = randomHole(holes);
    hole.classList.add('up');
    countMoles++;
    setTimeout(() => {
        hole.classList.remove('up');
        if (isPlaying){
            showMole();
        }
        else finishGame();
    }, time);
}

function startGame() {
    if (currentName.value === ''){
        errorMessage.style.display = 'block';
    }else {
        errorMessage.style.display = 'none';
        menu.style.display = 'none';
        countMolesClick = 0;
        score.textContent = '';
        showMole();
        isPlaying = true;
        setTimeout(() => {
            isPlaying = false;
        }, 3000)
    }
}

function finishGame(){
    finishForm.style.display = 'block';
    menu.style.display = 'block';
    const list = JSON .parse(localStorage.getItem('usersList'))|| [];
    list.push({name: currentName.value, level: difficultLevel.value, countClick: countMolesClick, countMoles: countMoles});
    localStorage.setItem('usersList', JSON.stringify(list));
    finishUserName.textContent = currentName.value;
    caughtMoles.textContent = countMolesClick;
    totalMoles.textContent = countMoles;
    countMolesClick = 0;
    countMoles = 0;
    score.textContent = '';
    currentName.value= '';
}

btnTable.addEventListener('click', function () {
    tableRes.style.display = 'block';
    let tr = '';
    let list = JSON .parse(localStorage.getItem('usersList'))|| [];
    for (let i = list.length - 1; i >= list.length - 10; i --){
        tr =`<tr>
                <td>${list[i].name}</td>
                <td>${list[i].level}</td>
                <td>${list[i].countClick}</td>
                <td>${list[i].countMoles}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', tr);
    }
});

localStorage.getItem('user');