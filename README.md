# Pinkoi 訂單整合工具

可以一次將訂單一次複製，貼到類似是 Execl 的工具

## 下載
- [build/CopyPastePinkoiOrder.crx](https://github.com/SammyLin/CopyPastePinkoiOrder/raw/master/build/CopyPastePinkoiOrder.crx)

## 安裝
- 開啟 chrome 把 [chrome://extensions/](chrome://extensions/) 貼上後，按下輸入，進入`擴充功能`， 將 `開發人員模式` 開啟
- 然後將 `CopyPastePinkoiOrder.crx` 檔案拉進 chrome 的 `擴充功能` 頁面裡
- 就會網址列中看到 ![image](https://cloud.githubusercontent.com/assets/872230/16708118/0b71d3a8-461a-11e6-8421-830bdfbc24f9.png)了


## 使用方式
1. 進到 [http://www.pinkoi.com/panel/order?p=paidonly](http://www.pinkoi.com/panel/order?p=paidonly) 或 其他訂單頁面
1. 網址列中，找到 CopyPastePinkoiOrder 的 icon ![image](https://cloud.githubusercontent.com/assets/872230/16708118/0b71d3a8-461a-11e6-8421-830bdfbc24f9.png)
2. 然後貼到 excel ，訂單都進來囉....

## 上架方法

1.打包
記得修改 `src/manifest.json` 的 `version``

```
make # 打包
```

2.上架
到 https://chrome.google.com/webstore/developer/dashboard 上架，把 `pkg/v?.?-CopyPastePinkoiOrder.zip` 上傳。

大約約 60 分鐘後，就能夠使用了。

