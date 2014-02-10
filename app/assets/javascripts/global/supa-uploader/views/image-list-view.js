supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  id: 'sortable-image-list',
  template: JST['global/supa-uploader/templates/image-list'],
  events: {
    'click .action-icon-holder' : 'deleteImage',
    'mousedown .layer-over-image' : 'addMove',
    'mouseup .layer-over-image' : 'removeMove',
    'mousedown .uploaded-image' : 'addMove',
    'mouseup .uploaded-image' : 'removeMove',
    'mousedown .lock-over-not-allowed-image' : 'addMove',
    'mouseup .lock-over-not-allowed-image' : 'removeMove',
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
    $(event.currentTarget).find(".delete").toggleClass("hidden");
    $(event.currentTarget).find(".restore").toggleClass("hidden");

    var destroyField = $(event.currentTarget).find(".destroy-image-field");
    destroyField.attr("value", destroyField.attr("value") == "true" ? "false" : "true");

    $(event.currentTarget.parentNode).find(".layer-over-image").toggleClass("selected-to-destroy");
  },

  stopDragDrop: function(event){
    event.stopPropagation();
    event.preventDefault();
  },

  removeMove: function(event){
    $(event.currentTarget.parentNode.parentNode).find(".move-uploaded-image").addClass("hidden");
    $(event.currentTarget.parentNode.parentNode).find(".lock-over-not-allowed-image").removeClass("hidden");
  },

  addMove: function(event){
    if ($(event.currentTarget.parentNode).find(".lock-over-not-allowed-image").attr("class") == "lock-over-not-allowed hidden"){

      $(event.currentTarget.parentNode).find(".lock-over-not-allowed-image").addClass("hidden");
      $(event.currentTarget.parentNode.parentNode).find(".move-uploaded-image").removeClass("hidden");
      $(event.currentTarget.parentNode.parentNode).find(".lock-over-not-allowed-image").addClass("hidden");

    }else{

      $(event.currentTarget.parentNode.parentNode).find(".move-uploaded-image").removeClass("hidden");
      $(event.currentTarget.parentNode.parentNode).find(".lock-over-not-allowed-image").addClass("hidden");
    }

  },

  deactivateUploader: function(event){
    $(".uploader-holder").removeAttr("id");
  },

  activateUploader: function(event){
    $(".uploader-holder").attr("id", "draggable-area");
    $(event.currentTarget.parentNode.parentNode.firstElementChild).toggleClass("hidden");
    this.removeMove(event);
  }
});