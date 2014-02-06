supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  template: JST['global/supa-uploader/templates/image-list'],
  events: {
  },

  initialize: function(){
    // this.listenTo(this.model, 'all', this.render);
  },

  render: function(){
    $(".file-image").addClass("hidden");
    $("#single-image-upload-list").remove();
    var template_html = this.template({
      images: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  }

});