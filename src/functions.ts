// no types avalable for fetch options
export const fetchAsync = (url: string, options?: any) => {
  if (options == null) {
    options = {};
  }
  return fetch(url, options).then((response: any) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    } else {
      const error = new Error(response.statusText || response.status);
      (error as any).response = response;
      return Promise.reject(error);
    }
  });
};
