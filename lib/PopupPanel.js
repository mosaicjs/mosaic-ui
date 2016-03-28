import React from 'react';
import ReactDOM from 'react-dom';

export default class PopupPanel {

    static get instance(){
        if (!this._instance) {
            this._instance = new PopupPanel();
        }
        return this._instance;
    }
    
    static _generatePopupId(){
        this._idCounter = (this._idCounter || 0) + 1; 
        return 'popup-id-' + this._idCounter;
    }
    
    constructor(options){
        this.options = options || {};
        this.stack = [];
        this.index = {};
    }
    
    get divStack() {
        if (!this._divStack) {
            this._divStack = [];
        }
        return this._divStack;
    }
    
    closePopup(options) {
        options = options || {};
        let id = options.id;
        if (!id && this.stack.length){
            let div = this.stack.pop();
            id = div.id;
        }
        const div = this.index[id];
        if (div) {
            const stack = [];
            let i, len;
            for (i=0, len = this.stack.length; i < len; i++) {
                const div = this.stack[i];
                if (div.id !== id) {
                    stack.push(div);
                } else {
                    break;
                }
            }
            for (; i < len; i++) {
                const div = this.stack[i];
                delete this.index[div.id];
                ReactDOM.unmountComponentAtNode(div);
                if (div.parentNode) {
                    div.parentNode.removeChild(div);        
                }
            }
            this.stack = stack;
        }
    }
    
    openPopup(options) {
        let div = document.createElement('div');
        let id = div.id = PopupPanel._generatePopupId();
        this.popupContainer.appendChild(div);
        this.stack.push(div);
        this.index[id] = div;
        ReactDOM.render(
                <PopupPanelView key="" popup={this} {...options} id={id}></PopupPanelView>,
                div);
        return id;
    }
    
    get popupContainer(){
        if (!this._popupContainer){
            this._popupContainer = document.body;
        }
        return this._popupContainer;
    }
    
    set popupContainer(container) {
        this._popupContainer = container;
    }
        
}

class PopupPanelView extends React.Component {
    
    constructor(...params){
        super(...params);
        this._updatePopupHeight = this._updatePopupHeight.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this.state = {};
    }
    
    componentDidMount() {
        this.mounted = true;
        window.addEventListener('resize', this._updatePopupHeight);
        document.addEventListener('keydown', this._onKeyDown);
        let that = this;
        this.updateHeight(function() {
            if (typeof that.props.onOpen === 'function') {
                that.props.onOpen(that);
            }
        });
        // Change the default Bootstrap settings
        let elm = ReactDOM.findDOMNode(this.refs.dialog);
        elm.style.marginTop = '0px';
        elm.style.marginBottom = '0px';
    }
    
    componentDidUpdate() {
        this._updatePopupHeight();
    }
    
    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener('resize', this._updatePopupHeight);
        document.removeEventListener('keydown', this._onKeyDown);
        if (typeof this.props.onClose === 'function') {
            this.props.onClose(this);
        }
    }
    
    _onKeyDown(event) {
        if (!this.props.disableEsc && event.which == 27) { // ESC
            this._closePopup();
        }
    }
    
    _updatePopupHeight() {
        this.updateHeight();
    }

    updateHeight(callback) {
        if (!this.mounted)
            return ;
        let containerElm = ReactDOM.findDOMNode(this);
        if (!containerElm)
            return ;
        let innerBorderElm = ReactDOM.findDOMNode(this.refs.innerBorder);
        let outerBorderElm = ReactDOM.findDOMNode(this.refs.outerBorder);
        let containerHeight = containerElm.offsetHeight;
        let outerHeight = outerBorderElm.offsetHeight;
        let contentPosition = //
        this._getPosition(innerBorderElm, outerBorderElm);
        let contentHeight = innerBorderElm.offsetHeight;
        let before = contentPosition.top;
        let after = outerHeight - (before + contentHeight);
        let margin = this.props.verticalMargin || 0;
        let height = containerHeight - (before + after) - (margin * 2);
        height = Math.max(height, 0);
        if (this.props.maxHeight) {
            height = Math.min(this.props.maxHeight, height);
        }
        if (!isNaN(height) && this.state.maxHeight !== height) {
            innerBorderElm.style.maxHeight = height + 'px';
            let that = this;
            setTimeout(function() {
                let containerHeight = containerElm.offsetHeight;
                let dialogElm = ReactDOM.findDOMNode(that.refs.dialog);
                if (dialogElm) {
                    let dialogHeight = dialogElm.offsetHeight;
                    let pos = Math.round((containerHeight - dialogHeight) / 2);
                    pos = Math.max(pos, 0);
                    dialogElm.style.top = pos + 'px';
                }
                if (callback) {
                    callback();
                }
            }, 1);
        } else {
            if (callback) {
                callback();
            }
        }
    }
    
    _newState(options) {
        const state = {};
        if (this.state){
            for (let key in this.state){
                state[key] = this.state[key];
            }
        }
        if (options){
            for (let key in options) {
                state[key] = options[key];
            }
        }
        return state;
    }
    
    _handleClose(force, ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (this.props.disableEsc && !force)
            return ;
        let onClose = this.props.onClose;
        let close = true;
        if (typeof onClose === 'function') {
            let result = onClose(ev);
            close = (result !== false);
        }
        if (close) {
            this._closePopup();
        }
    }
    _closePopup(){
        PopupPanel.instance.closePopup(this.props);
//        this.props.popup.closePopup(this.props);
    }
    _getPosition(el, parent) {
        let _x = 0;
        let _y = 0;
        while (el && el !== parent && !isNaN(el.offsetLeft) && //
        !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {
            top : _y,
            left : _x
        };
    }
    
    render() {
        let className = this.props.className || '';
        className = "modal-dialog " + className;
        let modalHeader;
        if (this.props.title !== undefined) {
            let closeBtn;
            if (this.props.closeButton) {
                closeBtn = (
                    <button type="button" className="close"
                        onClick={this._handleClose.bind(this, true)}>
                        <span area-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                );
            } 
            modalHeader = (
                <div className="modal-header">
                    {closeBtn}
                    <h4 className="modal-title">{this.props.title}</h4>
                </div>
            );
        }
        let modalFooter;
        if (this.props.footer !== undefined) {
            modalFooter = (
                 <div className="modal-footer">
                     {this.props.footer}
                 </div>
            );
        }
        const backdropStyle = { zIndex: 1040 };
        const dialogStyle = { zIndex: 1050 };
        return (
            <div className="modal in" tab-index="-1" role="dialog" ref="container" style={{display:'block'}}>
                <div className={className} ref="dialog" style={dialogStyle}>
                    <div className="modal-content" ref="outerBorder">
                        {modalHeader}
                        <div className="modal-body" ref="innerBorder">
                            {this.props.body}
                        </div>
                        {modalFooter}
                    </div>
                </div>
                <div className="modal-backdrop in" style={backdropStyle} onClick={this._handleClose.bind(this, false)}></div>
            </div>
        );
    }
    
}