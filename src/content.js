function TaiwanPhone_AddDashes(f)
{
  if (/09\d{8}/.test(f)) {
    return f.slice(0,4) + "-" + f.slice(4,7) + "-" + f.slice(7);
  } else {
    return f ;
  }
}

try {
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  var orders = document.getElementsByClassName('group');
  tickets = []
  for (var i = 0; i < orders.length; i ++) {
    var order           = orders[i]
    var recipient       = order.getElementsByClassName('recipient')[0].getElementsByTagName('i')[0].innerHTML; // 購買人
    var buyer           = order.getElementsByClassName('buyer')[0].getElementsByTagName('a')[0].text; // 購買人(別名)
    var order_no        = order.getElementsByClassName('serial')[0].getElementsByTagName('a')[0].innerHTML; // 訂單編號
    var product_title   = order.getElementsByClassName('title')[0].getElementsByTagName('a')[0].text; // 產品名稱
    var quantity_detail = order.getElementsByClassName('quantity')[0].textContent // 數量資料
    var shipping        = order.getElementsByClassName('shipping')[0].innerHTML.replace("<span class=\"text\">運送方式：</span>","").replace("<i>", "").replace("</i>", "").trim(); // 運送方式
    var full_address    = order.getElementsByClassName('address')[0].getElementsByTagName('i')[0].innerHTML.trim(); // 長地址
    var subtotal        = order.getElementsByClassName('subtotal')[0].textContent; // 價格加總
    var order_data      = order.getElementsByClassName('message')[0].getElementsByTagName('span')[0].textContent.replace(/\n|\r/g, ""); // 訂單資料 - 備註
    var minisum         = order.getElementsByClassName('minisum')[0].textContent; // 金額算式 例： 總金額：790 (商品) + 65 (運費) + 0 (金流手續費) - 21 (折抵) = NT$834
    var payment_method  = order.getElementsByClassName('payment-method')[0].textContent.replace("付款方式：", "").trim(); // 付款方式
    var order_date      = order.getElementsByClassName('time')[0].textContent.match(/\d{4}\/\d{2}\/\d{2}/)[0]; //下單時間
    var order_url       = order.getElementsByClassName('newtab')[0].href; // 訂單頁面

    // 付款日期
    var pay_date        = order.getElementsByClassName('payment')[0].getElementsByClassName('left')[0].getElementsByTagName('div')[2].textContent.match(/\d{4}\/\d{2}\/\d{2}/)
    if (pay_date != null) {
      pay_date = pay_date[0]
    }

    var tel             = order.getElementsByClassName('tel')[0].getElementsByTagName('i')[0].innerHTML.replace(/ /ig,'-'); // 收件人電話 TODO 改成中間有線
    tel                 = TaiwanPhone_AddDashes(tel);

    var zip_or_shipping; // 郵遞區號或運送方式
    var address; // 地址或超商資訊
    if (shipping.indexOf("7-11") == 0 ) {
      zip_or_shipping = "7-11"
      address         = order.getElementsByClassName('sevenstore')[0].getElementsByTagName('i')[0].innerHTML.trim();
    } else if (shipping.indexOf("郵寄") == 0) {
      zip_or_shipping = full_address.match(/\d+/)[0];
      address         = full_address.replace(zip_or_shipping, "").trim();
    } else if (shipping.indexOf("全家") == 0) {
      zip_or_shipping = "全家"
      address         = order.getElementsByClassName('sevenstore')[0].getElementsByTagName('i')[0].innerHTML.trim();
    } else {
      zip_or_shipping = shipping
      address         = full_address
    }

    var variation_detail = ""
    if (order.getElementsByClassName('variation').length != 0) {
      variation_detail = order.getElementsByClassName('variation')[0].textContent; // 商品規格
    }

    var redeemed = ""
    if (order.getElementsByClassName('message')[0].getElementsByClassName('memo').length != 0) {
      redeemed = order.getElementsByClassName('message')[0].getElementsByClassName('memo')[0].textContent //折抵說明
    }

    tickets.push({recipient:        recipient,
                  buyer:            buyer,
                  tel:              tel,
                  zip_or_shipping:  zip_or_shipping,
                  address:          address,
                  shipping:         shipping,
                  order_no:         order_no,
                  product_title:    product_title,
                  quantity_detail:  quantity_detail,
                  variation_detail: variation_detail,
                  subtotal:         subtotal,
                  order_data:       order_data,
                  minisum:          minisum,
                  payment_method:   payment_method,
                  order_date:       order_date,
                  redeemed:         redeemed,
                  order_url:        order_url,
                  pay_date:         pay_date
                })
  }

  var str = tickets.map(function(item){return item.recipient + '\t' + 
                                              item.buyer + '\t' + 
                                              item.tel + '\t' + 
                                              item.zip_or_shipping + '\t' + 
                                              item.address + '\t' + 
                                              item.shipping + '\t pinkoi-' + 
                                              item.order_no + '\t' +
                                              item.product_title + ' ' + item.quantity_detail + ' ' + item.variation_detail + ' ' + item.subtotal + '\t' +
                                              item.order_data + '\t' +
                                              item.minisum + '\t' +
                                              item.payment_method + '\t' +
                                              item.order_date + '\t' +
                                              item.pay_date + '\t' +
                                              item.redeemed + '\t' +
                                              item.order_url
                                            }).join("\n");
  textarea.value = str;
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  // alert('Pinkoi，訂單資料，已經放入剪貼簿了');
}
catch (err) {
  alert('有點問題。');
  console.log(err);
}