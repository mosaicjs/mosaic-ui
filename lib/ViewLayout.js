import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(...params){
        super(...params);
        this.state = this._newState();
    }
    
    _newState(...args){
        return Utils.extend({}, this.state, ...args);
    }
    
    _updateState(...args){
        this.setState(this._newState(...args));
    }
}