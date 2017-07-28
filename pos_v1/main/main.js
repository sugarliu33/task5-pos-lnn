'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
var tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}
function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


var allItemInfo = loadAllItems();
var promotionInfo = loadPromotions();

//获取商品购买信息
function buildItemInfo(tags, allIteminfo) {
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
  for (var value of allIteminfo){
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

var buyItemInfo = buildItemInfo(tags,allItemInfo);
//计算可优惠商品的优惠价格
function calculateItemPromotion(buyItemInfo, promotionInfo) {
  var promotionItem = promotionInfo[0].barcodes;
  for (var item of buyItemInfo){

  }
}

calculateItemPromotion(buyItemInfo,promotionInfo);
