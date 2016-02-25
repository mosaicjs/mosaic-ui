import React from 'react';
import Utils from './Utils';

export default class ViewLayout extends React.Component {
    constructor(options, ...params){
        super(options, ...params);
        this.options = options || {};
        this.state = this._newState();
    }
    componentDidMount(){
        this.mounted = true;
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