import Q from 'q';

export default class Rest {
    static _ajax(method, url, body = null) {

        let result = Q.defer();
        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (~~(xhr.status / 100) === 2) { //double negation strips decimal part
                if (xhr.response.length > 0) {
                    result.resolve(xhr.response);
                } else {
                    result.resolve('');
                }
            } else {
                result.reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.ontimeout = () => {
            result.reject({
                status: 504,
                statusText: 'Timeout'
            });
        };

        xhr.onabort = () => {
            result.reject({
                status: 520,
                statusText: 'Aborted'
            });
        };

        xhr.onerror = () => {
            result.reject({
                status: 520,
                statusText: 'A network error occured'
            });
        };

        xhr.open(method, url, true);

        if (body !== null) {
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(body);
        } else {
            xhr.send()
        }
        return result.promise
    }

    static get(url, body = null) {
        return Rest._ajax('GET', url, body);
    }

    static post(url, body) {
        return Rest._ajax('POST', url, body)
    }

    static put(url, body) {
        return Rest._ajax('PUT', url, body)
    }
    static delete(url) {
        return Rest._ajax('DELETE', url, body);
    }
}
