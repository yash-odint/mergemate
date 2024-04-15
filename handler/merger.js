const PDFMerger = require("pdf-merger-js");
const merger = new PDFMerger();
const path = require("path");


const mergePDFs = async (arr, basePath) => {
  for(let i=0; i<arr.length; i++){
    await merger.add(path.join(basePath,arr[i]));
  }
  const date = new Date().getTime();
  await merger.save(`./public/merged/${date}.pdf`);
  await merger.reset();
  return date; //save under given name and reset the internal document
};

module.exports = {mergePDFs};