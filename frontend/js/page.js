'use strict';

import * as polyfills from'./polyfills';

polyfills.installMatches(); //cross browser polyfill for 'matches' (does not supported by IE)
polyfills.installClosest(); //cross browser polyfill for 'closest' (does not supported by IE)
polyfills.installCustomEvent(); //cross browser polyfill for 'custom events' (does not supported by IE)

import AjaxService from './ajaxService.js';

import Breadcrumbs from './breadcrumbs.js';
import DirViewer from './dirViewer.js';
import FileViewer from './fileViewer.js';
import CommentsViewer from './commentsViewer.js'
import CommentSender from './commentSender.js'

export default class Page {
    constructor(options) {
        this._el = options.element;

        this._breadcrumbs = new Breadcrumbs({
            element: this._el.querySelector('[data-component="breadcrumbs"]')
        });
        this._breadcrumbs.on('back', this._onBackWasClicked.bind(this));
        this._breadcrumbs.showPath();

        this._dirViewer = new DirViewer({
            element: this._el.querySelector('[data-component="dirViewer"]')
        });
        this._dirViewer.on('itemWasSelected', this._onItemWasSelected.bind(this));
        this._dirViewer.on('fileWasDblClicked', this._onFileWasDblClicked.bind(this));

        this._fileViewer = new FileViewer({
            element: this._el.querySelector('[data-component="fileViewer"]')
        });

        this._commentsViewer = new CommentsViewer({
            element: this._el.querySelector('[data-component="commentsViewer"]')
        });

        this._commentSender = new CommentSender({
            element: this._el.querySelector('[data-component="commentSender"]')
        });
        this._commentSender.on('send', this._sendComment.bind(this));

        this._activeViewer = this._dirViewer;
        this._currentItemPath = null;

        this._loadDirContent();
    }

    _onItemWasSelected(event) {
        this._breadcrumbs.showPath(event.detail.path);

        this._commentSender.show();

        this._currentItemPath = event.detail.path;
        let path = '/comments:' + event.detail.path;

        AjaxService.ajax(path, {}).then(
            this._commentsViewer.showContent.bind(this._commentsViewer),
            this._commentsViewer.showLoadError.bind(this._commentsViewer));
    }

    _onFileWasDblClicked(event) {
        this._changeActiveViewer();
        this._breadcrumbs.toggleBackButton();

        let filePath = '/file:' + event.detail.filePath;

        AjaxService.ajax(filePath, {}).then(
            this._fileViewer.showContent.bind(this._fileViewer),
            this._fileViewer.showLoadError.bind(this._fileViewer));
    }

    _onBackWasClicked() {
        this._changeActiveViewer();
        this._breadcrumbs.toggleBackButton();
    }

    _sendComment(event) {
        AjaxService.ajax('/comment', {
            method: 'POST',
            body: {
                path: this._currentItemPath,
                comment: event.detail.comment
            }
        }).then(
            this._commentWasSentSuccessfully.bind(this),
            this._commentSender.showLoadError.bind(this._commentSender));
    }

    _loadDirContent() {
        AjaxService.ajax('/directory', {}).then(
            this._dirViewer.showContent.bind(this._dirViewer),
            this._dirViewer.showLoadError.bind(this._dirViewer));
    }

    _changeActiveViewer() {
        if (this._activeViewer === this._dirViewer) {
            this._dirViewer.hide();
            this._fileViewer.show();

            this._activeViewer = this._fileViewer;
        } else {
            this._fileViewer.hide();
            this._dirViewer.show();

            this._activeViewer = this._dirViewer;
        }
    }

    _commentWasSentSuccessfully(data) {
        this._commentsViewer.addSentComment(JSON.parse(data));
        this._commentSender.resetText();
    }
}