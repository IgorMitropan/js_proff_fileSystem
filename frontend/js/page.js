'use strict';

import * as polyfills from'./polyfills';

polyfills.installMatches(); //cross browser polyfill for 'matches' (does not supported by IE)
polyfills.installClosest(); //cross browser polyfill for 'closest' (does not supported by IE)
polyfills.installCustomEvent(); //cross browser polyfill for 'custom events' (does not supported by IE)


import Breadcrumbs from './breadcrumbs.js';
import DirViewer from './dirViewer.js';
import FileViewer from './fileViewer.js';

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

        this._activeViewer = this._dirViewer;

        this._loadDirContent();
    }

    _onItemWasSelected(event) {
        this._breadcrumbs.showPath(event.detail.path);
    }

    _onFileWasDblClicked(event) {
        this._changeActiveViewer();
        this._breadcrumbs.toggleBackButton();

        let filePath = '/file:' + event.detail.filePath;

        this._ajax(filePath, {
            success: this._onContentLoad.bind(this),
            error: this._onContentLoadError.bind(this)
        });
    }

    _onBackWasClicked() {
        this._changeActiveViewer();
        this._breadcrumbs.toggleBackButton();
    }

    _loadDirContent() {
        this._ajax('/directory', {
            success: this._onContentLoad.bind(this),
            error: this._onContentLoadError.bind(this)
        });
    }

    _ajax(url, options) {
        let xhr = new XMLHttpRequest();

        let method = options.method || 'GET';

        xhr.open(method, url, true);

        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function() {
            options.success(xhr.status, xhr.responseText);
        };

        xhr.onerror = function() {
            options.error(new Error(xhr.responseText))
        };

        xhr.send();
    }

    _onContentLoad(status, data) {
        if (status === 200 || status === 304) {
            this._activeViewer.showContent(data);
        } else {
            let error = new Error(data);
            error.status = status;
            this._onContentLoadError(error);
        }
    }

    _onContentLoadError(error) {
        console.error(error);
        this._activeViewer.showLoadError(error);
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
}