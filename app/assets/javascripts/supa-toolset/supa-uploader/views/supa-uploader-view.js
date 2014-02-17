// Hammer time, dance dance!
(function () {
  var queue = [];
  var imageListView;

  supaUploader.views.supaUploaderView = Backbone.View.extend({

    el: '#funky-upload-container',
    template: JST['supa-toolset/supa-uploader/templates/supa-uploader'],
    events: {
      'change .funky-upload' : 'normalUploader',
      'drop #draggable-area' : 'draggableUploader',
      'dragover .file-image' : 'removeFileImage'
    },

    initialize: function(){
      var _this = this;

      // Pick up methods to use for the URLs etc from Rails
      supaUploader.image_upload_url = this.$el.data('uploadUrl');
      supaUploader.images = new supaUploader.collections.ImageList()
      supaUploader.images.reset(this.$el.data('images'));

      $(document).on("dragenter", function(event) {
        _this.stopDragDrop(event);
        $(".file-image").fadeOut("400", function() {
          $(this).addClass("hidden");
        });
      });

      $(document).on("dragleave", function(event){
        _this.stopDragDrop(event);
        $(".uploader-holder").removeClass("user-over-draggable-area");
      });

      $(document).on("dragover", function(event) {
        _this.stopDragDrop(event);
        $(".uploader-holder").addClass("user-over-draggable-area");
      });

      $(document).on("drop", function(event) {
        _this.stopDragDrop(event);
      });
    },

    render: function(){
      var _this = this;
      this.$el.html(this.template());

      // TODO - store on this?
      imageListView = new supaUploader.views.ImageListView({collection: supaUploader.images});
      // TODO maybe put in initialize
      // imageListView.collection.fetch({
        // success: function(models) {

      _this.$el.find("#images-view").html(imageListView.render().el);
      $(".file-image").addClass("hidden");

        // },
        // error: function(models) {
          // console.log("TODO- Write a decent error message");
        // }
      // });

      return this;
    },

    removeFileImage: function(){
      $(".file-image").addClass("hidden");
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
      });
    },

    disableSubmit: function(_this){
      $(":submit").attr("id", "submit_data_button").attr("disabled", "disabled");
    },

    activateSubmit: function(_this){
      $(":submit").attr("id", "submit_data_button").removeAttr("disabled");
    },

    loadingSpinner: function(){
        $(".loader-holder").fadeToggle("slow", function() {
      });
    },

    uploadFile: function(file, _this) {
      var form_data = new FormData();
      form_data.append("file", file);
      form_data.append("uuid", $("#product_uuid").val());

      var ProductId = $("#product_id").val();
      form_data.append("id", ProductId);

      _this.loadingSpinner();

      _this.model.save(file,
                      {
                        data: form_data,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function(model, response){
                          _this.deleteFromQueue(response, model);
                          imageListView.collection.add(model.attributes);
                          _this.loadingSpinner();
                          _this.activateSubmit();
                        },
                        error: function(error){
                          console.log(error);
                        },
                        xhrFields: {
                          onprogress: this.onProgress
                        }
      });
    },

    // ATTN: Not needing this right now
    getUrl: function(){
      return $(".funky-upload").data("url");
    },

    onProgress: function(e) {
      var percent = Math.round(e.loaded / e.total * 100);
      console.log(""+ percent + "% complete.");
    }

  });

})();