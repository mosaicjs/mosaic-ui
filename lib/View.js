
export default class View {
    constructor(options, data){
        this.props = this.options = options;
        this.object = data;
    }
    get className(){ return this.props.className }
    get style(){ return this.props.style; }
    _newId(){ 
        let id = this._newId.counter = (this._newId.counter || 0) + 1; 
        return 'id-' + id;
    }
    renderView(){
        throw new Error('Not implemented.');
    }
} 