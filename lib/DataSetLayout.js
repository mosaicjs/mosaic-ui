import React from 'react';
import ViewLayout from './ViewLayout';
import Utils from './Utils';

export default class DataSetLayout extends ViewLayout {
    
    constructor(...params){
        super(...params);
        this._reload = Utils.debounce(this._reload.bind(this), 100);
        this._onSetUpdates = this._onSetUpdates.bind(this);
    }
    _triggerListeners(method) {
        const dependencies = this.props.dependencies || [];
        dependencies.forEach(function(set){
            if (set){
                set[method]('update', this._onSetUpdates);
            }
        }, this);
    }
    componentWillMount(){
        this._triggerListeners('addListener');
    }
    componentWillUnmount(){
        super.componentWillUnmount();
        this._triggerListeners('removeListener');
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