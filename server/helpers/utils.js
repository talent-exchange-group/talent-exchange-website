function removeTimeStamps(obj){
  if (obj.hasOwnProperty('dataValues')){
    obj = obj.dataValues;
  }
  delete obj['createdAt'];
  delete obj['updatedAt'];
  return obj;
}
function protectUserObj(obj){
  obj = removeTimeStamps(obj);
  delete obj['password'];
  return obj;
}
function standardizeInput(item){
  return item.toLowerCase().trim();
}

module.exports = {
  removeTimeStamps: removeTimeStamps,
  protectUserObj: protectUserObj,
  standardizeInput: standardizeInput
};