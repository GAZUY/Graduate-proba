import './style.css'
import '@justinribeiro/lite-youtube';
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'


(function() {
  
  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#parallax") as HTMLDivElement;
  const elem1 = document.querySelector("#planet") as HTMLDivElement;
  const elem2 = document.querySelector("#korabl") as HTMLDivElement;
  
  function parallax(e: { clientX: any; clientY: any; }) {
      let _w = window.innerWidth/2;
      let _h = window.innerHeight/2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let _depth1 = `${50 - (_mouseX - _w) * 0.001}% ${50 - (_mouseY - _h) * 0.001}%`;
      let _depth2 = `${50 - (_mouseX - _w) * 0.002}% ${50 - (_mouseY - _h) * 0.002}%`;
      let _depth3 = `${50 - (_mouseX - _w) * 0.006}% ${50 - (_mouseY - _h) * 0.006}%`;
      let x = `${_depth3}, ${_depth2}, ${_depth1}`;
      elem.style.backgroundPosition = x;
      elem1.style.backgroundPosition = x;
      elem2.style.backgroundPosition = x;
  }

})();

const menu = document.querySelector('#menu') as HTMLInputElement;
const register = document.querySelector('.register') as HTMLDivElement;
const save = document.querySelector('.save') as HTMLDivElement;
const download = document.querySelector('.download') as HTMLDivElement;
const help = document.querySelector('.help') as HTMLDivElement;

menu.onclick = async function(event: MouseEvent){
  // console.log(register.getAttribute('class'))
  // let target = event.target as HTMLElement
  if (register.getAttribute('class') == "register hiden") {
    register.classList.toggle("hiden")
    await wait(2000)
    save.classList.toggle("hiden")
    await wait(2000)
    download.classList.toggle("hiden")
    await wait(2000)
    help.classList.toggle("hiden")
  } else {
    register.classList.toggle("hiden")
    help.classList.toggle("hiden")
  }
}
// ========================================================================
const modal = document.querySelector("#my_modal") as HTMLDivElement
const span = modal.querySelector(".close_modal_window") as HTMLSpanElement
const modal_content = modal.querySelector(".modal_content")
const content = modal.querySelector("#content")as HTMLDivElement

help.onclick = function () {
   modal.style.display = "block";
   content.insertAdjacentHTML('afterbegin', '<lite-youtube videoid="3_PB0b-UaX8"></lite-youtube>')

}

span.onclick = function () {
   modal.style.display = "none";
   content.innerHTML = ''
}

window.onclick = function (event) {
   if (event.target == modal) {
       modal.style.display = "none";
   }
}
// ==========================================================================


let cube = document.querySelector('.cube') as HTMLElement

let x = 0,
    y = 0;

