import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {underfined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = ''; //Thay thế bằng khoảng trống để thêm mới
  }

  update(data) {
    this._data = data;
    const newmarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newmarkup);
    // createRange Phạm vi của DOM , createContextualFragment chuyển từ DOM ảo thành DOM thực
    // DOM ảo được lưu trong memory để so sánh
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements, newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥💢', newEl.firstChild.nodeValue.trim()); // Kiểm tra cái nào có bên trong thẻ , có text hay ko nếu là 1 thẻ khác sẽ là null
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTREIBUES
      if (!newEl.isEqualNode(curEl)) {
        //Các thuộc tính đã thay đổi
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
