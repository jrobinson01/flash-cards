/** localStorage wrapper **/
class Db {
  constructor(){
    //...
  }

  post(location, data) {
    // create a new item in localStorage
    // returns a promise that resolves on success, rejects on error
    // ...
  }

  put(location, data) {
    // returns a promise that resolves with data
    //...
  }

  get(location) {
    // returns a promise that resolves with data
    // ...
  }

  delete(location) {
    // returns a promise that resolves on success, rejects on error
    // ...
  }
}

// export a single instance
export default new Db();
