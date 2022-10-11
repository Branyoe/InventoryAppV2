export default class Form{
  //********Propertys********
  #codeInp = null;
  #nameInp = null;
  #quantityInp = null;
  #costInp = null;

  //********Methods********
  constructor(codeInp ,nameInp, quantityInp, costInp, {codeHelper}){
    this.#codeInp = codeInp;
    this.#nameInp = nameInp;
    this.#quantityInp = quantityInp;
    this.#costInp = costInp;

    this.codeFormControl = codeInp.parentElement;

    this.helpers = {
      codeHelper: this.codeFormControl.childNodes[5]
    };
    this.helpers.codeHelper.remove();
  }
  
  reset(){
    this.#codeInp.value = '';
    this.#nameInp.value = '';
    this.#quantityInp.value = '';
    this.#costInp.value = '';
  }
  
  enableCodeInp(state){
    state ? this.#codeInp.disabled = false : this.#codeInp.disabled = true;
  }

  showCodeHelper(state){
    if(state){
      this.codeFormControl.append(this.helpers.codeHelper);
    } else {
      this.helpers.codeHelper.remove();
    }
  }

  //getters
  get getValue(){ 
    return {
      code: Number(this.#codeInp.value),
      name: String(this.#nameInp.value),
      quantity: Number(this.#quantityInp.value),
      cost: Number(this.#costInp.value)
    }
  }

  //setters
  setValue(product){
    this.#codeInp.value = product.getCode;
    this.#nameInp.value = product.name;
    this.#quantityInp.value = product.quantity;
    this.#costInp.value = product.cost;
  }
}