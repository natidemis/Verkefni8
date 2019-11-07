const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  const del = document.querySelectorAll('.item__button');
  const span = document.querySelectorAll('.item__text');
  const checker = document.querySelectorAll('.item__checkbox');
  const addBtn = document.querySelector('.form__button');

  text.init(form, items, span, del, checker, addBtn);
});

const text = (() => {
  let items;
  let span;
  let del;
  var inptText;
  let checker;

  function init(_form, _items, _span, _del, _checker, _addBtn) {
    items = _items;
    span = _span;
    del = _del;
    checker = _checker;
    addBtn = _addBtn;
    _form.addEventListener('submit', formHandler);
    // TODO láta hluti í _items virka
     newItem = document.querySelector(".form__input");
    const everyLi = document.querySelectorAll("li");
    for(let i = 0; i < everyLi.length; i++){
      everyLi[i].children[0].addEventListener("click", () => {finish(everyLi[i])});
      everyLi[i].children[1].addEventListener("click", () => {
        edit(everyLi[i].children[1]);
    });
    everyLi[i].children[2].addEventListener("click", () => {
      deleteItem(everyLi[i].children[2].parentElement);
    })
    
  }

    
  }

  function formHandler(e) {
    e.preventDefault();
    if(!(newItem.value == null || newItem.value.trim() === '')){
      add(newItem.value);
      newItem.value = "";
    }
    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.classList.toggle("item--done");
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log("edit");
    const text = e.innerText;
    const inputEl = document.createElement('input');
    inputEl.className ="item__text";
    inputEl.value = text;
    e.replaceWith(inputEl);
    inputEl.focus();
    inputEl.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === ENTER_KEYCODE) { // 13 is enter
        inptText = inputEl.value;
        inputEl.addEventListener('keypress',commit);
      }
  });
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    var span2 = document.createElement('span');
    span2.className="item__text";
    span2.textContent = inptText;
    e.target.replaceWith(span2);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
      items.appendChild(createLi(value));
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.remove();
    console.log("delete");
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.addEventListener('click',clickHandler);
    return element;
  }

  function createLi(text){
    const liElement = el("li","item",null);
    const cboxElement = el("input", "item__checkbox",() => {
      finish(liElement);
    });
    cboxElement.setAttribute("type","checkbox");
    const spanElement = el("span", "item__text", () => {
      edit(spanElement)});
    spanElement.appendChild(document.createTextNode(text));
    const btnElement = el("button","item__button", () => {
      deleteItem(liElement)});
    btnElement.appendChild(document.createTextNode("Eyða"));
    liElement.appendChild(cboxElement);
    liElement.appendChild(spanElement);
    liElement.appendChild(btnElement);
    return liElement;
  }
  

  return {
    init: init
  }
})();
