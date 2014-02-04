supaUploader.collections.ImageList = Backbone.Collection.extend({

  model: supaUploader.models.Image,
  url: function(){
    return '/fruit_images.js';
  },

  initialize: function(){

  },

  render: function(){
    var template_html = this.template({
      image: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  }

});