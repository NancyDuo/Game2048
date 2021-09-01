let boxs = document.querySelectorAll('.row div');
let totalScore = 0
let maxScore = 0
let emptyList = []
const cs = document.getElementById('current-score')
const bs = document.getElementById('best-score')

//start buttom
const start = document.getElementById('start')
start.addEventListener('click',() => {
    gameStart()
    setMaxScore()
})

//end buttom
const end = document.getElementById('end')
end.addEventListener('click',() => {   
    for(let i= 0;i<boxs.length;i++){
        boxs[i].innerHTML = ''
    }
    maxScore = totalScore
    setMaxScore()
    totalScore = 0
    emptyList = []
    cs.innerHTML = 'Your Score <br>' + totalScore   
    
})



//max score
function setMaxScore(){
    if (localStorage.maxScore) {
        maxScore = localStorage.maxScore - 0;
    } else {
        maxScore = 0;
    } 
    bs.innerHTML = 'Max Score <br>' + maxScore
}

//star function
function gameStart(){
    for(let i= 0;i<2;i++){
        let a = Math.floor(Math.random()*16)
        boxs[a].classList.add('show')
        boxs[a].innerHTML = 2
        cs.innerHTML = 'Your Score <br>' + totalScore
    }

}

 //get all zero cell
function getAllZero(){
    emptyList = []
    for(let i= 0;i<boxs.length;i++){
        if(boxs[i].innerHTML === ''){
            emptyList.push(boxs[i].id)         
        }           
    }
    return emptyList   
    
}

//get random position set ‘2 or 4’
function setTwo(){
    getAllZero()
    if(emptyList.length !=0){
        let a = Math.floor(Math.random()*(emptyList.length))
        let rand = document.getElementById(emptyList[a])
       
        
        rand.innerHTML = Math.random() < 0.8 ? 2:4
         
    }
        
    
}

//click event
const left = document.getElementById('left')
left.addEventListener('click',moveLeft)  

const down = document.getElementById('down')
down.addEventListener('click',moveDown)

const right = document.getElementById('right')
down.addEventListener('click',moveRight)

const up = document.getElementById('up')
down.addEventListener('click',moveUp)

//move functions---move left
function moveLeft(){
    let isMoved = false
    for(let i = 1;i<5;i++){
        for (let j = 1;j<5;j++){
            let flag = true
            for(let k = j-1;k>0;k--){
                let index = 'd'+(10*i+k+1)
                let index_left = 'd'+(10*i+k)
                let index_value = document.getElementById(index).innerText
                let index_left_value = document.getElementById(index_left).innerText
                if(index_value != ''){
                    if(index_left_value != ""){
                        if(flag && index_value === index_left_value){
                            moveDirection(index,index_left)
                            setZero(index) 
                            flag = false
                            isMoved=true
                        }      
                    }else{
                        setDirection(index,index_left)  
                        setZero(index)
                        isMoved=true  
                    }
                }
            }

        }            
    }
    if(isMoved){
        setTwo()
    }   
}
   
//move right
function moveRight(){
    let isMoved = false
    for(let i = 4;i>0;i--){
            for(let j = 4;j>0;j--){
                let flag = true
                for(let k = j+1;k<5;k++){
                    let index = "d"+(10*i+k-1)
                    let index_value = document.getElementById(index).innerText
                    let index_right = "d"+(10*i+k)
                    let index_right_value = document.getElementById(index_right).innerText
                    if(index_value != ''){
                        if(index_right_value != ''){
                            if(flag && index_right_value === index_value){
                                moveDirection(index,index_right)
                                setZero(index)
                                flag = false
                                isMoved=true
                            }                            
                        }else{
                            setDirection(index,index_right)
                            setZero(index)
                            isMoved=true
                        }
                    }
                }
            }
        }
    if(isMoved){
        setTwo() 
    }   
}
    
//move up
function moveUp(){
    let isMoved = false
    for(let i = 1;i<5;i++){
        for(let j = 1;j<5;j++){
            let flag = true;
            for(let k = i-1;k>0;k--){
                let index = "d"+(10*(k+1)+j)
                let index_value = document.getElementById(index).innerText
                let index_up = "d"+(10*k+j)
                let index_up_value = document.getElementById(index_up).innerText
                if(index_value!= ''){
                    if(index_up_value!= ''){ 
                        if(flag && index_value === index_up_value){
                            moveDirection(index,index_up)
                            setZero(index)
                            flag = false
                            isMoved = true   
                        }    
                    }else{
                        setDirection(index,index_up)
                        setZero(index)
                        isMoved = true
                    }
                    
                }
            }
        }
    }
    if(isMoved){
        setTwo()
    }
}   

//move down event
function moveDown(){
    let isMoved = false;
    for(let i = 4;i>0;i--){
        for(let j = 1;j<5;j++){
            let flag = true;
            for(let k = i+1;k<5;k++){
                let index = "d"+(10*(k-1)+j)
                let index_value = document.getElementById(index).innerText
                let index_down = "d"+(10*k+j) 
                let index_down_value = document.getElementById(index_down).innerText
                if(index_value!= ''){
                    if(index_down_value!= ''){
                        if(flag && index_value === index_down_value){
                            moveDirection(index,index_down)
                            setZero(index)
                            flag = false;  
                            isMoved = true;  
                        }    
                    }else{
                        setDirection(index,index_down)
                        setZero(index)
                        isMoved = true;
                    }
                    
                }
            }
        }
    }
    if(isMoved){
        setTwo()
    }
}

// set zero
function setZero(index){
    document.getElementById(index).classList.add('hide')
    document.getElementById(index).innerText= ''
    

}

//set direction
function setDirection(index,index_direction){
    document.getElementById(index_direction).innerText = document.getElementById(index).innerText    
}

//move direction
function moveDirection(index,index_direction){   
    document.getElementById(index_direction).innerText = parseInt(document.getElementById(index).innerText)*2
    totalScore += parseInt(document.getElementById(index).innerText) 
    cs.innerHTML = 'Your Score <br>' + totalScore              
}


// keybord event
document.addEventListener('keydown',(event) => {
    let key = event.keyCode
    switch(key){
        case 37 : 
        moveLeft()
        left.style.marginTop = '10px'      
        break
        case 38 : 
        moveUp()
        up.style.marginTop = '10px' 
        break
        case 39 : 
        moveRight()
        right.style.marginTop = '10px' 
        break
        case 40 : 
        moveDown()
        down.style.marginTop = '10px'
        break
    }
})
document.addEventListener('keyup',(event) => {
    let key = event.keyCode
    switch(key){
        case 37 :  
        left.style.marginTop = '0px'
        break
        case 38 :  
        up.style.marginTop = '0px'
        break
        case 39 : 
        right.style.marginTop = '0px'
        break
        case 40 : 
        down.style.marginTop = '0px'
        break
    }
})
