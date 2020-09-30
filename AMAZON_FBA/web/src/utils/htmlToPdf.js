import html2canvas from "html2canvas"
import JSPDF from "jspdf"
export default {
  install(Vue, options) {
    Vue.prototype.ExportSavePdf = function (htmlTitle, currentTime) {
      var element = document.getElementById("pdfCentent")
      html2canvas(element, {
        logging: false
      }).then(function (canvas) {
        var pdf = new JSPDF("p", "mm", "a4") // A4纸，纵向
        var ctx = canvas.getContext("2d")
        var a4w = 190;
        var a4h = 277 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
        var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        var renderedHeight = 0

        while (renderedHeight < canvas.height) {
          var page = document.createElement("canvas")
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight) // 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() } // 如果后面还有内容，添加一个空页
          // delete page;
        }
        // pdf.save(htmlTitle + currentTime) //下载
        window.open(pdf.output('bloburl')) //新标签打开生成的pdf

      })
    }
  }
}
// export default {
//   install(Vue, options) {
//     Vue.prototype.getPdf = function (title) {
//       let url;
//       html2Canvas(document.querySelector('#pdfDom'), {
//         allowTaint: true
//       }).then(function (canvas) {
//         let contentWidth = canvas.width
//         let contentHeight = canvas.height
//         let pageHeight = contentWidth / 592.28 * 841.89
//         let leftHeight = contentHeight
//         let position = 0
//         let imgWidth = 595.28
//         let imgHeight = 592.28 / contentWidth * contentHeight
//         let pageData = canvas.toDataURL('image/jpeg', 1.0)
//         let PDF = new JsPDF('', 'pt', 'a4')
//         if (leftHeight < pageHeight) {
//           PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//         } else {
//           while (leftHeight > 0) {
//             PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//             leftHeight -= pageHeighthhhhhhh
//             position -= 841.89
//             if (leftHeight > 0) {
//               PDF.addPage()
//             }
//           }
//         }
//         window.open(PDF.output('bloburl')) //新标签打开生成的pdf
//       })
//     }
//   }
// }