$(document).ready(function() {
  console.log("hi");
    var image = new supaUploader.models.Image();
    var view = new supaUploader.views.supaUploaderView({ model : image });
    var uploader = view.render();
    $("#supauploader-holder").html(uploader.el);
});


// var queue = [];

// $(document).ready(function(){

//   $("#draggable-area").on("drop", function(event){
//     event.preventDefault();
//     event.stopPropagation();
//     //add here code to upload images
//     var _this = this;

//     var files = event.originalEvent.dataTransfer.files;
//     $(".uploader-holder").removeClass("user-over-draggable-area");
//     _.each(files, function(file){
//       queue.push(file)
//     });

//     _.each(queue, function(file){
//       $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
//       uploadFile(file, _this)
//     });
//   });

//   $(document).on('dragenter', function(e) {
//     stopDragDrop(e);

//   });

//   $(document).on('dragleave', function(e){
//     stopDragDrop(e);
//     $(".file-image").removeClass("hidden");
//     $(".uploader-holder").removeClass("user-over-draggable-area");
//   });

//   $(document).on('dragover', function(e) {
//     stopDragDrop(e);
//     $(".file-image").addClass("hidden");
//     $(".uploader-holder").addClass("user-over-draggable-area");
//     // $(".uploader-holder").attr("style", "-webkit-box-shadow: inset 0 0 200px #854371;")
//   });

//   $(document).on('drop', function(e) {
//     stopDragDrop(e);
//   });

//   function stopDragDrop(e) {
//     e.stopPropagation();
//     e.preventDefault();
//   }

//   $(".funky-upload").change(function(e){

//     var _this = this;

//     // $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");

//     _.each(_this.files, function(file){
//       queue.push(file)
//     });

//     _.each(queue, function(file){
//       $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
//       uploadFile(file, _this)
//     });

//   });
// });

// function deleteFromQueue(response){
//   _.each(queue, function(file, i){
//     if (file == response){
//       queue.pop(i, 0)
//     }
//   });
// }

// function getUrl(){
//   return $(".funky-upload").data('url');
// }


// function uploadFile(file, _this) {
//   var form_data = new FormData();
//   form_data.append('file', file);

//   $.ajax({
//     url: getUrl(),
//     type: 'POST',
//     data: form_data,
//     cache: false,
//     contentType: false,
//     processData: false,
//     success: function(json) {
//       console.log(json)
//       _.each(queue, function(f, i){
//         if (file == f){
//           queue.pop(i, 0)
//         }
//       });

//       if (queue.length == 0){
//         $(_this).closest("form").find("input[type=submit]").removeAttr('disabled');
//         uploadComplete(_this);
//       }

//       $("#uuid").val(json.uuid);
//       var image = $("<img>");
//       var imageHolder = $("<div class='imageHolder'></div>")
//       image.attr("src", json.path);
//       image.appendTo(imageHolder);
//       imageHolder.appendTo("#image-uploaded-holder");
//       $(imageHolder).animate({
//         width: "178px",
//         height: "178px"
//       }, 400 );




//     }
//   });
// }