class Fruit < ActiveRecord::Base
  attr_accessible :name
  attr_accessible :uuid

  has_many :images
end
