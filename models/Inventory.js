import Utils from "../Utils.js";

export default class Inventory {
  //********Propertys********
  #products = null;

  //********Methods********
  /**
   * @method constructor
   * @return {Inventory} a Inventory instance
   */
  constructor() {
    this.#products = [];
  }

  /**
   * @method add
   * @param {Product} product 
   */
  add(product) {
    let indexForInsert;
    if (!this.#products.length) {
      this.#products.push(product);
    } else {
      indexForInsert = Utils.binarySearchForInsertProduct(this.#products, product.getCode);
      this.insert(product, indexForInsert + 1);
    }
  }

  /**
   * @method update
   * @param {number} code - Product code
   * @param {{name?, quantity?, cost?}} newValue - Data for update
   */
  update(code, newValue) {
    const foundProduct = this.search(code);
    foundProduct?.update(newValue);
  }

  /**
   * @method search
   * @param {number} code - Product code
   * @returns {Product} Found Product
   */
  search(code) {
    // let foundProduct, i = 0;
    // do {
    //   if (this.#products[i]?.getCode === code) foundProduct = this.#products[i];
    //   i++;
    // } while (!foundProduct && i < this.#products.length);
    // return foundProduct;

    if(this.#products.length == 0) return;
    let foundIndex = this.#productBinarySearch(code);
    return this.#products[foundIndex];
  }

  /**
   * @method delete
   * @param {number} code - Product code
   * @return {Product} Deleted Product
   */
  delete(code) {
    const foundProduct = this.search(code);
    if(!foundProduct) return;

    let i = 0, deleted = false;
    do {
      if (this.#products[i].getCode === code) {
        this.#products = Utils.removeItemFromArray(i, this.#products);
        deleted = true;
      }
      i++;
    } while (!deleted && i < this.#products.length);

    return foundProduct;
  }


  /**
   * @method insert
   * @param {Product} product - Product to incert
   * @param {number} index - Position to insert
   */
  insert(product, index) {
    this.#products.length += 1;
    for (let i = this.#products.length - 1; i >= index; i--) {
      this.#products[i] = this.#products[i - 1];
    }
    this.#products[index] = product;
  }

  /**
   * @method productBinarySearch
   * @param {number} wantedCode - Product code
   * @param {number} start - Initial position of search range
   * @param {number} end - End position of search range 
   * @returns {number} Product position found
   */
  #productBinarySearch( wantedCode, start = 0, end = this.#products.length - 1) {
    if (wantedCode > this.#products[end].getCode || wantedCode < this.#products[start].getCode) return;
    if (start > end) return;
    let middle = Math.floor((start + end) / 2);
    if (wantedCode === this.#products[middle].getCode) {
      return middle;
    } else if (wantedCode > this.#products[middle].getCode) {
      return this.#productBinarySearch(wantedCode, middle + 1, end);
    } else {
      return this.#productBinarySearch(wantedCode, start, middle - 1);
    }
  }

  /**
   * @method productListToString
   * @param {Array} productsList - List of products
   * @returns {string} return a {}
   */
  #productListToString(productsList = []) {
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
    return this.#productListToString(this.#products);
  };

  get getProducts() { return this.#products };

  get getInvertedList() {
    let invertedList = [];
    for (let i = this.#products.length - 1; i >= 0; i--) {
      invertedList.push(this.#products[i]);
    }
    return this.#productListToString(invertedList);
  }
}