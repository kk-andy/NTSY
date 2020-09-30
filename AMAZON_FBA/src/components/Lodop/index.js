import { getLodop } from "./LodopFuncs"

function CreateOneFormPage(form1) {
  LODOP = getLodop();
  //样式
  var olstyle1 =
    "<style>" + document.getElementById("olstyle1") + "</style>";
  var body =
    olstyle1 +
    "<body>" +
    document.getElementById("form1").innerHTML +
    "</body>";
  LODOP.PRINT_INIT("订单"); //打印初始化
  LODOP.SET_PRINT_STYLE("FontSize", 18); //设置对象风格
  LODOP.SET_PRINT_STYLE("Bold", 1); //设置对象风格
  LODOP.SET_PRINTER_INDEX("ZDesigner GK888t");
  LODOP.ADD_PRINT_TEXT(50, 521, 130, 39, this.description); //增加纯文本项
  LODOP.SET_PRINT_PAGESIZE(0, 100, 30, ""); //设定纸张大小
  LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "55%"); //设置缩放
  LODOP.SET_PREVIEW_WINDOW(2, 2, 0, 0, 0, ""); //设置窗口
  // 打印二维码
  // LODOP.ADD_PRINT_BARCODE(23,23,233,233,"QRCode","https://blog.csdn.net/qq_43652509");
  //打印网址
  // LODOP.ADD_PRINT_URL(222,2000,2000,233,"https://blog.csdn.net/qq_43652509");
  //打印图片
  // LODOP.ADD_PRINT_IMAGE(100,100,400,400,"<img border='0' src='http://s1.sinaimg.cn/middle/4fe4ba17hb5afe2caa990&690' width='345' height='250'>");
  LODOP.ADD_PRINT_HTML(88, 20, 100, 30, body); //增加超文本项
}
export function printPreview(s, id) {
  CreateOneFormPage(id);
  if (s == 0) {
    LODOP.PRINT(); //直接打印
  }
  if (s == 1) {
    LODOP.PREVIEW(); //打印预览
  }
  if (s == 2) {
    LODOP.PRINT_SETUP(); //打印维护
  }
  if (s == 3) {
    LODOP.PRINT_DESIGN(); //打印设计
  }
};