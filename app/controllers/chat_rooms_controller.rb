class ChatRoomsController < ApplicationController
    before_action :authenticate_user!

    def create
        #中間テーブルであるchatroom_usersテーブルからuser.id（自分のレコード」を取得し、チャットルームの配列を作成する
        current_user_chat_rooms = ChatRoomUser.where(user_id: current_user.id).map(&:chat_room)
        #自分がいるチャットルームでかつ、マッチング一覧ページからクリックしたユーザがいるチャットルームを取得し、チャットルームの配列を作成し、配列の中身を取得
        chat_room = ChatRoomUser.where(chat_room: current_user_chat_rooms, user_id: params[:user_id]).map(&:chat_room).first

        if chat_room.blank?
            chat_room = ChatRoom.create
            #自分とチャットルームidを含んだレコード
            ChatRoomUser.create(chat_room: chat_room, user_id: current_user.id)
            #自分とマッチしたユーザトチャットルームidを含んだ
            ChatRoomUser.create(chat_room: chat_room,
            user_id: params[:user_id])
        
        end
          redirect_to action: :show, id: chat_room.id
    end
    
    def show
        #chat_roomテーブルのidを取得し取り出す
        @chat_room = ChatRoom.find(params[:id])
        #@chat_roomにいる自分ではないユーザー（自分とマッチングしたユーザー）の情報を取得
        @chat_room_users = @chat_room.chat_room_users.where.not(user_id: current_user.id).first.user
        #アクセスしたチャットルームのチャットメッセージを取得
        @chat_messages = ChatMessage.where(chat_room: @chat_room)
    end
end
