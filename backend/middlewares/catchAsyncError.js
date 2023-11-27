module.exports = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
// for this we can alsp use the inbuilt npm module express async handler
