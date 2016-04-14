'use strict';
import Component from './component.js';

const DEFAULT_PATH = 'Project dir';

export default class Breadcrumbs extends Component{
    constructor(options) {
        super(options);
        this._path = this._el.querySelector('[data-selector="path"]');

        this._el.addEventListener('click', this._onBackClick.bind(this));
    }

    showPath(data) {
        this._path.innerHTML = data ?
            ('<pre>'+ DEFAULT_PATH + data + '</pre>') :
            ('<pre>'+ DEFAULT_PATH  + '</pre>');
    }

    toggleBackButton() {
        Breadcrumbs.toggleElement( this._el.querySelector('[data-selector="backButton"]') );
    }

    _onBackClick(event) {
        let backButton = event.target.closest('[data-selector="backButton"]');

        if (!backButton) {
            return;
        }

        this._trigger('back');
    }
}

