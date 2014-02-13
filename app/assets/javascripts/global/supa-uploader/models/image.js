supaUploader.models.Image = Backbone.Model.extend({

  url: function(){
    return '/admin/products/create_supa_image.js'
  },

  allowed: function() {
    return this.get('position') > parseInt($("#product_image_allowance").val()) - 1;
  }

});