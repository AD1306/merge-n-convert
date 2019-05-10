const { ipcRenderer } = require("electron");
const $ = require("jquery");

const convertBtn = document.getElementById("mergeBtn");
var fileList = [];
$("#mergeError").hide();
$("#mergeFiles").change(function(e) {
  fileList = e.target.files;
});

convertBtn.addEventListener("click", () => {
  if (fileList == null || fileList.length <= 1) {
    $("#mergeError p").text("Please choose multiple files of same format.");
    $("#mergeError").show();
  } else {
    var args = [];
    var mergeTo = document.querySelector('input[name="mergeTo"]:checked').value;
    for (var i = 0; i < fileList.length; i++) {
      args.push(fileList[i].path);
    }
    $("#mergeError").hide();
    args.push(mergeTo);
    ipcRenderer.send("merge", args);
  }
});

ipcRenderer.on("errorMerging", (event, arg) => {
  $("#mergeError p").text(
    "Please choose valid file format or valid merge type."
  );
  $("#mergeError").show();
});

ipcRenderer.on("successMerging", (event, arg) => {
  const notification = {
    title: "File Merged",
    body: "Your file can be found at " + arg[0]
  };
    const myNotification = new window.Notification(
      notification.title,
      notification
    )  
});
