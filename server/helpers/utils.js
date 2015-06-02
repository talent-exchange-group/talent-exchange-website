function removeTimeStamps(obj){
  if (obj.hasOwnProperty('dataValues')){
    obj = clone(obj.dataValues);
  }
  else {
    obj = clone(obj);
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
function protectOrgObj(obj, location){
  obj = protectUserObj(obj);
  delete obj['location_id']
  delete obj['Location']
  obj['location'] = location;
  return obj;
}
function standardizeInput(item){
  return item.toLowerCase().trim();
}
function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}
module.exports = {
  removeTimeStamps: removeTimeStamps,
  protectUserObj: protectUserObj,
  protectOrgObj: protectOrgObj,
  standardizeInput: standardizeInput
};