supaUploader.views.ImageView = Backbone.View.extend({

  tagName: 'li',
  id: function(){
    return 'product-image-'+ this.model.id;
  },

  className: 'product-image',
  template: JST['supa-toolset/supa-uploader/templates/image'],
  events: {
  },

  render: function(){
    var template_html = this.template({
      image: this.model.attributes,
      allowed: this.model.allowed()
    });

    this.$el.html(template_html);
    return this;
  }

});