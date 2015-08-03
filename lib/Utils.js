export default class Utils {
    
    static extend(to, ...from){
        from.forEach(function(param){
            if (!param) return;
            for (let key in param){
                if (param.hasOwnProperty(key)){
                    to[key] = param[key];
                }
            }
        });
        return to;
    }
    
    static debounce(method, timeout){
        let timerId;
        function clear() {
            if (!timerId) return ;
            clearTimeout(timerId);
            timerId = undefined;
        }
        return function(...args){
            let that = this;
            clear();
            timerId = setTimeout(function(){
                clear();
                method.apply(that, args);
            }, timeout);
        };
    }
    
}