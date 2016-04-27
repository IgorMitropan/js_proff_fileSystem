'use strict';
import Component from './component.js';

export default class CommentSender extends Component{
    constructor(options) {
        super(options);
        this._textField = this._el.querySelector('[data-selector="text"]');

        this.on('click', this._onSendClick.bind(this));
    }

    _onSendClick(event) {
        event.preventDefault();

        let sendButton = event.target.closest('[data-selector="sendButton"]');

        if (!sendButton) {
            return;
        }
        sendButton.blur();

        let comment = this._textField.value.trim();
        if (comment) {
            this._trigger('send', {comment: comment});
        } else {
            this._textField.value = '';
            this._showNotification('Server doesn\'t accept empty comments!');
        }
    }

    resetText() {
        this._textField.value = '';
    }

    showLoadError() { // override
        this._showNotification('This attempt to send comment failed, please try again later...');
    }

    _showNotification(text) {
        let value = this._textField.value;
        let textField = this._textField;

        textField.value = text;

        setTimeout(function() {
            textField.value = value;
        }, 1500);
    }
}
