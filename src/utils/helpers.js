// TODO: uninstall ajv

export const checkIfObjectEmpty = (obj) => (
  obj
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype
);

