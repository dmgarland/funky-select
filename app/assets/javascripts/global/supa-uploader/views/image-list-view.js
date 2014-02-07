supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  id: 'sortable-image-list',
  template: JST['global/supa-uploader/templates/image-list'],
  events: {
    'click .action-icon-holder' : 'deleteImage',
    'mousedown .uploaded-image' : 'removeMove',
    'mouseup .uploaded-image' : 'addMove',
    'dragstart .uploaded-image' : 'deactivateUploader',
    'dragend .uploaded-image' : 'activateUploader',
  },

  initialize: function(){
  },

  render: function(){
    $(".file-image").addClass("hidden");
    var template_html = this.template({
      images: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  },

  deleteImage: function(event){
    $(event.currentTarget.children[0]).toggleClass("hidden");
    $(event.currentTarget.children[1]).toggleClass("hidden");
    $(event.currentTarget.children[2]).attr("value",$(event.currentTarget.children[2]).attr("value") == "true" ? "false" : "true");
    // NOTE - WIP - looking for smoother way to do it with ID
    $(event.currentTarget.previousElementSibling.children[1]).toggleClass("selected");
    $(event.currentTarget.previousElementSibling.children[1].children).toggleClass("hidden");
  },

  stopDragDrop: function(event){
    event.stopPropagation();
    event.preventDefault();
  },

  addMove: function(event){
    $(event.currentTarget.parentNode.parentNode.firstElementChild).addClass("hidden");
  },

  removeMove: function(event){
    $(event.currentTarget.parentNode.parentNode.firstElementChild).removeClass("hidden");
  },

  deactivateUploader: function(event){
    $(".uploader-holder").removeAttr("id");
  },

  activateUploader: function(event){
    $(".uploader-holder").attr("id", "draggable-area");
    $(event.currentTarget.parentNode.parentNode.firstElementChild).toggleClass("hidden");
  }

});