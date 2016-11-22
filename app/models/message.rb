class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sent_message, :foreign_key => :user_id, class_name: 'User'
  belongs_to :received_message, :foreign_key => :recipient_id, class_name: 'User'

  validates_presence_of :body, :subject

  validates :subject, length: { maximum: 255 }

  def self.get_latest_messages(current_user)
    response = Message.where(recipient_id: current_user.id).order(created_at: :desc).limit(5)

    @messages = []

    response.each do |message|
      name = "#{message.sent_message.first_name} #{message.sent_message.last_name}"
      @messages << { "conversation_id" => message.conversation_id,
                     "message_id" => message.id, "from" => name,
                     "subject" => message.subject, "is_read" => message.is_read }
    end

    return @messages

  end

  def self.get_new_messages_count(current_user)
    new_messages = Message.where( { recipient_id: current_user.id, is_deleted: false, is_read: false } ).all.count

  end

  def self.get_messages(conversation)
    @messages = Message.where( { is_deleted: false, conversation_id: conversation.id } ).all

    @message_details = []

    @messages.each do |message|
      sender_name = "#{message.sent_message.first_name} #{message.sent_message.last_name}"
      @message_details << { "body" => message.body, "subject" => message.subject,
                            "conversation_id" => message.conversation_id,
                            "created_at" => message.created_at.strftime("%m/%d/%Y %I:%M %p"),
                            "message_id" => message.id,
                            "is_read" => message.is_read,
                            "recipient_id" => message.recipient_id,
                            "sender_id" => message.user_id,
                            "sender_name" => sender_name }
    end

    return @message_details

  end

  def self.show_message(options)
    message = Message.find(options)
    recipient_name = "#{message.received_message.first_name} #{message.received_message.last_name}"
    sender_name = "#{message.sent_message.first_name} #{message.sent_message.last_name}"

    @message_details = { "message_id" => message.id, "body" => message.body,
                         "recipient_id" => message.recipient_id,
                         "recipient_name" => recipient_name,
                         "sender_id" => message.user_id,
                         "sender_name" => sender_name,
                         "subject" => message.subject
                        }
  end

end
