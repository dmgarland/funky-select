supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  id: 'sortable-image-list',
  template: JST['global/supa-uploader/templates/image-list'],
  events: {
    // 'click .image-container' : 'de',
    'click .action-icon-holder' : 'deleteImage',
    'mousedown .uploaded-image' : 'toggleMove',
    'mouseup .uploaded-image' : 'toggleMove',
    'dragstart .uploaded-image' : 'deactivateUploader',
    'dragend .uploaded-image' : 'activateUploader',
  },

  initialize: function(){
  },

  render: function(){
    $(".file-image").addClass("hidden");
    $("#sortable-image-list").remove();
    var template_html = this.template({
      images: this.model.attributes
    });

    this.$el.html(template_html);
    $("#sortable-image-list").sortable({
      axis: 'x',
      dropOnEmpty: false,
      handle: '.move',
      cursor: 'crosshair',
      items: 'div.question-row',
      opacity: 0.4,
      scroll: true,
      containment: 'parent',
      // update: function() {
      //   calculate_positions('#personalized_product_options .question-row');
      // }
    });
    $("#sortable-image-list").disableSelection();
    return this;
  },

  deleteImage: function(event){
    $(event.currentTarget.children[0]).toggleClass('hidden');
    $(event.currentTarget.children[1]).toggleClass('hidden');
    // NOTE - WIP - looking for smoother way to do it with ID
    $(event.currentTarget.previousElementSibling.children[1]).toggleClass("selected");
    $(event.currentTarget.previousElementSibling.children[1].children).toggleClass("hidden");
  },

  stopDragDrop: function(event){
    event.stopPropagation();
    event.preventDefault();
  },

  toggleMove: function(event){
    $(event.currentTarget.parentNode.parentNode.firstElementChild).toggleClass("hidden");
  },

  deactivateUploader: function(event){
    $('.uploader-holder').removeAttr('id');
  },

  activateUploader: function(event){
    $('.uploader-holder').attr('id', 'draggable-area');
  }

});