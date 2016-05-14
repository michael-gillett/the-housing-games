$(function() {
  $('#mike').on({
    'mouseover' : function() {
      this.src = 'data/images/michael.jpg';
    },
    'mouseout' : function() {
      this.src = 'data/images/seneca_crane.png';
    },
  });

  $('#matt').on({
    'mouseover' : function() {
      this.src = 'data/images/matt.jpg';
    },
    'mouseout' : function() {
      this.src = 'data/images/beetee.png';
    },
  });

  $('#ali').on({
    'mouseover' : function() {
      this.src = 'data/images/ali.jpg';
    },
    'mouseout' : function() {
      this.src = 'data/images/katniss.png';
    },
  });

  $('#sam').on({
    'mouseover' : function() {
      this.src = 'data/images/sam.png';
    },
    'mouseout' : function() {
      this.src = 'data/images/snow.png';
    },
  });
});