document.addEventListener('keydown', function(e){
  if(e.code == 'ArrowLeft') y -= 5
  if(e.code == 'ArrowRight') y += 5
  if(e.code == 'ArrowUp') x += 5
  if(e.code == 'ArrowDown') x -= 5
 
 cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg)`;
});

document.addEventListener('DOMContentLoaded',function(){
 
 
  document.onmousedown = function(event){

    let x = 0
    let y = 0
    let target = event;
    let disX = target.clientX - y
    let disY = target.clientY - x
  
      document.onmousemove = function(event){
        let target = event;
        x = target.clientX - disX
        y = target.clientY - disY
    
        cube.style.transform = '  rotateY('+x/2+'deg) rotateX('+(y/2)+'deg)'
        // console.log (timeDown.getMilliseconds() - timeMove.getMilliseconds())
      };
      document.onmouseup = function(){
          document.onmousemove = null
          document.onmouseup = null
      };
      return false
  }
},false)


//========================================================================================

// ПЯТНАШКИ
// ===================================================
// Обращаемся к элементам, создаем массив DIVов эаполняем через цикл id.
const reset = document.querySelector('#reset') as HTMLButtonElement
const demo = document.querySelector('#demo') as HTMLButtonElement
const tag = document.querySelector('.front') as HTMLDivElement 
let elDivBack = document.querySelector('.back') as HTMLDivElement
let picture = document.querySelector('.picture') as HTMLDivElement
let motion = document.querySelector('#motion') as HTMLInputElement

let elDiv: HTMLDivElement[] = []
let elDivB: HTMLDivElement[] = []
let elDivP : HTMLDivElement[] = []
let demoArr: number[] = []
let count: number = 0



for (let i = 1; i < 16; i ++){
  elDiv.push(document.createElement ('div'))
  elDivB.push(document.createElement ('div'))
  elDivP.push(document.createElement ('div'))
  elDiv[i-1].setAttribute('id', `D${i}`)
  elDivB[i-1].setAttribute('id', `B${i}`)
  elDivP[i-1].setAttribute('id', `P${i}`)
}
elDiv.push(document.createElement ('div'))
elDivB.push(document.createElement ('div'))
elDivP.push(document.createElement ('div'))
  elDiv[15].setAttribute('id', `D${0}`)
  elDivB[15].setAttribute('id', `B${0}`)
  elDivP[15].setAttribute('id', `P${0}`)

  elDivB.map((el) => elDivBack.appendChild(el))
elDiv.map((el) =>  tag.appendChild(el))
elDivP.map((el) => picture.appendChild(el))



  reset.onclick = async function(event){
    let target = event.target as HTMLButtonElement
    count = 0
    motion.value = count+''
    if (target) {
      let d0 = document.querySelector('#D0') as HTMLDivElement
      shuffleArray(elDiv.indexOf(d0))
      console.log(demoArr)
    }
  }


 
  //=======================================================
  // перемешиваем массив перемещая id с элемента на элемент в случайном порядкеЭ но с условием перемещения (верхЭ низ, право, лево). заполняем родительский DIV элементами массива. Записываем ходы в массив.


function shuffleArray (indexD0:number){
  demoArr = []
  let whereToMove 
  do {
   let round = []
   if (indexD0 + 4 <= 15 && 0 <= indexD0 + 4 ) round.push(indexD0 + 4)
   if (indexD0 - 4 <= 15 && 0 <= indexD0 - 4 ) round.push(indexD0 - 4)
   if (indexD0 + 1 <= 15 && 0 <= indexD0 + 1 && indexD0 !=3 && indexD0 !=7 && indexD0 !=11) round.push(indexD0 + 1)
   if (indexD0 - 1 <= 15 && 0 <= indexD0 - 1 && indexD0 !=4 && indexD0 !=8 && indexD0 !=12) round.push(indexD0 - 1)
  // {debugger}
   whereToMove = round[Math.floor(Math.random() * round.length)]
   let atr1 = elDiv[indexD0].getAttribute('id')
   
        elDiv[indexD0].setAttribute('id', `${elDiv[whereToMove].getAttribute('id')}`)
        elDiv[whereToMove].setAttribute('id', `${atr1}`)
   let atr1B = elDivB[indexD0].getAttribute('id')
        elDivB[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
        elDivB[whereToMove].setAttribute('id', `${atr1B}`)
   let atr1P = elDivP[indexD0].getAttribute('id')
        elDivP[indexD0].setAttribute('id', `${elDivP[whereToMove].getAttribute('id')}`)
        elDivP[whereToMove].setAttribute('id', `${atr1P}`)
        indexD0 = whereToMove 
        demoArr.push(indexD0)   
      
  } while (indexD0 != 0);
  do {
    let round = []
    if (indexD0 + 4 <= 15 && 0 <= indexD0 + 4 ) round.push(indexD0 + 4)
    if (indexD0 - 4 <= 15 && 0 <= indexD0 - 4 ) round.push(indexD0 - 4)
    if (indexD0 + 1 <= 15 && 0 <= indexD0 + 1 && indexD0 !=3 && indexD0 !=7 && indexD0 !=11) round.push(indexD0 + 1)
    if (indexD0 - 1 <= 15 && 0 <= indexD0 - 1 && indexD0 !=4 && indexD0 !=8 && indexD0 !=12) round.push(indexD0 - 1)
   // {debugger}
    whereToMove = round[Math.floor(Math.random() * round.length)]
    let atr1 = elDiv[indexD0].getAttribute('id')
         elDiv[indexD0].setAttribute('id', `${elDiv[whereToMove].getAttribute('id')}`)
         elDiv[whereToMove].setAttribute('id', `${atr1}`)
    let atr1B = elDivB[indexD0].getAttribute('id')
         elDivB[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
         elDivB[whereToMove].setAttribute('id', `${atr1B}`)
         let atr1P = elDivP[indexD0].getAttribute('id')
         elDivP[indexD0].setAttribute('id', `${elDivP[whereToMove].getAttribute('id')}`)
         elDivP[whereToMove].setAttribute('id', `${atr1P}`)
         indexD0 = whereToMove 
         demoArr.push(indexD0)   
       
   } while (indexD0 != 15);
  demoArr.unshift(15)
  console.log (tag.querySelectorAll ('div'))
  console.log (elDivBack.querySelectorAll ('div'))
}

 
 //======================================================================
//  прописываем логику игры (обмен ID). Добавляем все ходы в массив.
 
 
tag.onclick = function(event){
  let target = event.target as any
  
    if (target.id){
       let d0 = tag.querySelector('#D0') as HTMLDivElement
       let P0 = picture.querySelector('#P0') as HTMLDivElement
       
       if (elDiv.indexOf(d0) == 7 && elDiv.indexOf(target) == 8 || elDiv.indexOf(d0) == 8 && elDiv.indexOf(target) == 7 ||
       elDiv.indexOf(d0) == 3 && elDiv.indexOf(target) == 4 || elDiv.indexOf(d0) == 4 && elDiv.indexOf(target) == 3 ||
       elDiv.indexOf(d0) == 11 && elDiv.indexOf(target) == 12 || elDiv.indexOf(d0) == 12 && elDiv.indexOf(target) == 11)
       { 
       }else{
         if (Math.max(elDiv.indexOf(d0), elDiv.indexOf(target)) - Math.min(elDiv.indexOf(d0), elDiv.indexOf(target)) == 1 || Math.max(elDiv.indexOf(d0), elDiv.indexOf(target)) - Math.min(elDiv.indexOf(d0), elDiv.indexOf(target)) == 4){
          demoArr.push(elDiv.indexOf(target))
        let atr = elDiv[elDiv.indexOf(d0)].getAttribute('id')
        elDiv[elDiv.indexOf(d0)].setAttribute('id', `${elDiv[elDiv.indexOf(target)].getAttribute('id')}`)
        elDiv[elDiv.indexOf(target)].setAttribute('id', `${atr}`)

        let atrB = elDivB[elDiv.indexOf(d0)].getAttribute('id')
        elDivB[elDiv.indexOf(d0)].setAttribute('id', `${elDivB[elDiv.indexOf(target)].getAttribute('id')}`)
        elDivB[elDiv.indexOf(target)].setAttribute('id', `${atrB}`)

        let atrP = elDivP[elDiv.indexOf(d0)].getAttribute('id')
        elDivP[elDiv.indexOf(d0)].setAttribute('id', `${elDivP[elDiv.indexOf(target)].getAttribute('id')}`)
        elDivP[elDiv.indexOf(target)].setAttribute('id', `${atrP}`)
        }
       }
       count ++
       motion.value = count+''
      
       const tagEl = tag.querySelectorAll('DIV') as NodeListOf<Element>
      
       let i1 = 1
       for (let el of tagEl) {
         console.log((String(el.getAttribute('id'))))
         if ((String(el.getAttribute('id'))) != 'D'+i1){
         
         }if ((String(el.getAttribute('id'))) == 'D0' && i1>15){
          //  tag.insertAdjacentHTML('afterbegin', `<div>ПОБЕДА</div>`)
          modal.style.display = "block";
          content.innerHTML = ''
          content.insertAdjacentHTML('afterbegin', '<p>ПОБЕДА</p>')
          //  tagEl = []
          //  demoArr=[]
          }
           i1 ++
        }
    }
    console.log (demoArr)
}


picture.onclick = function(event){
  let target = event.target as any
  
    if (target.id){
       let B0 = elDivBack.querySelector('#B0') as HTMLDivElement
       let P0 = picture.querySelector('#P0') as HTMLDivElement
       
      
       if (elDivP.indexOf(P0) == 7 && elDivP.indexOf(target) == 8 || elDivP.indexOf(P0) == 8 && elDivP.indexOf(target) == 7 ||
       elDivP.indexOf(P0) == 3 && elDivP.indexOf(target) == 4 || elDivP.indexOf(P0) == 4 && elDivP.indexOf(target) == 3 ||
       elDivP.indexOf(P0) == 11 && elDivP.indexOf(target) == 12 || elDivP.indexOf(P0) == 12 && elDivP.indexOf(target) == 11)
       {
        
       }else{
         if (Math.max(elDivP.indexOf(P0), elDivP.indexOf(target)) - Math.min(elDivP.indexOf(P0), elDivP.indexOf(target)) == 1 || Math.max(elDivP.indexOf(P0), elDivP.indexOf(target)) - Math.min(elDivP.indexOf(P0), elDivP.indexOf(target)) == 4){
          demoArr.push(elDivP.indexOf(target))
          console.log (elDivP.indexOf(target))
        let atrP = elDivP[elDivP.indexOf(P0)].getAttribute('id')
        elDivP[elDivP.indexOf(P0)].setAttribute('id', `${elDivP[elDivP.indexOf(target)].getAttribute('id')}`)
        elDivP[elDivP.indexOf(target)].setAttribute('id', `${atrP}`)

        let atr = elDiv[elDivP.indexOf(P0)].getAttribute('id')
        
        elDiv[elDivP.indexOf(P0)].setAttribute('id', `${elDiv[elDivP.indexOf(target)].getAttribute('id')}`)
        elDiv[elDivP.indexOf(target)].setAttribute('id', `${atr}`)

        let atrB = elDivB[elDivP.indexOf(P0)].getAttribute('id')
        
        elDivB[elDivP.indexOf(P0)].setAttribute('id', `${elDivB[elDivP.indexOf(target)].getAttribute('id')}`)
        elDivB[elDivP.indexOf(target)].setAttribute('id', `${atrB}`)
        }
      } 
      const tagEl = tag.querySelectorAll('DIV') as NodeListOf<Element>
      
      let i1 = 1
      for (let el of tagEl) {
        console.log((String(el.getAttribute('id'))))
        if ((String(el.getAttribute('id'))) != 'D'+i1){
        
        }if ((String(el.getAttribute('id'))) == 'D0' && i1>=15){
         //  tag.insertAdjacentHTML('afterbegin', `<div>ПОБЕДА</div>`)
          console.log('ПОБЕДА')
         //  tagEl = []
          demoArr=[]
         }
          i1 ++
       }   
    }
    console.log(demoArr)
}


// ========================================================================= 




     
      function wait(ms: number) {
        return new Promise((resolve)=>{setTimeout(()=>resolve(true),ms)})
      }

      demo.onclick = async function(event){
        let target = event.target as HTMLButtonElement
        count = 0
       motion.value = count+''
        if (target) {
          for (let i =0; i < demoArr.length-1; i++){
            if (demoArr[i] == demoArr[i+2]){
              demoArr.splice(i+1,2)
            }
          }
          for (let i =0; i < demoArr.length-1; i++){
            if (demoArr[i] == demoArr[i+2]){
              demoArr.splice(i+1,2)
            }
          }
          console.log(demoArr)
          let a = demoArr[demoArr.length - 1]

            demoArr.unshift(15) 
            for (let i = demoArr.length - 2; i >=0; i-- ){
                   
              await wait(400) 
              let atr = elDiv[demoArr[i]].getAttribute('id')
              elDiv[demoArr[i]].setAttribute('id', `${elDiv[a].getAttribute('id')}`)
              elDiv[a].setAttribute('id', `${atr}`)
              // a = demoArr[i]
              
            
              let atrB = elDivB[demoArr[i]].getAttribute('id')
              elDivB[demoArr[i]].setAttribute('id', `${elDivB[a].getAttribute('id')}`)
              elDivB[a].setAttribute('id', `${atrB}`)
               
              let atrP = elDivP[demoArr[i]].getAttribute('id')
              elDivP[demoArr[i]].setAttribute('id', `${elDivP[a].getAttribute('id')}`)
              elDivP[a].setAttribute('id', `${atrP}`)
              a = demoArr[i]
              //=========================================
             
            }
            demoArr = []
        }
          
      }
        // let tagEl = tag.querySelectorAll('DIV') as NodeListOf<Element>
        // console.log (tagEl)
        // let i = 1
        // for (let el of tagEl) {
        //   if (parseInt(String(el.getAttribute('id'))) != i){
        //     break
        //   } if (parseInt(String(el.getAttribute('id'))) == i && i==16){
        //     tag.insertAdjacentHTML('afterbegin', `<p>ПОБЕДА</p>`)
        //     console.log('ПОБЕДА')

        //   }
        //   i++  
        // }
        // while( i = 16){
        //   if(parseInt(String(tagEl[i].getAttribute('id'))) ==  (i+1)){
        //     i++ 
        //   }else{
        //     break
        //   }
        // }
        // tag.insertAdjacentHTML('afterbegin', `<p>ПОБЕДА</p>`)
        // for (let i = 0; i< 16; i ++){
        //   console.log (tagEl[i].getAttribute('id'))
        //   if(parseInt(String(tagEl[i].getAttribute('id'))) ==  (i+1) && i == 15){
          
        //       tag.insertAdjacentHTML('afterbegin', `<p>ПОБЕДА</p>`) 
        //     }else{
        //       break
            
        //   }
  
        // }
      
function el(value: HTMLDivElement, index: number, array: HTMLDivElement[]): void {
  throw new Error('Function not implemented.')
}
// let timer = document.getElementById('timer');
// let startBtn = document.getElementById('startBtn');
// let pauseBtn = document.getElementById('pauseBtn');
// let resetBtn = document.getElementById('resetBtn');

// let seconds = 0;
// let minutes = 0;
// let hours = 0;
// let interval;

// function updateTime() {
//   seconds++;
//   if (seconds === 60) {
//     minutes++;
//     seconds = 0;
//   }
//   if (minutes === 60) {
//     hours++;
//     minutes = 0;
//   }
//   timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// startBtn.addEventListener('click', () => {
//   interval = setInterval(updateTime, 1000);
//   startBtn.disabled = true;
//   pauseBtn.disabled = false;
//   resetBtn.disabled = false;
// });

// pauseBtn.addEventListener('click', () => {
//   clearInterval(interval);
//   startBtn.disabled = false;
//   pauseBtn.disabled = true;
// });

// resetBtn.addEventListener('click', () => {
//   clearInterval(interval);
//   seconds = 0;
//   minutes = 0;
//   hours = 0;
//   timer.textContent = '00:00:00';
//   startBtn.disabled = false;
//   pauseBtn.disabled = true;
//   resetBtn.disabled = true;
// });

