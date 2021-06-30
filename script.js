const itemList = document.querySelector(".item-list");
const addItem = document.getElementById("add-item");
const addBtn = document.querySelector(".add-btn");
const statusList = document.querySelector(".status-list");

let data = [
    // {
    //     content: "TEXT",
    //     status: "待完成"
    // },
    // {
    //     content: "hello",
    //     status: "待完成"
    // },
    // {
    //     content: "123",
    //     status: "已完成"
    // },
    // {
    //     content: "456",
    //     status: "待完成"
    // },
    // {
    //     content: "EEWE",
    //     status: "已完成"
    // }
];

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

        let htmlStr = '';
        let count=0;
        data.forEach(function(item,index){
            if(item.status == "待完成"){
                count++;
                //待完成的li
                htmlStr+=`<li class="todo">
                <i class="todo-btn far fa-square" data-id="${index}"></i>
                <p>${item.content}</p>
                <i class="remove-btn fas fa-times" remove-id="${index}"></i>
                </li>`
            }else{ //已完成的li
                htmlStr+=`<li class="done">
                <i class="done-btn fas fa-check" data-id="${index}"></i>
                <p>${item.content}</p>
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

function add(){
    if(addItem.value == ""){
        alert("請輸入待辦事項，不可為空");
        return;
    }else{
        let obj = {}
        obj.content = addItem.value;
        obj.status = "待完成";
        data.push(obj);
    }
    //再次渲染
    render();
    addItem.value = "";
};


render();

//add
addBtn.addEventListener('click',function(){
    add();
});
addItem.addEventListener('keypress',function(e){
    console.log(e.keyCode);
    if(e.keyCode === 13){
        add();
    }
});


itemList.addEventListener('click',function(e){
    item = e.target;
    // console.log(e);
    //刪除特定項目
    if(item.getAttribute("class")=="remove-btn fas fa-times"){
        let removeId = item.getAttribute("remove-id");
        data.splice(removeId,1);
        render();
    }
    //清除已完成項目
    else if(item.getAttribute("class")=="clear"){
        //從後面刪除，index才不會亂掉 (從前面刪,index會變)
        let len = data.length;
        for(let i=len-1;i>=0;i--){
            if(data[i].status=="已完成"){
                data.splice(i,1);
            }
        }
        render();
    }else if(item.getAttribute("class")=="todo-btn far fa-square"){
        //直接變更data的status  todo -> done
        let index = item.getAttribute("data-id");
        data[index].status = "已完成";
        //重新渲染
        render();
    }else if(item.getAttribute("class")=="done-btn fas fa-check"){
        //直接變更data的status  done -> todo
        let index = item.getAttribute("data-id");
        data[index].status = "待完成";
        //重新渲染
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
            //讀取status == done 資料，渲染
            data.forEach(function(item,index){
                if(item.status == "已完成"){
                    html+=`<li class="done">
                    <i class="done-btn fas fa-check" data-id="${index}"></i>
                    <p>${item.content}</p>
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
            let count = 0;
            data.forEach(function(item,index){
                if(status == item.status){
                    count++;
                    html+=`<li>
                    <i class="todo-btn far fa-square" data-id="${index}"></i>
                    <p>${item.content}</p>
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