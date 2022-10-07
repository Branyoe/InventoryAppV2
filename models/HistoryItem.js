export default class HistoryItem{


  constructor(action, productCode) {
    this.action = action;
    this.productCode = productCode;
    this.historyItemContainer = document.createElement("li");
    this.actionContainer = document.createElement("span");
    this.labelContainer = document.createElement("span");

    this.labelContainer.classList.add("bold");
    this.labelContainer.innerHTML = 'Product ID: ';

    this.historyItemContainer.classList.add("list-group-item");

    this.actionContainer.classList.add("mx-3");
    if(this.action === "DELETE"){
      this.actionContainer.innerHTML = "DELETE";
      this.actionContainer.classList.add("badge", "rounded-pill", "text-bg-danger");
    }
    if(this.action === "ADD"){
      this.actionContainer.innerHTML = "ADD";
      this.actionContainer.classList.add("badge", "rounded-pill", "text-bg-primary");
    }
    if(this.action === "UPDATE"){
      this.actionContainer.innerHTML = "UPDATE";
      this.actionContainer.classList.add("badge", "rounded-pill", "text-bg-success");
    }
  }

  render(){
    this.historyItemContainer.append(this.actionContainer, this.labelContainer, this.productCode);
    return this.historyItemContainer;
  }
}