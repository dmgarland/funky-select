// Hammer time, dance dance!
(function () {
  var queue = [];

  supaUploader.views.supaUploaderView = Backbone.View.extend({

    tagName: 'div',
    className: 'supa-uploader',
    template: JST['global/supa-uploader/templates/supa-uploader'],
    events: {
      'change .funky-upload' : 'normalUploader',
      'drop #draggable-area' : 'draggableUploader'
    },

    initialize: function(){
      this.collection = new supaUploader.collections.ImageList();

      var ProductId = $("#product_id").val();
      this.collection.product_id = ProductId;

      var _this = this;
      // Maybe will be refactored, just Batman knows.
      // Attached to the document on initialize, not possibility to attach them within this view, wouldn't work.
      $(document).on('dragenter', function(event) {
        _this.stopDragDrop(event);
      });

      $(document).on('dragleave', function(event){
        _this.stopDragDrop(event);
        $(".file-image").removeClass("hidden");
        $(".uploader-holder").removeClass("user-over-draggable-area");
      });

      $(document).on('dragover', function(event) {
        _this.stopDragDrop(event);
        $(".file-image").addClass("hidden");
        $(".uploader-holder").addClass("user-over-draggable-area");
      });

      $(document).on('drop', function(event) {
        _this.stopDragDrop(event);
      });
    },

    render: function(){
      var _this = this;
      this.$el.html(this.template());

      this.collection.fetch(
      {
        success: function(models, response){
          models.forEach(function(model){
            _this.renderMultipleImages(model, response, _this);
          });
        }
      });
      return this;
    },

    draggableUploader: function(event){
      this.stopDragDrop(event);
      var _this = this;
      var files = event.originalEvent.dataTransfer.files;
      $(".uploader-holder").removeClass("user-over-draggable-area");
      _.each(files, function(file){
        queue.push(file)
      });

      _.each(queue, function(file){
        _this.disableSubmit(_this);
        _this.uploadFile(file, _this)
      });
    },

    stopDragDrop: function(event){
      event.stopPropagation();
      event.preventDefault();
    },

    normalUploader: function(event){
      var _this = this;
      var files = event.target.files;
      _.each(files, function(file){
        queue.push(file)
      });

      _.each(queue, function(file){
        _this.disableSubmit(_this);
        _this.uploadFile(file, _this)
      });
    },

    deleteFromQueue: function(response, model){
      _.each(queue, function(file, i){
        if (file.name == response.upload_file_name && file.size === response.upload_file_size){
          queue.pop(i, 0)
        }
        console.log(queue);
      });
    },

    disableSubmit: function(_this){
      $(":submit").attr("id", "submit_data_button").attr("disabled", "disabled");
    },

    activateSubmit: function(_this){
      if (queue.length == 0){
        $(":submit").attr("id", "submit_data_button").removeAttr("disabled");
      }
    },

    renderImage: function(model, response, _this){
      var image = new supaUploader.models.Image();
      var view = new supaUploader.views.ImageView({ model: model });
      _this.$el.find(".image-list").append(view.render().el);
    },

    renderMultipleImages: function(model, response, _this){
      var image = new supaUploader.models.Image();
      var view = new supaUploader.views.ImageListView({ model: model });
      _this.$el.find(".uploader-holder").prepend(view.render().el);
    },

    uploadFile: function(file, _this) {
      var form_data = new FormData();
      form_data.append('file', file);
      form_data.append('uuid', $("#product_uuid").val());

      var ProductId = $("#product_id").val();
      form_data.append('id', ProductId);

      _this.model.save(file,
                      { data: form_data,
                      type: "POST",
                      contentType: false,
                      processData: false,
                      success: function(model, response){
                      _this.deleteFromQueue(response, model);
                      _this.activateSubmit(_this);
                      _this.renderImage(model, response, _this);
                    },
                    error: function(error){
                      console.log(error);
                    }
                  });
    },

    // ATTN: Not needing this right now

    getUrl: function(){
      return $(".funky-upload").data('url');
    }

  });

})();