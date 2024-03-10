import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
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
// let cube = document.querySelector('.cube') as HTMLElement
// cube.classList.add('rotate')

// let x = 0,
//     y = 0;

// document.addEventListener('keydown', function(e){
//   if(e.code == 'ArrowLeft') y -= 5
//   if(e.code == 'ArrowRight') y += 5
//   if(e.code == 'ArrowUp') x += 5
//   if(e.code == 'ArrowDown') x -= 5
 
//  cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg)`;
// });

// document.addEventListener('DOMContentLoaded',function(){
 
//   cube.dataset.x = '0'
//   cube.dataset.y = '0'
  
//   document.onmousedown = function(event){
//     let x = 0
//     let y = 0
//     cube.classList.remove('rotate')
//     let target = event;
//     let disX = target.clientX - y
//     let disY = target.clientY - x
//     document.onmousemove = function(event){
//       let target = event;
//       x = target.clientX - disX
//       y = target.clientY - disY
//       cube.style.transform = '  rotateY('+cube.dataset.x+x+'deg) rotateX('+(+cube.dataset.y-y)+'deg)'
//     };
//     document.onmouseup = function(){
//       document.onmousemove = null
//       document.onmouseup = null
//       cube.dataset.x = x.toString()
//       cube.dataset.y = y.toString()
      
//       };
//       return false
//   }
// },false)

//========================================================================================

// ПЯТНАШКИ
// ===================================================
// Обращаемся к элементам, создаем массив DIVов эаполняем через цикл id.
const reset = document.querySelector('#reset') as HTMLButtonElement
const demo = document.querySelector('#demo') as HTMLButtonElement
const tag = document.querySelector('.front') as HTMLDivElement 
let elDivBack = document.querySelector('.back') as HTMLDivElement
let elDiv: HTMLDivElement[] = []
let elDivB: HTMLDivElement[] = []
let demoArr: number[] = []


for (let i = 1; i < 16; i ++){
  elDiv.push(document.createElement ('div'))
  elDivB.push(document.createElement ('div'))
  elDiv[i-1].setAttribute('id', `D${i}`)
  elDivB[i-1].setAttribute('id', `B${i}`)
}
elDiv.push(document.createElement ('div'))
elDivB.push(document.createElement ('div'))
  elDiv[15].setAttribute('id', `D${0}`)
  elDivB[15].setAttribute('id', `B${0}`)

  elDivB.map((el) => elDivBack.appendChild(el))
elDiv.map((el) =>  tag.appendChild(el))



  reset.onclick = async function(event){
    let target = event.target as HTMLButtonElement
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
   console.log (atr1)
   
        elDiv[indexD0].setAttribute('id', `${elDiv[whereToMove].getAttribute('id')}`)
        elDiv[whereToMove].setAttribute('id', `${atr1}`)
   let atr1B = elDivB[indexD0].getAttribute('id')
   console.log (atr1B)
        elDivB[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
        elDivB[whereToMove].setAttribute('id', `${atr1B}`)
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
    console.log (atr1)
    
         elDiv[indexD0].setAttribute('id', `${elDiv[whereToMove].getAttribute('id')}`)
         elDiv[whereToMove].setAttribute('id', `${atr1}`)
    let atr1B = elDivB[indexD0].getAttribute('id')
    console.log (atr1B)
         elDivB[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
         elDivB[whereToMove].setAttribute('id', `${atr1B}`)
         indexD0 = whereToMove 
         demoArr.push(indexD0)   
       
   } while (indexD0 != 15);
  // do {
  //   let round = []
  //   if (indexD0 + 4 <= 15 && 0 <= indexD0 + 4 ) round.push(indexD0 + 4)
  //   if (indexD0 - 4 <= 15 && 0 <= indexD0 - 4 ) round.push(indexD0 - 4)
  //   if (indexD0 + 1 <= 15 && 0 <= indexD0 + 1 && indexD0 !=3 && indexD0 !=7 && indexD0 !=11) round.push(indexD0 + 1)
  //   if (indexD0 - 1 <= 15 && 0 <= indexD0 - 1 && indexD0 !=4 && indexD0 !=8 && indexD0 !=12) round.push(indexD0 - 1)
  //   whereToMove = round[Math.floor(Math.random() * round.length)]
  //   let atr2 = elDiv[indexD0].getAttribute('id')
  //   console.log (atr2)
  //       elDiv[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
  //       elDiv[whereToMove].setAttribute('id', `${atr2}`)
  //   let atr2B = elDivB[indexD0].getAttribute('id')
  //   console.log (atr2B)
  //       elDivB[indexD0].setAttribute('id', `${elDivB[whereToMove].getAttribute('id')}`)
  //       elDivB[whereToMove].setAttribute('id', `${atr2B}`)
  //       indexD0 = whereToMove 
  //       demoArr.push(indexD0)   
      
  // } while (indexD0 != 15);
  demoArr.unshift(15)
  console.log (tag.querySelectorAll ('div'))
  console.log (elDivBack.querySelectorAll ('div'))
}


// elDiv.forEach((el) => elDivB.push(el))
// elDivB.map((el) => elDivBack.appendChild(el))
// elDiv.map((el) =>  tag.appendChild(el))
 
//  console.log(elDiv)
//  console.log(elDivB)
 
 //======================================================================
//  прописываем логику игры (обмен ID). Добавляем все ходы в массив.
 


// let d0 = document.querySelector('#D0') as HTMLDivElement
// shuffleArray(elDiv.indexOf(d0)) 
tag.onclick = function(event){
  let target = event.target as any
  
    if (target.id){
       let d0 = tag.querySelector('#D0') as HTMLDivElement
       let d0B = elDivBack.querySelector('#D0') as HTMLDivElement
       
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
        }
       }
      
        
    }
    console.log(demoArr)
  
}


