const PDFMerger = require("pdf-merger-js");
const merger = new PDFMerger();

const mergePDFs = async (p1, p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  const date = new Date().getTime();
  await merger.save(`../public/${date}.pdf`);
  return date; //save under given name and reset the internal document
};

module.exports = {mergePDFs};