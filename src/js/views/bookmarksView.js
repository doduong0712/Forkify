import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView';
import View from './View';

class BookmarksView extends View {
  //Kế thừa
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmars yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data); // Kế thừa

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
