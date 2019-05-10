const { ipcMain } = require("electron");
var DocxMerger = require("docx-merger");
var merge = require("easy-pdf-merge");
var fs = require("fs");

ipcMain.on("merge", (event, arg) => {
  if (arg[arg.length - 1] == "topdf") {
    var outputPath = arg[0].slice(0, arg[0].lastIndexOf("/")) + "/output.pdf";
    arg.pop();
    merge(arg, outputPath, function(err) {
      var args = [];
      args.push(outputPath);
      if (err) event.sender.send("errorMerging");
      else event.sender.send("successMerging", args);
    });
  } else {
    arg.pop();
    var outputPath = arg[0].slice(0, arg[0].lastIndexOf("/")) + "/output.docx";
    var files = [];
    for (var i = 0; i < arg.length; i++) {
      files.push(fs.readFileSync(arg[i], "binary"));
    }
    var docx = new DocxMerger({}, files);
    docx.save("nodebuffer", function(data) {
      fs.writeFile(outputPath, data, function(err) {
        var args = [];
        args.push(outputPath);
        if (err) event.sender.send("errorMerging");
        else event.sender.send("successMerging", args);
      });
    });
  }
});

