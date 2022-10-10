import Utils from "../Utils.js";

export default class Inventory {
  //********Propertys********
  #products = null;

  //********Methods********
  constructor() {
    this.#products = [];
  }

  
  add(product) {
    let indexForInsert;
    if (!this.#products.length) {
      this.#products.push(product);
    } else {
      indexForInsert = Utils.binarySearchForInsertProduct(this.#products, product.getCode);
      this.insert(product, indexForInsert + 1);
    }
  }

  update(code, newValue) {
    const foundProduct = this.search(code);
    foundProduct?.update(newValue);
  }

  search(code) {
    // let foundProduct, i = 0;
    // do {
    //   if (this.#products[i]?.getCode === code) foundProduct = this.#products[i];
    //   i++;
    // } while (!foundProduct && i < this.#products.length);
    // return foundProduct;

    if(this.#products.length == 0) return;
    let foundIndex = this.#binarySearchForAProduct(code);
    return this.#products[foundIndex];
  }

  delete(code) {
    let i = 0, deleted = false;
    do {
      if (this.#products[i].getCode === code) {
        this.#products = Utils.removeItemFromArray(i, this.#products);
        deleted = true;
      }
      i++;
    } while (!deleted && i < this.#products.length);
  }

  insert(product, index) {
    this.#products.length += 1;
    for (let i = this.#products.length - 1; i >= index; i--) {
      this.#products[i] = this.#products[i - 1];
    }
    this.#products[index] = product;
  }

  #binarySearchForAProduct( wantedCode, start = 0, end = this.#products.length - 1) {
    if (wantedCode > this.#products[end].getCode || wantedCode < this.#products[start].getCode) return;
    if (start > end) return;
    let middle = Math.floor((start + end) / 2);
    if (wantedCode === this.#products[middle].getCode) {
      return middle;
    } else if (wantedCode > this.#products[middle].getCode) {
      return this.#binarySearchForAProduct(wantedCode, middle + 1, end);
    } else {
      return this.#binarySearchForAProduct(wantedCode, start, middle - 1);
    }
  }

  #productsListToString(productsList = []) {
    if (this.#products.length === 0) return '[]'
    let stringList = '[';
    for (let i = 0; i < productsList.length - 1; i++) {
      stringList += productsList[i]?.getValueInString + ', ';
    }
    return stringList += productsList[productsList.length - 1]?.getValueInString + ']';
  }

  //getters
  get getLastProduct() { return this.#products[this.#products.length - 1] }

  get getList() {
    return this.#productsListToString(this.#products);
  };

  get getProducts() { return this.#products };

  get getInvertedList() {
    let invertedList = [];
    for (let i = this.#products.length - 1; i >= 0; i--) {
      invertedList.push(this.#products[i]);
    }
    return this.#productsListToString(invertedList);
  }
}