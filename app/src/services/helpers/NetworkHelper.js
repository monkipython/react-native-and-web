
class NetworkHelper {

  static reqGET(url, headers = null){
    return NetworkHelper.reqHttp('GET', url, null, headers);
  }

  static reqPOST(url, params, headers = null){
    return NetworkHelper.reqHttp('POST', url, params, headers);
  }

  static reqPut(url, params, headers = null) {
    return NetworkHelper.reqHttp('PUT',url, params, headers);
  }

  static reqPatch(url, params, headers = null) {
    return NetworkHelper.reqHttp('PATCH',url, params, headers);
  }

  static reqDelete(url, params, headers = null) {
    return NetworkHelper.reqHttp('DELETE',url, params, headers);
  }

  static reqHttp(method, url, params, headers) {
    return new Promise((resolve, reject) => {
      var options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      if (params) {
        options.body = JSON.stringify(params);
      }

      fetch(url, options)
        .then((response) => {
          response.json()
          .then((body)=>{
            console.log({statusCode:response.status,body});
            resolve({statusCode:response.status,body});
          })
          .catch((error)=>{
            console.log(error);
            reject(error);
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}

export default NetworkHelper;
