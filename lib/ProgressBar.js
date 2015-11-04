import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This progress listens the 'progress' event emitted by the 'events' tag
 * parameter. The expected fields in each event are: 'pos' - the current
 * progress position; 'len' - the total length of the progress
 */
export default class ProgressBar extends React.Component {
    constructor(...params){
        super(...params);
        this._onProgress = this._onProgress.bind(this);
        this.state = {progress : 0};
    }
    get progressEvent(){
        return this.props.progressEvent || 'progress';
    }
    componentDidMount(){
        const that = this;
        this.props.events.addListener(this.progressEvent, this._onProgress);
    }
    componentWillUnmount(){
        this.props.events.removeListener(this.progressEvent, this._onProgress);
    }
    _onProgress(ev){
        const progress = Math.round(100 * ev.pos / ev.len);
        if (this.state.progress !== progress) {
            const div = ReactDOM.findDOMNode(this.refs.bar);
            this.setState({ progress });
            this.forceUpdate();
        }
    }
    render(){
        const progress = this.state.progress;
        const className = 'progress-bar progress-bar-success progress-bar-striped active';
        const transition = 'none';
        const style = {
            WebkitTransition: transition,
            MozTransition: transition,
            OTransition: transition,
            transition: transition,
            width: progress + '%'
        }
        return (
             <div className="progress" key={this.props.key}>
                 <div className={className} role="progressbar" ref="bar"
                         aria-valuenow={progress}
                         aria-valuemin="0"
                         aria-valuemax="100"
                         style={style}>
                   <span className="sr-only">{progress}%</span>
                 </div>
             </div>
         );
    }
}