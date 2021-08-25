class ChatMessage < ApplicationRecord
    belongs_to :user
    belongs_to :chat_room
    #データを保存後ChatMessageBroadcastJobを実行
     after_create_commit { ChatMessageBroadcastJob.perform_later self }
end
