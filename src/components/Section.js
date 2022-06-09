export class Section {
    constructor ({ items, renderer, getArrayCard }, containerSelector)
    {
      this._initialArray = items;
      this._renderer = renderer;
      this.getArrayCard = getArrayCard;
      this._container = document.querySelector(containerSelector);
    }
   
  renderItems() {
    this.getArrayCard ()
      .then((result) => {
        result.forEach(item => this._renderer(item));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  addItem(element) {
    this._container.prepend(element);
  };
}
