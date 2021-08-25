class ChatRoomChannel < ApplicationCable::Channel
  #どのチャンネルを購読するかを指定
  #このコードでchat_room_channel.rbとchat_room_channel.jsでデータ送受信できる
  def subscribed
     stream_from "chat_room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

 #chat_room_channel.jsで実行されたspeakアクションのchat_messageを受けとり、
 #chat_room_channel.jsのreceivedメソッドにdataを送信する
 #speakアクションから送られてきたデータを保存する
  def speak(data)
    ChatMessage.create!(
      content: data['chat_message'],
      user_id: current_user.id,
      chat_room_id: data['chat_room_id']
    )
  end
end
