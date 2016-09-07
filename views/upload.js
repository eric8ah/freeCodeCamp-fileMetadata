$('.upload-btn').on('click'), function() {
    $('#upload-input').click();
    console.log('upload btn has been clicked');
};

$('#upload-input').on('change', function() {
    var files = $(this).get(0).files;
    
    if (files.length > 0) {
      console.log('One or more files selected');
      
      var formData = new FormData();
      for (var i=0;i< files.length; i++) {
          var file = files[i];
          formData.append('uploads[]', file, file.name);
      }

$.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(data){
        console.log('upload successful!');
    }
});
}
});
