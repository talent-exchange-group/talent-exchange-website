var utilities = {
  removeTimeStamps: function(obj){
    delete obj['createdAt'];
    delete obj['updatedAt'];
    return obj;
  },
  standardizeInput: function(item){
    return item.toLowerCase().trim();
  }
};


module.exports = utilities;