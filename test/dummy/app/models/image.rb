class Image < ActiveRecord::Base
  attr_accessible :fruit_id
  attr_accessible :uuid
  attr_accessible :path

  belongs_to :fruit
end
