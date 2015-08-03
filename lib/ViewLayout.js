import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(...params){
        super(...params);
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
        if (this._mounted){
            this.setState(this._newState(...args));
        }
    }
}