//location.pathnameで現在のページURLのパスを参照する
//現在のページが/usersであればif文を実行
if(location.pathname == "/users"){

    $(function(){

        //スワイプするユーザーのカード情報をすべて取得
        let allCards = document.querySelectorAll('.swipe--card');
        let swipeContainer = document.querySelector('.swipe')

      
        function initCards(){
            
            let newCards = document.querySelectorAll('.swipe--card:not(.removed)');

            //allCardをforEachを使って配列の各要素に対して一度ずつ実行
            newCards.forEach(function(card,index){
                //z-indexは重なりの順序を指定
                card.style.zIndex = allCards.length - index;
                console.log(card.style.zIndex);
                //transformでカードを縮小・移動をしている
                card.style.transform = 'scale(' + (20 -index) / 20 +')translateY(- ' + 30 * index +'px)';
                console.log(card.style.transform);
                //opacityは要素の透明度を指定
                card.style.opacity = (10 - index) / 10;
                console.log(card.style.opacity);
            });

            if(newCards.length === 0){
                $(".no-user").addClass("is-active");
            }
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
        
            hammertime.on('panend',function(event){
                el.classList.remove('moving');
                //ハートとxのアイコン表示を削除
                swipeContainer.classList.remove('swipe_like');
                swipeContainer.classList.remove('swipe_dislike');
                //ブラウザ内の表示域を取得
                let moveOutWidth = document.body.clientWidth;
            
                //動かしたx軸が200以下であればtrueをkeepという変数に代入
                let keep = Math.abs(event.deltaX) < 200
                event.target.classList.toggle('removed', !keep);
                //true変数でスワイプをするか、transformを空白にするかの
                //条件式

                let reaction = event.deltaX > 0 ? "like" : "dislike"

                if(keep){
                    event.target.style.transform = "";
                }else{
                    let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth) +100;
                    let toX = event.deltaX > 0 ? endX : -endX;
                    let endY = Math.abs(event.velocityY) * moveOutWidth;
                    let toY = event.deltay > 0 ? endY : -endY;
                    
                    let xMulti = event.deltaX * 0.03;
                    let yMulti = event.deltaY / 80;
                    let rotate = xMulti * yMulti;

                    postReaction(el.id,reaction)
                
                    event.target.style.transform = 'translate(' + toX+ 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)'; 
                    
                    initCards();
                }
            });
        });

        function postReaction(user_id,reaction){
            $.ajax({
                url: "reactions.json",
                type: "POST",
                dataType: "json",
                data:{
                    user_id: user_id,
                    reaction: reaction,
                }
            })
            .done(function(){
                console.log("done!");
            })
        }

        function createButtonListner(reaction){
            
            let cards = document.querySelectorAll('.swipe--card:not(.removed)');
            //スワイプするカードがなければfalseを返す
            if(!cards.length) return false;

            let moveOutWidth = document.body.clientWidth * 2;

            let card = cards[0];

            let user_id = card.id;

            postReaction(user_id,reaction);

            card.classList.add('removed');

            if(reaction == "like"){
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
            }else{
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(30deg)';
            }
            initCards()
        }

        $('#like').on('click',function(){
            createButtonListner("like");
        })
        $("#dislike").on('click',function(){
            createButtonListner("dislike");
        })
    });
}
