//location.pathnameで現在のページURLのパスを参照する
//現在のページが/usersであればif文を実行
if(location.pathname == "/users"){

    $(function(){

        //スワイプするユーザーのカード情報をすべて取得
        let allCards = document.querySelectorAll('.swipe--card');

        let swipeContainer = document.querySelector('.swipe')

        function initCards(){
            //allCardをforEachを使って配列の各要素に対して一度ずつ実行
            allCards.forEach(function(card,index){
                //z-indexは重なりの順序を指定
                card.style.zIndex = allCards.length - index;
                //transformでカードを縮小・移動をしている
                card.style.transform = 'scale(' + (20 -index) / 20 +')translateY(- ' + 30 * index +'px)';
                //opacityは要素の透明度を指定
                card.style.opacity = (10 - index) / 10;
            });
        }
        initCards();

        allCards.forEach(function(el){
            //インスタンスを生成
            let hammertime = new Hammer(el);
            //panというイベントを登録
            hammertime.on('pan',function(event){
                //カードを動かしていない場合、処理を終了させる
                //x軸の動き
                if(event.deltaX === 0) return;
                //x軸の動きとポインタの位置
                if(event.center.x === 0 && event.center.y === 0) return;

                el.classList.add('moving');
                //swipeContainerに対象とするクラス名があれば、除去し、クラス名がなければ追加する

                //スワイプしたときのハードやxのアイコンを表示

                //右に動かした場合、swipe_likeクラスの追加、除去
                swipeContainer.classList.toggle('swipe_like',event.deltaX > 0);
                //左に動かした場合、swipe_dislikeのクラスの追加、除去
                swipeContainer.classList.toggle('swipe_dislike',event.deltaX < 0);

                let xMulti = event.deltaX * 0.03;
                let yMulti = event.deltaY / 80;
                let rotate = xMulti * yMulti;

                //transformは要素を拡大縮小、移動させるメソッド
              event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';     
            });
        });
    });
}
