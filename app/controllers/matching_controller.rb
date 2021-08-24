class MatchingController < ApplicationController
#ログインしていなければアクションを動かす前にログインページが表示される
    before_action :authenticate_user!
    def index
        #reactionテーブルから、自分にいいねしたユーザのレコードを取得
        #自分にいいねをした人のuser_idだけでいいのでpluckメソッドを使用
        #plukメソッド　引数で指定したカラムを配列で返すメソッド
        got_reaction_user_ids = Reaction.where(to_user_id: current_user.id, status: 'like').pluck(:from_user_id)
        #自分にいいねをしていて、かつ自分もそのユーザにいいねをしているリアクションのレコードを取得
        #mapメソッドは要素の数だけ繰り返しブロックを実行し、ブロックの戻り値を集めた配列を作成し返す
        @match_users = Reaction.where(to_user_id: got_reaction_user_ids,from_user_id: current_user.id, status: 'like').map(&:to_user)
        #@userは_navbar.html.erで使うインスタンス変数
        @user = User.find(current_user.id)
    end
end
