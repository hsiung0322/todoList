# todoList
## codepen
<https://codepen.io/hsiungchi/pen/QWvWYMM>
## data
```js
let data = [
    {
        content: "畫畫",
        status: "待完成"
    },
    {
        content: "讀英文",
        status: "待完成"
    },
    {
        content: "買禮物",
        status: "已完成"
    },
];
```
## render 渲染html
```js
let htmlStr = '';
    //讀取data裡面的值
    data.forEach(function(item,index){
        if(item.status == "待完成"){
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
```
## add
```js
addBtn.addEventListener('click',function(){
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
});
```
## remove
```js
itemList.addEventListener('click',function(e){
    item = e.target;
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
});
```