const filterObj = (object, ...allowedFields) => {
  const newObj = {};
  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = object[el];
    }
  });
  return newObj;
};

export default filterObj;
