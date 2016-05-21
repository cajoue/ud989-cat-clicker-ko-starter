var ViewModel = function (){
  //temporarily put Model data inside the ViewModel!!
  //here for simplicity, but will concentrate on making it functionally separate
  // will separate more cleanly later
  // our Model
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
  this.imgAttribution = ko.observable('https://flickr.com/photos/big');

  //our ViewModel
  // need an increment counter function
  // but don't need most of the functions we wrote before such as:
  // getCurrentCat() which allowed the view to get it from octopus to get it from model
  // don't need it cos knockout will handle the model-to-view and view-to-model synchronisation for us
  // the only time we need to write ViewModel methods is when we actually need to change something ourselves
  // as in the counter below
  this.incrementCounter = function(){
    this.clickCount(this.clickCount() + 1);
  };

  // computed observables
  // catLevel is dependant on clickCount and is computed from it
  this.catLevel = ko.computed(function(){
    // a regular array seems ok for now... but maybe it should be an observable one?
    var levels = ['newborn', 'infant', 'child', 'teen', 'adult', 'schrodinger'];
    if (this.clickCount() < 1 ) return levels[0];
    else if (this.clickCount() < 3 ) return levels[1];
    else if (this.clickCount() < 10 ) return levels[2];
    else if (this.clickCount() < 20 ) return levels[3];
    else if (this.clickCount() < 25 ) return levels[4];
    else return levels[5];
  }, this);

  // alternative catLevel function based on solution video
  // this.catLevel = ko.computed(function(){
  //   var level;
  //   var clicks = this.clickCount();
  //   if (clicks < 3) {
  //     level = "kitten";
  //   } else if (clicks < 9) {
  //     level = "cat";
  //   } else {
  //     level = "catastrophe";
  //   }
  //   return level;
  // }, this);


  // use control structure foreach to display nicknames in list in html
  // the array contents are very simple so can use $data to access the data at the current index
  this.nicknames = ko.observableArray(['kit', 'kitty', 'kitkat', 'kitty kat']);
}
ko.applyBindings(new ViewModel());