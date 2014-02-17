supaUploader.models.Image = Backbone.Model.extend({

  url: function(){
    return supaUploader.image_upload_url;
  },

  allowed: function() {
    return this.get('position') > parseInt($("#product_image_allowance").val());
  }

});