class ChatRoom < ApplicationRecord
    has_many :chat_room_users
    has_many :chat_messages
    has_many :users, through: :chatroom_users
end
