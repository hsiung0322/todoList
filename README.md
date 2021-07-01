# todoList
## codepen
<https://codepen.io/hsiungchi/pen/QWvWYMM>
## data
```js
let data = [
    {
        content: "畫畫",
        checked: false
    },
    {
        content: "讀英文",
        checked: true
    },
    {
        content: "買禮物",
        checked: true
    },
];
```
## 計算unfinished_count
```js
    let count=0;
        data.forEach(function(item){
            if(item.checked == false){
                count++;
            }
        });
        return count;
```
## render 渲染html
```js
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
        obj.checked = false;
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
            if(data[i].checked){
                data.splice(i,1);
            }
        }
        render();
});
```