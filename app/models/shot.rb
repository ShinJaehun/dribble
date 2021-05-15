class Shot < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  has_one_attached :user_shot

  def full
    return self.user_shot.variant(resize: '800x600')
  end
  def thumb
    return self.user_shot.variant(resize: '400x300')
  end
end
