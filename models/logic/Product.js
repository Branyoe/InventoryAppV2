/** Class representing a Product. */
export default class Product {
  //******** Propertys ********
  #code = 0;
  name = "";
  quantity = 0;
  cost = 0;


  //******** Methods ********
  /**
   * @method constructor
   * @param {object} {code, name, quantity, cost}
   * @return {Product} a Product instance 
   */
  constructor({ code, name, quantity, cost }) {
    this.#code = code;
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
  }

  /**
   * Update a product in all its properties except in "code"
   * @method update
   * @param {object} {name, quantity, cost}
   */
  update({ name, quantity, cost }) {
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
  }

  //******** Getters

  /**
   * @method getCode
   * Return "code" property.
   * @return {number} "code" property
   */
  get getCode() { return this.#code; }

  /**
   * @method getValue
   * Return all properties in a literal object.
   * @return {object} Product properties in literal object
   */
  get getValue() {
    return {
      code: this.#code,
      name: this.name,
      quantity: this.quantity,
      cost: this.cost
    }
  }

  /**
   * @method getValueInString
   * Return string object literal whit all properties.
   * @return {string} Product properties in string.
   */
  get getValueInString() { return `{code: ${this.#code}, name: ${this.name == "" ? '""' : this.name}, quantity: ${this.quantity}, cost: ${this.cost}}` }
}