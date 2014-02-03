supaUploader.views.supaUploaderView = Backbone.view.extend({

  tagName: 'div',
  className: 'supa-uploader',
  template: JST['templates/supa-uploader'],
  events: {

  }

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function(){
    var template_html = this.template({
      image: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  },

  draggableUploader: function(event){
    stopDragDrop(event);
    var _this = this;
    var files = event.originalEvent.dataTransfer.files;
    $(".uploader-holder").removeClass("user-over-draggable-area");
    _.each(files, function(file){
      queue.push(file)
    });

    _.each(queue, function(file){
      $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
      uploadFile(file, _this)
    });
  },

  stopDragDrop: function(event){
    event.stopPropagation();
    event.preventDefault();
  },

  prepareToDrag: function(event){
    $(document).on('dragenter', function(event) {
      stopDragDrop(event);
    });

    $(document).on('dragleave', function(event){
      stopDragDrop(event);
      $(".file-image").removeClass("hidden");
      $(".uploader-holder").removeClass("user-over-draggable-area");
    });

    $(document).on('dragover', function(event) {
      stopDragDrop(event);
      $(".file-image").addClass("hidden");
      $(".uploader-holder").addClass("user-over-draggable-area");
    });

    $(document).on('drop', function(event) {
      stopDragDrop(event);
    });
  },

  normalUploader: function(event){
    var _this = this;

    _.each(_this.files, function(file){
      queue.push(file)
    });

    _.each(queue, function(file){
      $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
      uploadFile(file, _this)
    });
  },

  deleteFromQueue: function(response){
    _.each(queue, function(file, i){
      if (file == response){
        queue.pop(i, 0)
      }
    });
  },

  getUrl: function(){
    return $(".funky-upload").data('url');
  },

  uploadFile: function(file, _this) {
  var form_data = new FormData();
  form_data.append('file', file);

  $.ajax({
    url: getUrl(),
    type: 'POST',
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    success: function(json) {
      _.each(queue, function(f, i){
        if (file == f){
          queue.pop(i, 0)
        }
      });

      if (queue.length == 0){
        $(_this).closest("form").find("input[type=submit]").removeAttr('disabled');
        uploadComplete(_this);
      }

      $("#uuid").val(json.uuid);
      // var image = $("<img>");
      // var imageHolder = $("<div class='imageHolder'></div>")
      // image.attr("src", json.path);
      // image.appendTo(imageHolder);
      // imageHolder.appendTo("#image-uploaded-holder");
      // $(imageHolder).animate({
      //   width: "178px",
      //   height: "178px"
      // }, 400 );
    }
  });

});