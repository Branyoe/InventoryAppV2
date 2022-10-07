export default class Card {
  //********Propertys********
  card = document.createElement("div");
  cardBody = document.createElement("div");
  cardTitle = document.createElement("h5");
  codeSubtitle = document.createElement("h6");
  costSubtitle = document.createElement("h6");
  quantitySubtitle = document.createElement("h6");
  buttonsContainer = document.createElement("div");
  deleteBtn = document.createElement("a");
  updateBtn = document.createElement("a");

  //********Methods********
  constructor(product, handleDelete, handleUpdate) {
    this.code = product.getCode;
    this.name = product.name;
    this.quantity = product.quantity;
    this.cost = product.cost;
    this.deleteBtn.addEventListener('click', () => handleDelete(this.code));
    this.updateBtn.addEventListener('click', () => handleUpdate(this.code));
  }

  remove(){
    this.card.remove();
  }

  update({name, quantity, cost}){
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
  }

  render() {
    this.card.classList.add('card', 'mb-3');
    this.cardBody.classList.add('card-body');
    this.cardTitle.innerHTML = `Name: ${this.name}`;

    this.quantitySubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
    this.quantitySubtitle.innerHTML = `Quantity: ${this.quantity}`

    this.costSubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
    this.costSubtitle.innerHTML = `Cost: ${this.cost}`

    this.codeSubtitle.classList.add('card-subtitle', 'mb-3', 'text-muted');
    this.codeSubtitle.innerHTML = `Code: ${this.code}`;

    this.buttonsContainer.classList.add('buttonsContainer');

    this.deleteBtn.classList.add('card-link', 'btn', 'btn-danger', 'form-control');
    this.deleteBtn.textContent = 'Delete';
    
    this.updateBtn.classList.add('card-link', 'btn', 'btn-success', 'form-control');
    this.updateBtn.textContent = 'Update';

    this.buttonsContainer.append(this.updateBtn, this.deleteBtn)

    this.cardBody.append(
      this.cardTitle,
      this.codeSubtitle,
      this.quantitySubtitle,
      this.costSubtitle,
      this.buttonsContainer
    );
    this.card.append(this.cardBody);

    return this.card;
  }
}