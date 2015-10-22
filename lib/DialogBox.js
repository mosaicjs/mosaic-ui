import React from 'react';

function deferred(method, time, context) {
    let id;
    time = time || 10;
    context = context || this;
    return function(...params){
        if (id) {
            clearTimeout(id);
            id = 0;
        }
        id = setTimeout(function(){
            id = 0;
            method.call(context, ...params);
        }, time);
    };
}

export default class DialogBox {
    
    constructor(mountNode){
        this.mountNode = mountNode;
    }
    
    _onStateUpdate(state){
        this._state = state;
    }
    
    show(){
        setTimeout(function(){
            React.render(this.view, this.mountNode);
        }.bind(this), 1);
        return this;
    }
    
    close() {
        React.unmountComponentAtNode(this.mountNode);
        return this;
    }
    
    setContent(state){
        this._onStateUpdate(state);
    }
    
    static show(mountNode){
        let dialogBox = new DialogBox(mountNode);
        class DialogBoxView extends React.Component {
            constructor(...params){
                super(...params);
                this.state = this.props.box._state;
                delete this.props.box._state;
                this.props.box._onStateUpdate = this._onStateUpdate.bind(this);
            }
            _onStateUpdate(fields){
                this.setState(fields);
                this.forceUpdate();
            }
            render(){
                let header, body, footer;
                if (this.state.footer){
                    footer = (<div className="modal-footer">{this.state.footer}</div>)
                }
                if (this.state.body) {
                    body = (<div className="modal-body">{this.state.body}</div>);
                }
                if (this.state.header) {
                    header = (<div className="modal-header">{this.state.header}</div>);
                } else if (this.state.title){
                    header = (
                        <div className="modal-header">
                            <h4 className="modal-title">{this.state.title}</h4>
                        </div>
                    );
                }
                return (
                  <div className="modal" style={{display: 'block'}}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                          {header}
                          {body}
                          {footer}
                      </div>
                    </div>
                  </div>
                );
            }
        }
        dialogBox.view = <DialogBoxView box={dialogBox} />;
        return dialogBox.show();
    }
    
}