const gameArea = document.querySelector('.gameArea');
document.addEventListener('DOMContentLoaded',init);
const game = {
    row:7,
    col:7,
    arr : [],
    ani : {},
    max:5,
    actives:0,
    inPlay:false,
    gameBtn : {},
    hit: 0,
    miss: 0,
    dif: 3

};
function init(){
    game.max = 7 - game.dif
    gameArea.innerHTML = "";
    let temp = `Score ${game.hit} vs ${game.miss} `;
    game.scoreBoard = createNewElement(gameArea, "div", "temp", "scoreboard");
    game.gameBtn = createNewElement(gameArea, "button", "Start", "btn");
    game.gameBtn.addEventListener("click", () => {
        if(game.gameBtn.textContent=="Start"){
        game.inPlay = true;
        game.ani = requestAnimationFrame(startGame);
        game.gameBtn.textContent = 'Stop';
        }else{
        cancelAnimationFrame(game.ani);
        game.gameBtn.textContent = "Start";
        game.inPlay = false;
      }
    });
    const main = createNewElement(gameArea, "div", "", "gridContainer");
    buildGrid(main);

}

function startGame(){
    const total = game.max > game.arr.length ? game.arr.length : game.max;
    const temp = Math.floor(Math.random()*103);
    if((game.actives < total) && temp > (50+(game.dif*10))){
        makeActive(makeSelect());
    }
    if(game.inPlay){
        game.arr.forEach((el)=>{
            if(el.counter > 0){
                el.counter--;
                //el.textContent = el.counter;
                let temp = Math.ceil(Number(el.counter)/10)/10;
                el.style.opacity = temp;
                if(el.counter <= 0){
                    removeActive(el);
                    game.miss++;
                    updateScore();
                }
            }
        })
        game.ani = requestAnimationFrame(startGame);
    }
}

function makeSelect(){
    const sel = Math.floor(Math.random() * game.arr.length);

    return game.arr[sel];    
}

function makeActive(el){
    if(el.classList.contains('active')){
        console.log('already there');
        console.log(el);

        return makeActive(makeSelect());
    }else{
        game.actives++;
        el.counter = Math.floor(Math.random() * 200) + 25 + (game.dif*25);
        el.classList.add("active");
        //setTimeout(removeActive,timer, el);
        return true;
    }   
}

function removeActive(myEle){
    myEle.counter = 0;
    myEle.textContent = '-';
    myEle.classList.remove("active");
    game.actives--;
}

function buildGrid(main){
    const dim = {x:'',y:''}
    for(let y = 0; y<game.row;y++){
        dim.y += ' auto ';
        for(let x=0;x<game.col; x++){
            if(y==0){dim.x += " auto ";}
            const cell = y*game.col+x+1;
            const el = createNewElement(main,'div','-','grid-item');
            el.counter = 0;
            el.addEventListener('click',hitButton);
            game.arr.push(el);
        }
    }
    main.style.gridTemplateColumns = dim.x;
    main.style.gridTemplateRows = dim.y;
}

function hitButton(e){
    console.log(e.target);
    const el = e.target;
    if(el.classList.contains('active')){
        console.log('hit');
        game.hit++;
        updateScore();
        removeActive(el);
    }else{
        game.miss++;
        console.log('miss');
        updateScore();
    }
}

function updateScore(){
    let temp = `Score ${game.hit} vs ${game.miss} `;
    game.scoreBoard.textContent = temp;
}

function createNewElement(parent,ele,html,myClass){
    const el = document.createElement(ele);
    el.classList.add(myClass);
    el.innerHTML = html
    parent.append(el);
    return el;
}