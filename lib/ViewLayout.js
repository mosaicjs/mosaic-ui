import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(options, ...params){
        super(options, ...params);
        this.options = options || {};
        this.state = this._newState();
    }
    componentWillMount(){
    }
    componentDidMount(){
        this._hash = this._calculateHash();
        this.mounted = true;
    }
    
    componentWillReceiveProps(props){
    }
    componentDidUpdate(){
        this._hash = this._calculateHash();
    }
    
    componentWillUnmount(){
        this.mounted = false;
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.forceRedraw || !this._hash || (this._hash !== this._calculateHash());
    }
    
    _calculateHash(){
    }
    
    _newState(...args){
        return Utils.extend({}, this.state, ...args);
    }
    
    _updateState(...args){
        if (this.mounted !== false){
            this.setState(this._newState(...args));
        }
    }
}

ViewLayout.newFactory = function(){
    const Type = this;
    return function(params, item){ return <Type {...params} item={item} object={item}/> }
}
