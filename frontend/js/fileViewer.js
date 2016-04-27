'use strict';
import Component from './component.js';

export default class FileViewer extends Component{
    constructor(options) {
        super(options);
    }

    showContent(data) {
        this._el.innerHTML = '<pre>' + data + '</pre>';
    }
}
