const itemList = document.querySelector(".item-list");
const addItem = document.querySelector(".add-item");
const addBtn = document.querySelector(".add-btn");
const statusList = document.querySelector(".status-list");
const checkbox = document.querySelector(".checkbox");

//每次讀取網頁會從localStorage去看是否有資料
const data = JSON.parse(localStorage.getItem("dataList"));
// const data = [
//     {
//         content: "Mike",
//         checked: true
//     },
//     {
//         content: "Tom",
//         checked: false
//     }
// ];


function unfinished_count(){
    let count=0;
    data.forEach(function(item){
        if(item.checked == false){
            count++;
        }
    });
    return count;
}

function render(){

    //如果資料是空的
    if(data.length == 0){
        statusList.innerHTML = "";
        itemList.innerHTML = "";
    }
    else{
        statusList.innerHTML = `<li class="active">全部</li>
        <li>待完成</li>
        <li>已完成</li>`;

        let count = unfinished_count();

        let htmlStr = '';
        data.forEach(function(item,index){
            if(item.checked){ //finished...
                htmlStr+=`<li>
                <label class="checkbox">
                    <input type="checkbox" checked data-id=${index}>
                    <span>✔</span>
                    <p>${item.content}</p>
                </label>
                <i class="remove-btn fas fa-times" remove-id="${index}"></i>
                </li>`
            }else{ //unfinished...
                htmlStr+=`<li>
                <label class="checkbox">
                    <input type="checkbox" data-id=${index}>
                    <span>✔</span>
                    <p>${item.content}</p>
                </label>
                <i class="remove-btn fas fa-times" remove-id="${index}"></i>
                </li>`
            }
        });
        htmlStr+=`<li class="infos">
                <div>${count}個待完成項目</div>
                <div class="clear">清除已完成項目</div>
                </li>`
        itemList.innerHTML = htmlStr;
    }
};
function updateLocalStorage(){
    localStorage.setItem("dataList",JSON.stringify(data));
}

render();

//add
addBtn.addEventListener('click',function(){
    if(addItem.value == ""){
        alert("請輸入待辦事項，不可為空");
        return;
    }else{
        let obj = {}
        obj.content = addItem.value;
        obj.checked = false;
        data.push(obj);
    }
    //更新localStorage的資料
    updateLocalStorage();
    //再次渲染
    render();
    addItem.value = "";
});
addItem.addEventListener('keypress',function(e){
    // console.log(e.keyCode);
    if(e.keyCode === 13){
        addBtn.click();
    }
});


itemList.addEventListener('click',function(e){
    item = e.target;
    // console.log(item);
    //刪除特定項目
    if(item.getAttribute("class")=="remove-btn fas fa-times"){
        let removeId = item.getAttribute("remove-id");
        data.splice(removeId,1);
        //更新localStorage的資料
        updateLocalStorage();
        //再次渲染
        render();
    }
    //清除已完成項目
    else if(item.getAttribute("class")=="clear"){
        //從後面刪除，index才不會亂掉 (從前面刪,index會變)
        let len = data.length;
        for(let i=len-1;i>=0;i--){
            if(data[i].checked){
                data.splice(i,1);
            }
        }
        //更新localStorage的資料
        updateLocalStorage();
        //再次渲染
        render();
    }else if(item.checked){ //true 的話 unfinished -> finished
        //直接變更data的checked  false -> true
        let index = item.getAttribute("data-id");
        data[index].checked = true;
        //更新localStorage的資料
        updateLocalStorage();
        //再次渲染
        render();
    }else if(item.checked == false){ //false 的話 finished -> funinished
        //直接變更data的checked  true -> false
        let index = item.getAttribute("data-id");
        data[index].checked = false;
        //更新localStorage的資料
        updateLocalStorage();
        //再次渲染
        render();
    }
    else{
        return;
    }
});

//status show
statusList.addEventListener('click',function(e){
    if(e.target.nodeName !== "LI" ){
        return;
    }
    else{
        let status = e.target.innerText;
        let html = "";
        if(status == "全部"){
            render();
            return;
        }
        else if(status == "已完成"){
            // //變更active class
            statusList.innerHTML = `<li>全部</li>
            <li>待完成</li>
            <li class="active">已完成</li>`;
            //讀取checked == true 資料，渲染
            data.forEach(function(item,index){
                if(item.checked){
                    html+=`<li>
                    <label class="checkbox">
                        <input type="checkbox" checked data-id=${index}>
                        <span>✔</span>
                        <p>${item.content}</p>
                    </label>
                    <i class="remove-btn fas fa-times" remove-id="${index}"></i>
                    </li>`
                }
            });
            html+=`<li class="infos">
            <div class="clear">清除已完成項目</div>
            </li>`
            itemList.innerHTML = html;
        }else if(status == "待完成"){
            // //變更active class
            statusList.innerHTML = `<li>全部</li>
            <li class="active">待完成</li>
            <li>已完成</li>`;

            let count = unfinished_count();
            data.forEach(function(item,index){
                if(item.checked == false){
                    html+=`<li>
                    <label class="checkbox">
                        <input type="checkbox" data-id=${index}>
                        <span>✔</span>
                        <p>${item.content}</p>
                    </label>
                    <i class="remove-btn fas fa-times" remove-id="${index}"></i>
                    </li>`
                }
            });
            html+=`<li class="infos">
            <div>${count}個待完成項目</div>
            </li>`
            itemList.innerHTML = html;
        }
    }
});