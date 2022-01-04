export const mockApiCall = (success: boolean, timeout: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(true);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });
