class Image < ActiveRecord::Base
  attr_accessible :fruit_id

  belongs_to :fruit
end
