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
}
ko.applyBindings(new ViewModel());