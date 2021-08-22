class UsersController < ApplicationController

  #ログインしていない状態でプロフィールページを見ようとする時にログインページにリダイレクトするよう設定
  #before_action アクションを実行する前にfilterをかけるメソッド
   before_action :authenticate_user!
    
  def show
    #find idに対応するレコードを取り出せる
    #params 送られてきたリクエストをひとまとめにしてparms[:パラメータ名]という形式で取得できる
      @user = User.find(params[:id])
  end

  def index
    #whereは条件にマッチするレコードを全て返す
    #where.notは条件にマッチしないレコードをすべて返す
    #現在ログインしているユーザ（自分）以外のユーザーのレコードを取得（スワイプページで自分を表示させないため）
    @users = User.where.not(id: current_user.id)
    #@userは現在ログインしているユーザー（自分）のレコード情報が入る
    @user = User.find(current_user.id)
  end
end
