var supaUploader = supaUploader || {
  models: {},
  views: {},
  collections: {}
};

function initialiseUploader() {
  var image = new supaUploader.models.Image();
  var view = new supaUploader.views.supaUploaderView({ model : image });
  var uploader = view.render();
  $(".funky-upload-container").html(uploader.el);
}