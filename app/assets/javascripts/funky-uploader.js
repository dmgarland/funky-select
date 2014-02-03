$(document).ready(function() {
    var image = new supaUploader.models.Image();
    var view = new supaUploader.views.supaUploaderView({ model : image });
    var uploader = view.render();
    $("#supauploader-holder").html(uploader.el);
});