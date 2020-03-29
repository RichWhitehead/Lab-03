'use-strict';


//created a global array
// const allpic2Objs = [];
const keywords = [];

//created a constructor function
function Pic2(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

Pic2.prototype.render = function () {
  let $pic2Clone = $('.photo-template').clone();
  $pic2Clone.find('h2').text(this.title);
  $pic2Clone.find('img').attr('src', this.url);
  $pic2Clone.find('p').text(this.description);
  $pic2Clone.removeClass('photo-template');
  $pic2Clone.attr('class', this.keyword); //keyword?
  $('main').append($pic2Clone);
};

// function will display pictures
function picDisp() {
  let $selected = $(this).val();
  if ($selected === 'default') {
    $('selectd').fadeIn();
    $('section').fadeIn();
    $('.photo-template').hide();
  } else {
    $('section').hide();
    $('.' + $selected).fadeIn();
  }
}

// This function appends to the menu to select different pictures
function selectPicture(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

// Function appends to the keywords array 
function keywordsArr() {
  keywords.sort();
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

function getData() {
  $.ajax('./data/page-1.json')
    .then(data => {
      data.forEach((object, idx) => {
        let pic2 = new Pic2(object);
        pic2.render();
        selectPicture(object.keyword);
      });
      keywordsArr();
    });
}

$(document).ready(function() {
  $('select').on('change', picDisp);
  getData();
});