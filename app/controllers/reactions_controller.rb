class ReactionsController < ApplicationController
#find_or_initialize_byは引数の条件に該当するレコードがあればそれを返し、
#レコードが場合はインスタンスを生成する

#今回の場合、リアクションした人が自分で、リアクションされた人のparamsが一致するレコードがあればそれを返す、なければインスタンスを生成する

#つまりスワイプしたことがあるユーザにリアクションしたのであればそのリアクションのレコードを返す。スワイプしたことがないユーザのリアクションの場合インスタンスを生成
    def create
        reaction = Reaction.find_or_initialize_by(to_user_id: params[:user_id],from_user_id: current_user.id)

        #reactionというインスタンスに対してstatusを更新して保存している
        reaction.update_attributes(status: params[:reaction]
        )
    end
end
