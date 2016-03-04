import React from 'react';
import ViewLayout from './ViewLayout';
import Utils from './Utils';

export default class DataSetLayout extends ViewLayout {
    
    constructor(...params){
        super(...params);
        this._reload = Utils.debounce(this._reload, 30);
        this._reload = this._reload.bind(this);
    }
    get dependencies(){
        return this.props.dependencies || this.options.dependencies || [];
    }    
    componentWillMount(){
        this._onSetUpdates = this._onSetUpdates.bind(this);
        this.dependencies.forEach(function(set){
            set.addListener('update', this._onSetUpdates);
        }, this);
    }
    componentDidMount(){
        super.componentDidMount();
        this._reload();
        this._hash = this._calculateHash();
    }
    componentDidUpdate(){
        super.componentDidUpdate();
        this._hash = this._calculateHash();
    }
    componentWillUnmount(){
        super.componentWillUnmount();
        this.dependencies.forEach(function(set){
            set.removeListener('update', this._onSetUpdates);
        }, this);
    }
    _onSetUpdates(intent){
        delete this._hash;
        intent.then(function(){
            this._reload();
        }.bind(this))
    }
    _reload(){
        this._updateState(); 
    }
    shouldComponentUpdate(nextProps, nextState){
        const redraw = nextProps.forceRedraw || this._hash !== this._calculateHash(); 
        return redraw;
    }
    _calculateHash(){
        const array = [];
        this.dependencies.forEach(function(set){
            array.push(set.id + ':' + set.version);
        });
        return array.join(';');
    }
    
} 