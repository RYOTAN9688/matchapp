module ApplicationCable
  class Connection < ActionCable::Connection::Base
    #コネクション（クライアントとサーバー間の関係を成立させる基礎）を認識させるキー
    identified_by :current_user

    def connect
      #WebSocket接続が開いている場合は閉じ、404を返す
      reject_unauthorized_connection unless find_verified_user
    end
    private
    
    def find_verified_user
      #ログインしているユーザーの情報を取得
      self.current_user = env['warden'].user
    end
  end
end
