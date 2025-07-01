import React, { useState } from 'react';
import { Bell, Mail, Send, Search, Filter, MoreVertical, Reply } from 'lucide-react';
import messagesData from '../data/messages.json';

const MessagesNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>('notifications');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'normal': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'emergency': return '🚨';
      case 'lab-result': return '🧪';
      default: return '📋';
    }
  };

  const openMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const sendReply = () => {
    if (replyText.trim()) {
      // Logic to send reply
      console.log('Sending reply:', replyText);
      setReplyText('');
      setShowMessageModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Tin Nhắn & Thông Báo</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Send className="h-4 w-4" />
              <span>Tin nhắn mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Thông báo</span>
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {messagesData.notifications.filter(n => !n.read).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Tin nhắn</span>
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                {messagesData.messages.filter(m => !m.read).length}
              </span>
            </button>
          </nav>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <div className="space-y-4">
              {messagesData.notifications.map((notification) => (
                <div key={notification.id} 
                     className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(notification.priority)} ${
                       !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                     } hover:shadow-sm transition-shadow`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tin nhắn..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg">
                <Filter className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {messagesData.messages.map((message) => (
                <div key={message.id} 
                     className={`border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer ${
                       !message.read ? 'bg-blue-50 border-blue-200' : ''
                     }`}
                     onClick={() => openMessage(message)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${!message.read ? 'text-gray-800' : 'text-gray-600'}`}>
                            {message.from}
                          </h4>
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {message.attachments > 0 && (
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {message.attachments} file
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-800 mb-1">{message.subject}</h5>
                        <p className="text-sm text-gray-600 mb-2">{message.preview}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">{selectedMessage.subject}</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <p className="text-sm text-gray-600">Từ: <strong>{selectedMessage.from}</strong></p>
                <p className="text-sm text-gray-500">{selectedMessage.time}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">{selectedMessage.preview}</p>
                <p className="text-gray-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>

              {/* Quick Replies */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Phản hồi nhanh:</h4>
                <div className="flex flex-wrap gap-2">
                  {messagesData.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => setReplyText(reply)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div className="border-t border-gray-200 pt-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập phản hồi..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between mt-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                    <Reply className="h-4 w-4" />
                    <span>Trả lời tất cả</span>
                  </button>
                  <button
                    onClick={sendReply}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Gửi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesNotifications;