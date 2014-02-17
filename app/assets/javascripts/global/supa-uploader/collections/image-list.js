supaUploader.collections.ImageList = Backbone.Collection.extend({

  model: supaUploader.models.Image,

  url: function(){
    return supaUploader.image_upload_url;
  },

  parse: function(data) {
    // TODO - why isn't this already set :/
    this.model = supaUploader.models.Image;

    return data;
  }

});