let myTest = (function () {
  let _name = '';
  getName = function () {
    return _name;
  }
  setName = function (newName) {
    newName === 'bob' ?
	_name = 'robert' :
	_name = newName;
  }
  return {
	getName: getName,
	setName: setName
  }
}());
