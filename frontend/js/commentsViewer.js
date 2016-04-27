'use strict';
import Component from './component.js';

export default class CommentsViewer extends Component{
    constructor(options) {
        super(options);
    }

    static _dateParse(str) {
        let date = new Date(str);

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        let hours = date.getHours();
        if (hours < 10) {
            hours = '0'+ hours;
        }

        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0'+ hours;
        }

        return  month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
    }

    showContent(data) {
        this._el.innerHTML = '';

        let comments = JSON.parse(data);

        comments.forEach(element => {
            this.addSentComment(element);
        });

    }

    addSentComment(data) {
        let comment = document.createElement('fieldset');
        comment.classList.add('comment');
        comment.textContent = data.comment;

        let header = document.createElement('legend');
        header.classList.add('commentHeader');
        let created = CommentsViewer._dateParse(data.created);

        header.textContent = data.username + ' ' + created;
        comment.appendChild(header);

        this._el.appendChild(comment);
    }
}