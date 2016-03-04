import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(options, ...params){
        super(options, ...params);
        this.options = options || {};
        this.state = this._newState();
    }
    componentWillMount(){
        this._forceRedraw = true;
    }
    componentDidMount(){
        this._reload();
        this._hash = this._calculateHash();
        this._forceRedraw = false;
        this.mounted = true;
    }
    
    componentWillReceiveProps(props){
        this._forceRedraw = this.props.forceRedraw;
    }
    componentDidUpdate(){
        this._hash = this._calculateHash();
        this._forceRedraw = false;
    }
    
    componentWillUnmount(){
        this.mounted = false;
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