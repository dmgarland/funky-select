supaUploader.views.ImageView = Backbone.View.extend({

  tagName: 'li',
  className: 'product-image',
  template: JST['global/supa-uploader/templates/image'],
  events: {
  },

  initialize: function(){
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
    $(event.currentTarget.children[2]).attr('value',$(event.currentTarget.children[2]).attr('value') == 'true' ? 'false' : 'true');
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