elDivBack.onclick = function(event){
  let target = event.target as any
  
    if (target.id){
       let B0 = elDivBack.querySelector('#B0') as HTMLDivElement
       
      
       if (elDivB.indexOf(B0) == 7 && elDivB.indexOf(target) == 8 || elDivB.indexOf(B0) == 8 && elDivB.indexOf(target) == 7 ||
       elDivB.indexOf(B0) == 3 && elDivB.indexOf(target) == 4 || elDivB.indexOf(B0) == 4 && elDivB.indexOf(target) == 3 ||
       elDivB.indexOf(B0) == 11 && elDivB.indexOf(target) == 12 || elDivB.indexOf(B0) == 12 && elDivB.indexOf(target) == 11)
       {
        
       }else{
         if (Math.max(elDivB.indexOf(B0), elDivB.indexOf(target)) - Math.min(elDivB.indexOf(B0), elDivB.indexOf(target)) == 1 || Math.max(elDivB.indexOf(B0), elDivB.indexOf(target)) - Math.min(elDivB.indexOf(B0), elDivB.indexOf(target)) == 4){
          demoArr.push(elDivB.indexOf(target))
          console.log (elDivB.indexOf(target))
        let atrB = elDivB[elDivB.indexOf(B0)].getAttribute('id')
        elDivB[elDivB.indexOf(B0)].setAttribute('id', `${elDivB[elDivB.indexOf(target)].getAttribute('id')}`)
        elDivB[elDivB.indexOf(target)].setAttribute('id', `${atrB}`)

        let atr = elDiv[elDivB.indexOf(B0)].getAttribute('id')
        
        elDiv[elDivB.indexOf(B0)].setAttribute('id', `${elDiv[elDivB.indexOf(target)].getAttribute('id')}`)
        elDiv[elDivB.indexOf(target)].setAttribute('id', `${atr}`)
        }
       }
      
        
    }
    console.log(demoArr)
}





// =============================================================
// demo.onclick = function(event){
//   let target = event.target as HTMLButtonElement
//   if (target){
//     let a = demoArr[demoArr.length - 1]
//   for (let i = demoArr.length - 2; i >= 0; i-- ){
//      if (demoArr[i] == demoArr[i-2]) demoArr.splice(demoArr[i-2],1)
//     (function(i) {
//     setTimeout(function() {
//     console.log ('a'+a)
//     console.log ('demoArr[i]'+demoArr[i])
//     let atr = elDiv[demoArr[i]].getAttribute('id')
//         elDiv[demoArr[i]].setAttribute('id', `${elDiv[a].getAttribute('id')}`)
//         elDiv[a].setAttribute('id', `${atr}`)
//         a = demoArr[i]
//     },  1000 + (1000 * i))
//   })(i)   
    
//   }}
// }
// console.log(demoArr)
// ========================================================================= 


// const tagEl = document.querySelectorAll('#TAG DIV') as NodeListOf<Element>
//       for (let i = 0; i< 16; i ++){
//         if(parseInt(String(tagEl[i].getAttribute('id'))) ==  (i+1) && i == 15){
        
//             tag.insertAdjacentHTML('afterbegin', `<p>ПОБЕДА</p>`) 
//           }else{
//             break
          
//         }

//       }


     
      function wait(ms: number) {
        return new Promise((resolve)=>{setTimeout(()=>resolve(true),ms)})
      }

      demo.onclick = async function(event){
        let target = event.target as HTMLButtonElement
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
              console.log(elDiv[a])
            
              let atrB = elDivB[demoArr[i]].getAttribute('id')
              elDivB[demoArr[i]].setAttribute('id', `${elDivB[a].getAttribute('id')}`)
              elDivB[a].setAttribute('id', `${atrB}`)
              a = demoArr[i] 
            }
            demoArr = []
        }
          
      }
        // let tagEl = tag.querySelectorAll('DIV') as NodeListOf<Element>
        // console.log (tagEl)
        // let i = 0
        // console.log(parseInt(String(tagEl[2].getAttribute('id'))))
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

