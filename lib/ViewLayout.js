import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(options, ...params){
        super(options, ...params);
        this.options = options || {};
        this.state = this._newState();
    }
    get mounted(){ return this._mounted; }
    componentDidMount(){
        this._mounted = true;
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    _newState(...args){
        return Utils.extend({}, this.state, ...args);
    }
    
    _updateState(...args){
        this.setState(this._newState(...args));
    }
}