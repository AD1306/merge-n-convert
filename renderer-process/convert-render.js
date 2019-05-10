const {ipcRenderer} = require('electron')
const $ = require('jquery');

$("#convertError").hide();
const convertBtn = $('#convertBtn');
var fileList = [];
$('#uploadedFile').change(function(e) {
    fileList = e.target.files[0].path;
})

convertBtn.addEventListener('click', () => {
  if(fileList == null || fileList.length <= 0) {
    $("#convertError p").text('Please choose file.');
    $("#convertError").show();
  } else {
    var args = [];
    args.push(fileList);
    ipcRenderer.send('convert', args);
  }
})

ipcRenderer.on("errorConverting", (event, arg) => {
  $("#convertError p").text('Please choose valid file format');
  $("#convertError").show();
})

ipcRenderer.on("successConverting", (event, arg) => {
  const notification = {
    title: "File Converted",
    body: "Your file can be found at " + arg[0]
  };
    const myNotification = new window.Notification(
      notification.title,
      notification
    )  
});