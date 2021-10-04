'use strict';
import Component from './component.js';

export default class DirViewer extends Component{
    constructor(options) {
        super(options);
        this._selectedItem = null;

        this.on('click',this._onClick.bind(this));
        this.on('dblclick',this._onDblClick.bind(this));
        this.on('mousedown', DirViewer.preventDefaultSelection);
        this.on('selectstart',DirViewer.preventDefaultSelection);
    }

    static preventDefaultSelection(event) {
        event.preventDefault();
    }

    static _definePath(target) {
        let path = '';
        let dir = target;

        while(dir) {
            path = '/' + dir.textContent + path;
            dir = dir.parentNode.parentNode.previousElementSibling;
        }

        return path;
    }

    get selectedItem() {
        return this._selectedItem;
    }

    _onClick(event) {

        let target = event.target.closest('span');

        if(!target) {
            return;
        }

        if (target.nextElementSibling) {
            DirViewer.toggleElement(target.nextElementSibling);
        }


        if (this.selectedItem) {
            DirViewer.toggleFocus(this.selectedItem);
        }

        this._selectedItem = target;
        DirViewer.toggleFocus(target);

        this._trigger('itemWasSelected', {path: DirViewer._definePath(target)});

    }

    _onDblClick(event) {

        let target = event.target.closest('span');

        if(!target || target.nextElementSibling) {
            return;
        }

        this._trigger('fileWasDblClicked', {filePath: DirViewer._definePath(target)});
    }

    showContent(data) {
        this._el.innerHTML = this._renderTree( JSON.parse(data) );
    }

    _renderTree(obj) {
        if (Object.keys(obj).length === 0) {
            return '';
        }

        let ourHTML = '<ul>' + '\n';

        for (let key in obj) {
            let liChild = this._renderTree(obj[key]);

            if (liChild) {
                ourHTML += '<li class="folder">' + '<span>' + key + '</span>' + '\n'
            } else {
                ourHTML += '<li>' + '<span>' + key + '</span>' + '\n';
            }

            ourHTML += liChild;
            ourHTML +='\n'+'</li>';
        }

        ourHTML += '</ul>';

        return ourHTML;
    }
}