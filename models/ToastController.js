export default class ToastController{
  //********Methods********
  constructor(element){
    this.element = element;
    this.actionSpan = this.element.querySelector('#action');
    this.codeSpan = this.element.querySelector('#code');
    this.nameSpan = this.element.querySelector('#name');
    this.quantitySpan = this.element.querySelector('#quantity');
    this.costSpan = this.element.querySelector('#cost');
    this.toast = new bootstrap.Toast(this.element);
  }

  show = () => this.toast.show();
  
  //setters
  set({action, code, name, quantity, cost}){
    this.actionSpan.innerHTML = action;
    this.codeSpan.innerHTML = code;
    this.nameSpan.innerHTML = name;
    this.quantitySpan.innerHTML = quantity;
    this.costSpan.innerHTML = cost;
  }

}