// import ToastController from "./models/ToastController.js";
import Alert from "./models/view/Alert.js";
import Card from "./models/view/Card.js";
import CardsManager from "./models/view/CardsManager.js";
import Form from "./models/view/Form.js";
import History from "./models/view/History.js";
import HistoryItem from "./models/view/HistoryItem.js";
import Inventory from "./models/logic/Inventory.js";
import Product from "./models/logic/Product.js";
import Utils from "./models/Utils.js";


// const toast = Utils.selector('liveToast');
// const toastComponent = new ToastController(toast);
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
  inventory.delete(code);
  cardsManager.deleteCard(code);
  history.add(new HistoryItem("DELETE", code));
  // toastComponent.set({
  //   action: 'Deleted Product',
  //   ...inventory.search(code).getValue
  // })
  // toastComponent.show();
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
  history.add(new HistoryItem("UPDATE", codeForUpdate));
  setSaveBtnMode(false);
  updateFlag = false;
  // toastComponent.set({
  //   action: 'Updated Product',
  //   ...inventory.search(codeForUpdate).getValue
  // })
  // toastComponent.show();
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
  history.add(new HistoryItem("ADD", newProduct.getCode));
  // toastComponent.set({
  //   action: 'Added Product',
  //   ...newProduct.getValue
  // })
  // toastComponent.show();
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