// Hammer time, dance dance!
(function () {
  var queue = [];

  supaUploader.views.supaUploaderView = Backbone.View.extend({

    tagName: 'div',
    className: 'supa-uploader',
    template: JST['global/supa-uploader/templates/supa-uploader'],
    events: {
      'change .funky-upload' : 'normalUploader',
      'drop #draggable-area' : 'draggableUploader',
      'dragover .file-image' : 'removeFileImage'
    },

    initialize: function(){


      var _this = this;
      // Maybe will be refactored, just Batman knows.
      // Attached to the document on initialize, not possibility to attach them within this view, wouldn't work.
      $(document).on("dragenter", function(event) {
        _this.stopDragDrop(event);
        $(".file-image").fadeOut("slow", function() {
          $(this).addClass("hidden");
        });
      });

      $(document).on("dragleave", function(event){
        _this.stopDragDrop(event);
        $(".file-image").fadeOut("slow", function() {
          $(this).removeClass("hidden");
        });
        $(".uploader-holder").removeClass("user-over-draggable-area");
      });

      $(document).on("dragover", function(event) {
        _this.stopDragDrop(event);
        $(".uploader-holder").addClass("user-over-draggable-area");
      });

      $(document).on("drop", function(event) {
        _this.stopDragDrop(event);

        $(".file-image").fadeOut("slow", function() {
          $(this).removeClass("hidden");
        });
      });
    },

    render: function(){
      var _this = this;
      this.$el.html(this.template());

      // TODO - store on this?
      imageListView = new supaUploader.views.ImageListView();

      // TODO maybe put in initialize
      imageListView.collection.fetch({
        success: function(models) {
         // _this.collection.reset(models);
          _this.$el.find("#images-view").html(imageListView.render().el);
        }
      });

      return this;
    },

    removeFileImage: function(){
      //here is the animation
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

    // renderImage: function(model, response, _this){
    //   var image = new supaUploader.models.Image();
    //   var view = new supaUploader.views.ImageView({ model: model });
    //   _this.$el.find("#sortable-image-list").append(view.render().el);
    //   _this.activateSubmit(_this);
    //   var template = $(_this.el).find("ul");
    //   this.product_image_allowance(template);
    // },

    // renderMultipleImages: function(model, response, _this){
    //   $("#sortable-image-list").remove();
    //   var image = new supaUploader.models.Image();
    //   var view = new supaUploader.views.ImageListView({ model: model });
    //   _this.$el.find(".uploader-holder").prepend(view.render().el);
    //   _this.activateSubmit(_this);
    //   var template = $(_this.el).find("ul")
    //   this.product_image_allowance(template);
    // },

    product_image_allowance: function(template){
      var product_image_allowance = parseInt($("#product_image_allowance").val());
      var selector = "ul.#sortable-image-list li";

      $(selector).each(function(index) {
        $(template).find("input[id$=position]").val(index + 1);
        if (index >= product_image_allowance){
          $(this).find("img.uploaded-image").addClass("image-not-allowed");
          $(this).find("img.lock-over-not-allowed-image").removeClass("hidden");
          $(this).find("img.uploaded-image").attr("not-allowed", "true");
        }else{
          $(this).find("img.uploaded-image").removeClass("image-not-allowed");
          $(this).find("img.lock-over-not-allowed-image").addClass("hidden");
          $(this).find("img.uploaded-image").attr("not-allowed", "false");
        }
      });
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
                        }
      });
    },

    // ATTN: Not needing this right now
    getUrl: function(){
      return $(".funky-upload").data("url");
    }
  });

})();