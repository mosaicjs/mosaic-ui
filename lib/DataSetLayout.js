import React from 'react';
import ViewLayout from './ViewLayout';
import Utils from './Utils';

export default class DataSetLayout extends ViewLayout {
    
    constructor(...params){
        super(...params);
        this._reload = Utils.debounce(this._reload.bind(this), 30);
        this._onSetUpdates = this._onSetUpdates.bind(this);
    }
    get dependencies(){
        return this.props.dependencies || this.options.dependencies || [];
    }
    componentWillMount(){
        this.dependencies.forEach(function(set){
            set.addListener('update', this._onSetUpdates);
        }, this);
    }
    componentWillUnmount(){
        super.componentWillUnmount();
        this.dependencies.forEach(function(set){
            set.removeListener('update', this._onSetUpdates);
        }, this);
    }
    _onSetUpdates(intent){
        intent.then(function(){
            this._reload();
        }.bind(this));
    }
    _reload(){
        this._updateState();
    }
    
} 