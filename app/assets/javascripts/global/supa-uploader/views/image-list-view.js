supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  template: JST['global/supa-uploader/templates/image-list'],
  events: {
    // 'click .image-container' : 'de',
    'click .action-icon-holder' : 'deleteImage'
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
  },

  deleteImage: function(event){
    $(event.currentTarget.children[0]).toggleClass('hidden');
    $(event.currentTarget.children[1]).toggleClass('hidden');
    // NOTE - WIP - looking for smoother way to do it with ID
    $(event.currentTarget.previousElementSibling.children[1]).toggleClass("selected");
    $(event.currentTarget.previousElementSibling.children[1].children).toggleClass("hidden");
  }

});