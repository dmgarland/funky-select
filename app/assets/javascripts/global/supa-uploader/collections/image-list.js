supaUploader.collections.ImageList = Backbone.Collection.extend({

  model: supaUploader.models.Image,

  url: function(){
    return supaUploader.image_upload_url;
  }

});