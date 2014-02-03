supaUploader.views.ImageView = Backbone.View.extend({

  tagName: 'li',
  className: 'image',
  template: JST['templates/image'],
  events: {

  },

  initialize: function(){

  },

  render: function(){
    var template_html = this.template({
      image: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  },



});