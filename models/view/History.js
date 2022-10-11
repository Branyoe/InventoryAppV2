export default class History{
  constructor(historyContainer){
    this.historyContainer = historyContainer;
  }



  add(histroyItem){
    this.historyContainer.prepend(histroyItem.render());
  }
}