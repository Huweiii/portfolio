// 计时器
// timer;
let timerNum = document.querySelector(".timeNum");
let timerNum_2 = document.querySelector("#timeNum_2");
let timeAdd = 0;
let timer = null;

// 声明计数变量
let clickTimes = 0;

// 随机图形函数
function start(){
    // 获取所有.card元素 （这是一个数列）
    const cardEl = document.querySelectorAll(".card");
    console.log(cardEl);

    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    function randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;
    }
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let data = [...arr,...arr];
    // arr.sort(randomsort);
    // data输出1-8随机数组
    data.sort(randomsort);
    console.info(data);

    // 用for循环，将所有取到的.card list集合 依次加入img
    for(var i=0; i<cardEl.length; i++) {
        card = cardEl[i];
        // 给card添加子元素img
        const getImg = document.createElement("img");
        // 取到随机图片
        getImg.src = "img/shape_" + data[i] + ".png";
        // console.log(data[i]);
        card.appendChild(getImg);
    }

    clickTimes = 0;
    timer = setInterval(function() {
        ++timeAdd;
        //每一秒执行一次
        console.log('seconds'); 
        timerNum.textContent = timeAdd;
        timerNum_2.textContent = timeAdd;
        // 时间评分
        if (timeAdd > 60){ 
            document.getElementById('score').textContent = "⭐⭐️";
            document.getElementById('star').textContent = "⭐⭐️";
        }  if (timeAdd > 100){ 
            document.getElementById('score').textContent = "⭐️";
            document.getElementById('star').textContent = "⭐️";
        } 
    }, 1000);
}

// 时间评分

// 布置运行一次随机图形
start();

// --------------------------------------------------

let deck = document.querySelector(".deck");
let lastClick = null;
let result = 0;
let success = document.getElementsByClassName("success");

// 点击事件
deck.addEventListener("click", function(event){
    

    let cardEl = event.target;
    // 判断如果没有点击没有被open并且没有被match
    if ((cardEl.parentNode.className != "open") && (cardEl.parentNode.className != "match" ) && (cardEl = event.target)){
        if (cardEl.nodeName == "IMG"){
            clickTimes++;
        }
    }
    document.querySelector(".numbers").textContent = clickTimes;
    document.querySelector("#numbers").textContent = clickTimes;


    console.log(clickTimes + "Moves");

    // 评分 大于50次 2颗星 、大于80次 1颗星
    if (clickTimes > 50){ 
        document.getElementById('score').textContent = "⭐⭐️";
        document.getElementById('star').textContent = "⭐⭐️";
    }  if (clickTimes > 80){ 
        document.getElementById('score').textContent = "⭐️";
        document.getElementById('star').textContent = "⭐️";
    } 
    
    // 查看nodeName
    console.log("clicked" + cardEl.nodeName);
    
    // 如果目标nodeName为IMG，则更换card的className
    if (cardEl.nodeName == "IMG") {
        // 判断如果没有点击没有被open并且没有被match
        if ((cardEl.parentNode.className != "open") && (cardEl.parentNode.className != "match" )){
            cardEl.parentNode.className = "open";
            cardEl.parentNode.parentNode.className = "baseCard animated flipInY";
            console.log("open");

            // 如果上次点击为空，记录上次点击为目标点击
            if (lastClick == null) { 
                lastClick = cardEl;
            } else { 
                // 判断两个节点  如果相同 变蓝
                if (cardEl.src === lastClick.src) {
                    cardEl.parentNode.className = "match";
                    lastClick.parentNode.className = "match";
                    cardEl.parentNode.parentNode.className = "baseCard animated pulse";
                    lastClick.parentNode.parentNode.className = "baseCard animated pulse";
                    console.log("match");
                    
                    // 判断是否翻完
                    result++;
                    console.log(result);
                
                    // 如果翻完，显示成功页面
                    if (result == 8) {  
                        console.log("All done") 
                        success[0].style.display = "block";

                        // 干掉时间器，让它停止
                        clearInterval(timer);
                    };
                
                // 判断两个节点  如果不相同 变红后翻回
                } else {
                    let savelastClick = lastClick;
                    cardEl.parentNode.className = "notMatch";
                    savelastClick.parentNode.className = "notMatch";
                    cardEl.parentNode.parentNode.className = "baseCard animated shake";
                    savelastClick.parentNode.parentNode.className = "baseCard animated shake";
                    setTimeout(function(){
                        cardEl.parentNode.parentNode.className = "baseCard animated flipOutY";
                        savelastClick.parentNode.parentNode.className = "baseCard animated flipOutY";
                    },800)
                    console.log("notMatch");
                    
                    // 1600毫秒后翻回卡片
                    setTimeout(function(){
                        if (cardEl.nodeName == "IMG"){
                            cardEl.parentNode.className = "card";
                            savelastClick.parentNode.className = "card";
                            cardEl.parentNode.parentNode.className = "baseCard";
                            savelastClick.parentNode.parentNode.className = "baseCard";
                        }
                    }, 1800)
                }

                
                // 重置lastClick
                lastClick = null;
            }
        }   
    }   
    console.log(cardEl.outerHTML);
});





// 点击refresh按钮刷新页面
let clickRefresh = document.querySelector(".refresh");
let baseCard = document.getElementsByClassName("baseCard");

clickRefresh.addEventListener('click', function(){  
    // 时间清零
    timeAdd = 0;
    clearInterval(timer);
    timerNum.textContent = 0;

    let removeImg = document.querySelectorAll("img");
    for(let j=0; j<baseCard.length; j++) {
        removeImg[j].remove();
        baseCard[j].firstElementChild.className = "card";
    }
    lastClick = null;
    document.querySelector(".numbers").textContent = 0;
    document.querySelector("#numbers").textContent = 0;
    result = 0;
    start();     
});

// 点击Again按钮刷新页面
let clickAgain = document.querySelector(".again");

clickAgain.addEventListener('click', function(){ 
    // 时间清零
    timeAdd = 0;
    clearInterval(timer);
    timerNum.textContent = 0;

    document.getElementById('score').textContent = "⭐⭐️⭐️";
    document.getElementById('star').textContent = "⭐⭐️⭐️";
    success[0].style.display = "none";
    let removeImg = document.querySelectorAll("img");
    for(let j=0; j<baseCard.length; j++) {
        removeImg[j].remove();
        baseCard[j].firstElementChild.className = "card";
    }
    lastClick = null;
    document.querySelector(".numbers").textContent = 0;
    document.querySelector("#numbers").textContent = 0;
    result = 0;
    start();  
});


