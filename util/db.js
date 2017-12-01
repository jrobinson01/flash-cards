/** localStorage wrapper **/
class Db {

  // get some data
  // returns a promise that resolves on success, rejects on error
  get(location) {
    return new Promise((resolve, reject) => {
      // simulate network activity
      setTimeout(() => {
        let item = localStorage.getItem(location);
        if (item) {
          item = JSON.parse(item);
          resolve(item);
        } else {
          reject();
        }
      }, 500);
    });
  }

  // create new data
  // returns a promise that resolves on success, rejects on error
  post(location, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let item = localStorage.getItem(location);
        if (!item) {
          if (typeof data !== 'string') {
            data = JSON.stringify(data);
          }
          localStorage.setItem(location, data);
          resolve();
        } else {
          // item already exists
          reject();
        }
      }, 500);
    });
  }

  // update some data
  // returns a promise that resolves on success, rejects on error
  put(location, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let item = localStorage.getItem(location);
        if (!item) {
          reject();
        } else {
          item = JSON.parse(item);
          item = Object.assign(item, data);
          localStorage.setItem(location);
          resolve(item);
        }
      }, 500);
    });
  }

  // delete some data
  // returns a promise that resolves on success, rejects on error
  delete(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.removeItem();
        resolve();
      }, 500);
    });
  }
}

// export a single instance
export default new Db();
