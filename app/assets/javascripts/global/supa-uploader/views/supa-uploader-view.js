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
      var _this = this;
      this.render();

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
      console.log("hi");

      this.$el.html(this.template);
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

      _.each(_this.files, function(file){
        queue.push(file)
      });

      _.each(queue, function(file){
        disableSubmit(_this);
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

    disableSubmit: function(_this){
      $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
    },

    activateSubmit: function(_this){
      if (queue.length == 0){
        $(_this).closest("form").find("input[type=submit]").removeAttr('disabled');
        // allows option to modify behaviour on other end
        // uploadComplete(_this);
      }
    },

    uploadFile: function(file, _this) {
      var form_data = new FormData();
      form_data.append('file', file);
      console.log("hi");

      _this.model.save(file,
                    { data: form_data,
                      type: "POST",
                      contentType: false,
                      processData: false
                    },
                    { success: function(model, response){
                      deleteFromQueue(response);
                      activateSubmit(_this);
                    } });
    },

    // ATTN: Not needing this right now

    getUrl: function(){
      return $(".funky-upload").data('url');
    }

  });

})();