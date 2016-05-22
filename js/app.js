// separate the Model from the ViewModel
// move all cat logic to it's own function
// get ready for more cats

// bring on the cat data
// alternative this data could be loaded from a server (apparently trivial to implement)
var initialCats = [
  {
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution: 'https://flickr.com/photos/bigtallguy/434164568',
    nicknames: ['kit', 'kitty', 'kitkat', 'kitty kat']
  },
  {
    clickCount: 0,
    name: 'Tiger',
    imgSrc: 'img/4154543904_6e2428c421_z.jpg',
    imgAttribution: 'https://flickr.com/photos/xshamx/4154543904',
    nicknames: ['tigger']
  },
  {
    clickCount: 0,
    name: 'Scaredy',
    imgSrc: 'img/22252709_010df3379e_z.jpg',
    imgAttribution: 'https://flickr.com/photos/kpjas/22252709',
    nicknames: ['casper']
  },
  {
    clickCount: 0,
    name: 'Shadow',
    imgSrc: 'img/1413379559_412a540d29_z.jpg',
    imgAttribution: 'https://flickr.com/photos/malfet/1413379559',
    nicknames: ['shooby']
  },
  {
    clickCount: 0,
    name: 'Sleepy',
    imgSrc: 'img/9648464288_2516b35537_z.jpg',
    imgAttribution: 'https://flickr.com/photos/onesharp/9648464288',
    nicknames: ['zzzzzz']
  }
]


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

  // an observableArray to store all cats
  this.catList = ko.observableArray([]);

  // make the cats
  // pass object literal data to new Cat
  // loop over the data array and push each new cat into catList
  // use 'self' to avoid 'this' keyword scope confusion
  initialCats.forEach(function(catItem){
    self.catList.push( new Cat(catItem) );
  });

  // use first cat in catList as the first screen cat
  this.currentCat = ko.observable(this.catList()[0]);

  // update increment counter to get click info from the Cat Model
  // use 'self' inside the function instead of 'this':
  // 'self' references the ViewModel scope
  // 'this', inside the function, would reference the binding-context of currentCat() due to the 'with' binding in the html
  this.incrementCounter = function(){
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  // make the currentCat change when you click a cat in the list
  this.selectCat = function(newCat){
    self.currentCat(newCat); // of course! just pass the newCat to currentCat observable
    // self.currentCat = ko.observable(newCat); // don't assign a new observable
    console.log('clicked: ' + newCat.name());
    console.log('assigned: ' + self.currentCat().name());
  };
};


ko.applyBindings(new ViewModel());