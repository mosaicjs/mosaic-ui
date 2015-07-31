
export default class Utils {
    
    static extend(...params){
        let result = {};
        params.forEach(function(param){
            if (!param) return;
            for (let key in param){
                if (param.hasOwnProperty(key)){
                    result[key] = param[key];
                }
            }
        });
        return result;
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