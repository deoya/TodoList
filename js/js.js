
const items = document.querySelector('.items') 
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 

let shoppingLists = []; 

const save = () => {
  localStorage.setItem('shopList', JSON.stringify(shoppingLists))

}

const init = () =>{  
    const userList = JSON.parse(localStorage.getItem('shopList')); 

    if(userList) {
      userList.forEach(obj => {
        createItem(obj);
        shoppingLists = userList;
      });    
  }
}

init();

const onAdd = () =>{    
  const list = {  
    id:Date.now(), 
    text:input.value
  }

  if(list.text == ''){  
    input.focus();
    return;
  }  

  shoppingLists.push(list);  
  save() 

  createItem(list); 

  input.value = '';
  input.focus();

  console.log('shoppingLists - ',shoppingLists);
}

function createItem(list){
  const itemRow = document.createElement('li')
  itemRow.className = 'item_row'
  itemRow.setAttribute('data-id',list.id)

  itemRow.innerHTML = `
    <div class="item">
      <input type="checkbox">
      <span class="item_name">${list.text}</span>
      <button class="item_delBtn">
        <i class="fa-solid fa-trash-can" data-id=${list.id}></i>
      </button>
    </div>
    <div class="item_divider"></div>
  ` 

  items.append(itemRow)
  itemRow.scrollIntoView();
  return itemRow
}

addBtn.addEventListener('click', onAdd)

input.addEventListener('keypress', event =>{
  event.key === 'Enter' && onAdd();
})


items.addEventListener('click', e =>{
  const clickId = e.target.dataset.id;
  console.log('클릭한 쓰레기통의 ID는 ? ',clickId);
  if(clickId) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${clickId}"]`);
    toBeDeleted.remove();

    shoppingLists = shoppingLists.filter( aa => aa.id != clickId )
    save()
  }
})
