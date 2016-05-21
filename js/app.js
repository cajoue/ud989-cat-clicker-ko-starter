// separate the Model from the ViewModel
// move all cat logic to it's own function

var Cat = function (){
  // Model data is now separate to the ViewModel!!
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
  this.imgAttribution = ko.observable('https://flickr.com/photos/big');
  this.nicknames = ko.observableArray(['kit', 'kitty', 'kitkat', 'kitty kat']);
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
  // our ViewModel is now much more simple
  // still require a cat object, make the current cat an observable
  this.currentCat = ko.observable(new Cat());

  // update increment counter to get click info from the Cat Model
  this.incrementCounter = function(){
    this.currentCat().clickCount(this.currentCat().clickCount() + 1);
  };
}
ko.applyBindings(new ViewModel());