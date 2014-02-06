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
  },

  deleteImage: function(event){
    $(event.currentTarget.children[0]).toggleClass('hidden');
    $(event.currentTarget.children[1]).toggleClass('hidden');
    // NOTE - WIP - looking for smoother way to do it with ID
    $(event.currentTarget.previousElementSibling.children[1]).toggleClass("selected");
    $(event.currentTarget.previousElementSibling.children[1].children).toggleClass("hidden");
  }

});