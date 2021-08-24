class ChatRoomUser < ApplicationRecord
    belong_to :chat_room
    belong_to :user
end
