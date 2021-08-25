import consumer from "./consumer"

const appChatRoom = consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },
  //chat_room_channel.rbから送られて来たdataを受けとり表示
  received(data) {
    const chatMessages = document.getElementById('chat-messages')
    //chat_messageのテキストをhtmlとしてパース（分析）し、その結果を挿入
    //挿入位置はelement内部の最後の子要素の後に挿入
    chatMessages.insertAdjacentHTML('beforeend',data['chat_message'])
  },
  //chat_room_channel.rbのspeakアクションにchat_message,
  //chat_room_idを送る
  speak: function(chat_message,chat_room_id) {
    return this.perform('speak',{ chat_message: chat_message, chat_room_id: chat_room_id });
  }
});
//チャットルームページかどうかを確かめ、現在のページURLのパスを参照する
if(/chat_rooms/.test(location.pathname))  {
    //フォーム内でenterキーを押したときの処理を実行
  $(document).on("keydown", ".chat-room__message-form_textarea", function(e) {
    if(e.key === "Enter"){
      //chat_room_idを取得し、appChatRoomのspeakアクションにchat_room_idを
      //引数として渡す
      const chat_room_id = $('textarea').data('chat_room_id')
      //speakアクションを発火させる
      appChatRoom.speak(e.target.value, chat_room_id);
      e.target.value = '';
      e.preventDefault();
    }
  })
}
