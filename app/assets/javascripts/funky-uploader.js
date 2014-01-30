var queue = [];

$(document).ready(function(){
  $(".funky-upload").change(function(e){

    var _this = this;

    // $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");

    _.each(_this.files, function(file){
      queue.push(file)
    });

    _.each(queue, function(file){
      $(_this).closest("form").find("input[type=submit]").attr("disabled", "true");
      uploadFile(file, _this)
    });

  });
});

function deleteFromQueue(response){
  _.each(queue, function(file, i){
    if (file == response){
      queue.pop(i, 0)
    }
  });
}

function getUrl(){
  return $(".funky-upload").data('url');
}


function uploadFile(file, _this) {
  var form_data = new FormData();
  form_data.append('file', file);

  $.ajax({
    url: getUrl(),
    type: 'POST',
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    success: function() {
      _.each(queue, function(f, i){
        if (file == f){
          queue.pop(i, 0)
        }
      });

      // Callback about queue empty, allowing button be active again
      if (queue.length == 0){
        $(_this).closest("form").find("input[type=submit]").removeAttr('disabled');
        uploadComplete(_this);
      }
    }

  });
}