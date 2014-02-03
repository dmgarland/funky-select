supaUploader.collections.ImageList = Backbone.Collection.extend({

  model: supaUploader.models.Image,
  url: function(){
    return '/fruit_images.js';
  },

  initialize: function(){

  }

});