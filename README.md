# Qiita Widget
Qiitaの自分の投稿一覧とかをWebサイト内に設置できるやつ。

## How to use

### 1分で設置できるver.

```html
<div data-qiita-widget="widget" data-name="your-url-name"></div>
<script src="https://rawgit.com/kimama1997/qiita-widget/master/dist/qiita-widget-simple.min.js" async="async"></script>
```

### ターゲットをカスタマイズ

```html
<div data-name="name" class="qiita-widget"></div>
<script src="https://rawgit.com/kimama1997/qiita-widget/master/dist/qiita-widget.min.js"></script>
<script>
  ViewQiitaWidget.get(".qiita-widget");
</script>
```

## 100件(N∈1=<n=<100)
```html
<div data-name="name" data-count="100"></div>
```

### 対応ブラウザ
 - IE x ←XHRエラー出ててよくわからないけど動かない
 - Chrome 多分最近のなら大丈夫
 - Mozila Firefox   ~~なんでinnerHTMLはあるくせにinnerTextないんだよクソが~~

 and etc

### 使用上の注意

 - 返ってくるブロックのトップのdivには`qiita-widget`と言うクラスが付きます。それ以外のクラスはつかず、またスタイリングは一切していないのでCSSは各自追加してください。
 - 使用によるトラブル等に対し一切の責任は取りません。
 - MITライセンスが適用されます。使用の際は自由に変更していただいて構いません。
