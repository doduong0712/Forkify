import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView';
import View from './View';

class ResultsView extends View {
  //Kế thừa
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try agian ;)';
  _message = '';

  _generateMarkup() {
    // console.log(this._data); // Kế thừa

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
