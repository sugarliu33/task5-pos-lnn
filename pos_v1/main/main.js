'use strict';
var fixtures = require('../test/fixtures.js');
//TODO: 请在该文件中实现练习要求并删除此注释
var allItemInfo = fixtures.loadAllItems();
var promotionInfo = fixtures.loadPromotions();
//#1
function printReceipt(tags) {
  var buyItemInfo = buildItemInfo(tags,allItemInfo);
  var itemPromotions = calculateItemPromotion(buyItemInfo,promotionInfo);
  var itemSummary = calculateItemPrice(buyItemInfo);
  var totalSummary = calculateTotalPrice(itemSummary,itemPromotions);
  var printInfo = buildPrint(totalSummary,itemPromotions);
  console.log(printInfo);

}
//#2:获取商品购买信息
function buildItemInfo(tags, allItemInfo) {
  let tempTags = new Set([...tags].map(x => x.substring(0,10)));
  var buyItemInfo = [];
  for (var value of Array.from(tempTags)){
    buyItemInfo.push({barcode : value, quantity : 0});
  }
  for (var value of tags){
    var count = 1;
    if (value.length > 10 ){
      var temp = value.split('-');
      value = temp[0];
      count = Number.parseFloat(temp[1]);
    }
    for (var ans of buyItemInfo){

      if (ans.barcode == value){
        ans.quantity += count;
      }
    }
  }
  for (var value of allItemInfo){
    for (var item of buyItemInfo){
      if(item.barcode == value.barcode){
        item.name = value.name;
        item.unit = value.unit;
        item.price = value.price;
      }
    }
  }
  return buyItemInfo;
}
//#3: 计算可优惠商品的优惠价格
function calculateItemPromotion(buyItemInfo, promotionInfo) {
  var promotionItem = promotionInfo[0].barcodes;
  var itemPromotions = [];
  var tempPrice = 0;
  var totalSave = 0;
  for (let item of buyItemInfo) {
    itemPromotions.push({barcode:item.barcode,promotionPrice:0});
  }
  for (var item of buyItemInfo){
    if (promotionInfo[0].type == 'BUY_TWO_GET_ONE_FREE'){
      for (var id of promotionItem) {
        if (item.barcode == id && item.quantity >=2){
          tempPrice = item.price;
        }
        for (let ip of itemPromotions) {
          if (ip.barcode == id){
            ip.promotionPrice = tempPrice;
          }
        }
      }
    }
  }
  for (let ip of itemPromotions) {
    totalSave += ip.promotionPrice;
  }
  itemPromotions.totalSave = totalSave;
  return itemPromotions;
}
//#4: 计算购买商品的总价格
function calculateItemPrice(buyItemInfo) {
  for (let item of buyItemInfo) {
      item.summary = Number.parseFloat(item.price * item.quantity);
  }
  return buyItemInfo;
}
//#5:计算商品优惠后的总价格
function calculateTotalPrice(itemSummary,itemPromotions) {
  var total = 0;
  var totalSave = 0;
  for (let is of itemSummary) {
    for (let ip of itemPromotions) {
      if (is.barcode == ip.barcode){
        is.summary = is.summary - ip.promotionPrice;
      }
    }
    total += is.summary;
  }
  itemSummary.total = total;
  return itemSummary;
}
//#6: 创建打印票据单
function buildPrint(itemSummary,itemPromotions) {
  var printInfo = "***<没钱赚商店>收据***"+'\n';
  for (let is of itemSummary) {
    printInfo += "名称：" +is.name+"，数量："+is.quantity+is.unit+"，单价："+is.price.toFixed(2)
      +"(元)，小计："+is.summary.toFixed(2)+"(元)"+"\n";
  }
  printInfo += '----------------------'+'\n';
  printInfo += "总计："+itemSummary.total.toFixed(2)+"(元)"+'\n';
  printInfo += "节省："+itemPromotions.totalSave.toFixed(2)+"(元)"+'\n';
  printInfo += '**********************';
  return printInfo;
}

module.exports = printReceipt;
