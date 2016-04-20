'use strict';
import Component from './component.js';

export default class CommentsViewer extends Component{
    constructor(options) {
        super(options);
    }

    showContent(data) {
        this._el.innerHTML = '';

        let comments = JSON.parse(data);

        comments.forEach(element => {
            this.addSentComment(element.comment);
        });

    }

    addSentComment(data) {
        let p = document.createElement('p');
        p.classList.add('comment');

        p.textContent = data;

        this._el.appendChild(p);
    }
}