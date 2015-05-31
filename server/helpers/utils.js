function removeTimeStamps(obj){
  delete obj['createdAt'];
  delete obj['updatedAt'];
  return obj;
}
function protectUserObj(obj){
  obj = removeTimeStamps(obj.dataValues);
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