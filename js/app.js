// separate the Model from the ViewModel
// move all cat logic to it's own function
// get ready for more cats

// data is an object literal that contains cat data
var Cat = function (data){
  // set values based on the object literal data that gets passed in
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.nicknames = ko.observableArray(data.nicknames);
  // computed observables
  // catLevel is dependant on clickCount and is computed from it
  this.catLevel = ko.computed(function(){
    var level;
    var clicks = this.clickCount();
    if (clicks < 3) {
      level = "kitten";
    } else if (clicks < 9) {
      level = "cat";
    } else {
      level = "schrodinger";
    }
    return level;
  }, this);
};

var ViewModel = function (){
  // store a pointer to hold reference to the ViewModel scope
  var self = this;
  // pass object literal data to new Cat
  // set data where Cat is created
  this.currentCat = ko.observable(new Cat({
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution: 'https://flickr.com/photos/big',
    nicknames: ['kit', 'kitty', 'kitkat', 'kitty kat']
  }));

  // update increment counter to get click info from the Cat Model
  // use 'self' inside the function instead of 'this':
  // 'self' references the ViewModel scope
  // 'this', inside the function, would reference the binding-context of currentCat() due to the 'with' binding in the html
  this.incrementCounter = function(){
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };
};


ko.applyBindings(new ViewModel());