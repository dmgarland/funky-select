supaUploader.views.ImageListView = Backbone.View.extend({

  tagName: 'ul',
  className: 'image-list',
  id: 'sortable-image-list',
  events: {
    'click .action-icon-holder' : 'deleteImage',
    'mouseover .image-container' : 'addMove',
    'mouseout .image-container' : 'removeMove',
    'dragstart .uploaded-image' : 'deactivateUploader',
    'dragend .uploaded-image' : 'activateUploader'
  },

  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function(){
    var _this = this;
    _this.$el.html("");

    _.each(_this.collection.models, function(image, i) {
      image.set('position', i);
      var imageView = new supaUploader.views.ImageView({ model: image });
      _this.$el.append(imageView.render().el);
    });

    this.product_image_allowance();

    $(this.el).sortable({
      cursor: 'none',
      opacity: 0.7,
      update: function(request){
        _this.product_image_allowance(event);
      }
    });

    return this;
  },

  deleteImage: function(event){
    $(event.currentTarget).find(".delete").toggleClass("hidden");
    $(event.currentTarget).find(".restore").toggleClass("hidden");

    var destroyField = $(event.currentTarget).find(".destroy-image-field");
    destroyField.attr("value", destroyField.attr("value") == "true" ? "false" : "true");

    $(event.currentTarget.parentNode).find(".layer-over-image").toggleClass("selected-to-destroy");

    if ($(event.currentTarget.parentNode).css("border") != "1px solid rgb(255, 0, 0)"){
      $(event.currentTarget.parentNode).css("border", "1px solid red");
    }else{
      $(event.currentTarget.parentNode).css("border", "1px solid #d0bacc");
    }
  },

  stopDragDrop: function(event){
    event.stopPropagation();
    event.preventDefault();
  },

  removeMove: function(event){
    $(event.currentTarget).find(".move-uploaded-image").addClass("hidden");
    if ($(event.currentTarget).find(".uploaded-image").data("not-allowed") == "true"){
      $(event.currentTarget).find(".lock-over-not-allowed-image").removeClass("hidden");
    }
  },

  addMove: function(event){
    $(event.currentTarget).find(".move-uploaded-image").removeClass("hidden");
    $(event.currentTarget).find(".lock-over-not-allowed-image").addClass("hidden");
  },

  deactivateUploader: function(event){
    $(".uploader-holder").removeAttr("id");
  },

  activateUploader: function(event){
    $(".uploader-holder").attr("id", "draggable-area");
    $(event.currentTarget.parentNode.parentNode.firstElementChild).toggleClass("hidden");
    this.removeMove(event);
  },

  product_image_allowance: function(event){
    var _this = this;

    var listElements = $(this.el).find("li");
    _.each(listElements, function(item, index) {
      $(item).find("input[id$=position]").val(index + 1);
      if (index >= supaUploader.imageLimit){
        $(item).find(".uploaded-image").addClass("image-not-allowed");
        $(item).find(".lock-over-not-allowed-image").removeClass("hidden");
        $(item).find(".uploaded-image").data("not-allowed", "true");
      }else{
        $(item).find(".uploaded-image").removeClass("image-not-allowed");
        $(item).find(".lock-over-not-allowed-image").addClass("hidden");
        $(item).find(".uploaded-image").data("not-allowed", "false");
      }
    });
  }
});