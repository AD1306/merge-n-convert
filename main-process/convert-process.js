const { ipcMain } = require("electron");
var docxConverter = require("docx-pdf");

ipcMain.on("convert", (event, arg) => {
    var outputPath = arg[0].slice(0, arg[0].lastIndexOf("/")) + "/output.pdf";
    docxConverter(arg[0], outputPath, function(err, result) {
      var args = [];
      args.push(outputPath);
      if (err) event.sender.send("errorConverting");
      else event.sender.send("successConverting", args);
    });
});
