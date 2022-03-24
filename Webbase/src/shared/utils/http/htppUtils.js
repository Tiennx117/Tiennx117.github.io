
import { Observable } from 'rxjs';
import axios from 'axios';
export class HttpErrorResponse {
    constructor(otp) {
        this.error = otp.error;
        this.headers = otp.headers;
        this.status = otp.status;
        this.statusText = otp.statusText;
        this.url = otp.url;
        this.request=otp.request;
    }
}
export const HttpHandle = (config) => {
    return new Observable(subscriber => {
        axios.request(config).then(response => {
            subscriber.next(response.data);
            subscriber.complete();
        }).catch((err) => {   
                
            let res = err.response;
            let error = null;
            if (res) {
                error = new HttpErrorResponse({
                    error: err.response.data,
                    headers: err.response.headers,
                    status: err.response.status,
                    statusText: err.response.statusText,
                    url: err.response.config.url,
                    request:err.config
                });
            } else {
                error = { error: true, message: err.message };
            }           
            subscriber.error(error);
            //subscriber.complete();
        });

    });
};
export function jsonToUrlencoded(obj) {
    const str = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]||''));
        }
    }
    return str.join('&');
}