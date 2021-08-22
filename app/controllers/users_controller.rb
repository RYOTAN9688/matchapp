class UsersController < ApplicationController

  #ログインしていない状態でプロフィールページを見ようとする時にログインページにリダイレクトするよう設定
  #before_action アクションを実行する前にfilterをかけるメソッド
   before_action :authenticate_user!
    
  def show
    #find idに対応するレコードを取り出せる
    #params 送られてきたリクエストをひとまとめにしてparms[:パラメータ名]という形式で取得できる
      @user = User.find(params[:id])
  end
end
