supaUploader.views.ImageView = Backbone.View.extend({

  tagName: 'li',
  className: 'product-image',
  template: JST['global/supa-uploader/templates/image'],
  events: {
  },

  initialize: function(){
    // this.listenTo(this.model, 'all', this.render);
  },

  render: function(){
    var template_html = this.template({
      image: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  }

});