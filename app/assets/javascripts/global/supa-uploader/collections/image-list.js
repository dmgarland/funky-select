supaUploader.collections.ImageList = Backbone.Collection.extend({

  model: supaUploader.models.Image,
  url: function(){
    return '/admin/product_images/'+ this.product_id +'.js';
  },

  parse: function(response){
    var _this = this;
    return response;
  },

  initialize: function() {

  }

});