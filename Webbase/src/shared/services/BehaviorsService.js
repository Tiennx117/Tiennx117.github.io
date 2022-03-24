import { Subject } from 'rxjs';
import { createContext } from 'react';
class BehaviorsService {
    constructor() {
        this.onShowAlert = new Subject();
        this.onHideAlert = new Subject();
        this.onShowConfirm = new Subject();
        this.onHideConfirm = new Subject();
    }
    alert(msg, opt) {
        opt = Object.assign({}, opt, { msg }); 
       
        return new Promise((resolve) => {
            const  subscriptions =this.onHideAlert.subscribe(res=>{
                subscriptions.unsubscribe();
                resolve(res);
            });
            this.onShowAlert.next(opt);     
        });
    }
    confirm(msg,opt){
        opt = Object.assign({}, opt, { msg }); 
        return new Promise((resolve) => {
            const  subscriptions =this.onHideConfirm.subscribe(res=>{
                subscriptions.unsubscribe();
                resolve(res);
            });
            this.onShowConfirm.next(opt);     
        });
    }


}
const BehaviorsContext = createContext({ beh: new BehaviorsService() });

export { BehaviorsContext, BehaviorsService };
