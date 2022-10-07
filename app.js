import Alert from "./models/Alert.js";
import Card from "./models/Card.js";
import CardsManager from "./models/CardsManager.js";
import Form from "./models/Form.js";
import History from "./models/History.js";
import HistoryItem from "./models/HistoryItem.js";
import Inventory from "./models/Inventory.js";
import Product from "./models/Product.js";
import ToastController from "./models/ToastController.js";
import Utils from "./Utils.js";


const alert = new Alert('No existen resultados')
const cardsContainer = Utils.selector('cardsContainer');
const cardsManager = new CardsManager(cardsContainer);
const form = new Form(
  Utils.selector('codeInp'),
  Utils.selector('nameInp'),
  Utils.selector('quantityInp'),
  Utils.selector('costInp'),
  {
    codeHelper: Utils.selector('codeHelper')
  }
);
const historyContainer = Utils.selector('historyContainer');
const history = new History(historyContainer);
const inventory = new Inventory();
const saveBtn = Utils.selector('btn-submit');
const searchBtn = Utils.selector('btn-search');
const searchInp = Utils.selector('search-inp');
const toast = Utils.selector('liveToast');
const toastComponent = new ToastController(toast);
const sortBtn = Utils.selector('sort-btn')

let codeForUpdate = 0;
let updateFlag = false;
let isShortUp = true;

saveBtn.addEventListener('click', e => {
  e.preventDefault();

  if (!updateFlag) {
    saveBtnHandleAdd();
  } else {
    saveBtnHandleUpdate();
  }
  alert.remove();
  cardsManager.renderCards();
  form.reset();
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();

  const searchedCode = Number(searchInp.value);
  const foundProduct = inventory.search(searchedCode);
  alert.remove();

  if (!foundProduct) {
    cardsManager.removeCards();
    cardsContainer.append(alert.render());
    return
  }
  cardsManager.renderCard(foundProduct.getCode);
});

sortBtn.addEventListener('click', e => {
  e.preventDefault();

  isShortUp = !isShortUp;
  if (!isShortUp) {
    sortBtn.classList.add('filterItmSelected');
    cardsManager.renderInvertedCards();
  } else {
    sortBtn.classList.remove('filterItmSelected');
    cardsManager.renderCards();
  }
})

searchInp.addEventListener('input', () => {
  if (searchInp.value.toString() === '') {
    alert.remove();
    cardsManager.removeCards();
    cardsManager.renderCards();
  }
})

function deleteProduct(code) {
  toastComponent.set({
    action: 'Deleted Product',
    ...inventory.search(code).getValue
  })
  inventory.delete(code);
  cardsManager.deleteCard(code);
  // toastComponent.show();
  history.add(new HistoryItem("DELETE", code));
}

function updateProduct(code) {
  updateFlag = true;
  setSaveBtnMode(true);
  codeForUpdate = code;
  form.setValue(inventory.search(code));
}

function saveBtnHandleUpdate() {
  inventory.update(codeForUpdate, form.getValue);
  cardsManager.update(codeForUpdate, form.getValue);
  toastComponent.set({
    action: 'Updated Product',
    ...inventory.search(codeForUpdate).getValue
  })
  // toastComponent.show();
  history.add(new HistoryItem("UPDATE", codeForUpdate));
  setSaveBtnMode(false);
  updateFlag = false;
}

function saveBtnHandleAdd() {
  if(inventory.search(form.getValue.code)) {
    form.showCodeHelper(true);
    return;
  }
  form.showCodeHelper(false);
  const newProduct = new Product(form.getValue);
  inventory.add(newProduct);

  const card = new Card(
    newProduct,
    code => deleteProduct(code),
    code => updateProduct(code)
  )
  cardsManager.add(card);
  toastComponent.set({
    action: 'Added Product',
    ...newProduct.getValue
  })
  // toastComponent.show();
  history.add(new HistoryItem("ADD", newProduct.getCode));
}

function setSaveBtnMode(isUpdate) {
  if (isUpdate) {
    saveBtn.classList.add('btn-success');
    saveBtn.classList.remove('btn-primary');
    form.enableCodeInp(false);
    return
  }
  saveBtn.classList.remove('btn-success');
  saveBtn.classList.add('btn-primary');
  form.enableCodeInp(true);
}

// //************ConsoleTest************

// const inventory = new Inventory();

// const product1 = new Product({
//   //el codigo es asignado automaticamente por el Inventory para evitar la duplicidad de este.
//   name: 'p1',
//   quantity: 1,
//   cost: 1
// })
// const product2 = new Product({
//   name: 'p2',
//   quantity: 2,
//   cost: 2
// });

// //no product case
// console.log('no product case\n');
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);

// //one product case
// console.log('one product case\n');
// inventory.add(product1);
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
// console.log(inventory.search(1));

// //two products case
// console.log('two products case\n');
// inventory.add(product2);
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
// console.log(inventory.search(1));
// console.log(inventory.search(2));

// //Update product case
// console.log('Update product case\n');
// inventory.update(1, {
//   name: 'product1',
//   quantity: 1,
//   cost: 1
// });
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
// console.log(inventory.search(1));

// //delete product case
// console.log('delete product case\n');
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
// inventory.delete(1);
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
// console.log(inventory.search(1)); //now is non-existent
// console.log(inventory.search(2));

// //delete non-existent product case
// console.log('delete non-existent product case\n');
// inventory.delete(1);
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);

// //Update non-existent product case
// console.log('update non-existent product case\n');
// inventory.update(1, {
//   name: 'p1',
//   quantity: 1,
//   cost: 1
// });
// console.log(inventory.getList);
// console.log(inventory.getInvertedList);
