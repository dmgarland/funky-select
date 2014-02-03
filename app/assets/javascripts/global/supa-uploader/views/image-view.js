supaUploader.views.ImageView = Backbone.View.extend({

  tagName: 'li',
  className: 'image',
  template: JST['global/supa-uploader/templates/image'],
  events: {
  },

  initialize: function(){
  },

  render: function(){
    this.$el.html(this.template);
    return this;
  },

});