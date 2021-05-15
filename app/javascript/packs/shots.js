//document.addEventListener("turbolinks:load", function() {
//  alert("이 메시지가 보이니?");
//  var previewImage = document.querySelector('.previewImage');
//
//  function handleFileSelect(evt) {
//    var files = evt.target.files; // FileList object
//
//    // Loop through the FileList and render image files as thumbnails.
//    for (var i = 0, f; f = files[i]; i++) {
//
//      // Only process image files.
//      if (!f.type.match('image.*')) {
//        continue;
//      }
//
//      var reader = new FileReader();
//
//      // Closure to capture the file information.
//      reader.onload = (function(theFile) {
//        return function(e) {
//          // Render thumbnail.
//          var span = document.createElement('span');
//          span.innerHTML = ['<img class="thumb" src="', e.target.result,
//            '" title="', escape(theFile.name), '"/>'
//          ].join('');
//          document.getElementById('list').insertBefore(span, null);
//        };
//      })(f);
//      // Read in the image file as a data URL.
//      reader.readAsDataURL(f);
//    }
//  }
//
//  if (previewImage) {
//    this.addEventListener('change', handleFileSelect, false);
//  }
//
//});


document.addEventListener("turbolinks:load", function() {
  var Shots = {
    previewShot() {
      console.log("previewShot");
      if (window.File && window.FileList && window.FileReader) {
        console.log("previewShot File API supported");

        function handleFileSelect(evt) {
          console.log("previewShot/handleFileSelect()");
          evt.stopPropagation();
          evt.preventDefault();

          //let files = evt.target.files || evt.dataTransfer.files;
          let files = evt.target.files || evt.dataTransfer.files;
          // files is a FileList of File objects. List some properties.
          for (var i = 0, f; f = files[i]; i++) {
            console.log(f.name);

            // Only process image files.
            if (!f.type.match('image.*')) {
              continue;
            }
            const reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                // Render thumbnail.
                let span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                  '" title="', escape(theFile.name), '"/>'
                ].join('');
                document.getElementById('list').insertBefore(span, null);
              };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
          }
        } //handleFileSelect()

        function handleDragOver(evt) {
          console.log("previewShot/handleDragOver()");
          evt.stopPropagation();
          evt.preventDefault();
          evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        } //handleDragOver()

        // Setup the dnd listeners.
        // https://stackoverflow.com/questions/47515232/how-to-set-file-input-value-when-dropping-file-on-page
        const dropZone = document.getElementById('drop_zone');
        const target = document.documentElement;
        const fileInput = document.getElementById('shot_user_shot');
        const previewImage = document.getElementById('previewImage');
        const newShotForm = document.getElementById('new_shot');

        if (dropZone) {
          console.log("previewShot/dropZone");
          dropZone.addEventListener('dragover', handleDragOver, false);
          dropZone.addEventListener('drop', handleFileSelect, false);

          // Drop zone classes itself
          dropZone.addEventListener('dragover', (e) => {
            console.log("dragover add fire");
            dropZone.classList.add('fire');
          }, false);

          dropZone.addEventListener('dragleave', (e) => {
            console.log("dragleave remove fire");
            dropZone.classList.remove('fire');
          }, false);

          dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            console.log("drop remove fire");
            dropZone.classList.remove('fire');
            fileInput.files = e.dataTransfer.files;
            // if on shot/id/edit hide preview image on drop
            if (previewImage) {
              previewImage.style.display = 'none';
            }
            // If on shots/new hide dropzone on drop
            if(newShotForm) {
              dropZone.style.display = 'none';
            }
          }, false);

          // Body specific
          target.addEventListener('dragover', (e) => {
            e.preventDefault();
            console.log("dragover dragging");
            dropZone.classList.add('dragging');
          }, false);

          // removes dragging class to body WHEN NOT dragging
          target.addEventListener('dragleave', (e) => {
            console.log("dragleave dragging fire");
            dropZone.classList.remove('dragging');
            dropZone.classList.remove('fire');
          }, false);
        }//if (dropZone)
      }// if(window.File window.FileList window.FileReader)
    },
    shotHover() {
      console.log("shotHover");
      $('.shot').hover(function() {
        $(this).children('.shot-data').toggleClass('visible');
      });
    }//shotHover()

  };
  Shots.previewShot();
  Shots.shotHover();

});
