//#profile_image_uploadの要素にイベントが発生したときに実行される
$(document).on("change","#profile_image_upload",function(e){
    //ファイルの有無を判定
    if(e.target.files.length) {
        //fileReaderオブジェクトを使用すると、Webアプリケーションは、ユーザーのコンピューターに保存されているファイルの内容を非同期に読み取れる
        let render = new FileReader;
        //renderファイルが読み込まれた時に実行する
        render.onload = function(e){
            //指定したクラスを削除
            $('.hidden').removeClass();
            $('.profile-default-img').removeClass();
            //指定した要素を削除
            $('#profile-img').remove();
            //attrメソッド　任意の要素の属性を設定できる
            //imgタグのsrc属性にアップロードしたファイルを設定する
            $('#profile-img-prev').attr('src',e.target.result);
        };
        //指定したファイルの読み込みを実行する
        return render.readAsDataURL(e.target.files[0])
    }
});
    