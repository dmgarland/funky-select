class Image < ActiveRecord::Base
  attr_accessible :fruit_id
  attr_accessible :uuid
  attr_accessible :path
  attr_accessible :url

  attr_accessor :url

  belongs_to :fruit
end
