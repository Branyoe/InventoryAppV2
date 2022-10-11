export default class Alert {
  alert = document.createElement("div");

  constructor(text = '') { this.text = text }

  render() {
    this.alert.classList.add('alert', 'alert-danger');
    this.alert.setAttribute('id', 'alert');
    this.alert.innerHTML = this.text;

    return this.alert;
  }

  remove = () => this.alert.remove();
}