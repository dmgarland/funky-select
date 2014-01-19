ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../../../test/dummy/config/environment.rb",  __FILE__)

ENV["RAILS_ROOT"] ||= File.dirname(__FILE__) + "../../../test/dummy"
require 'cucumber/rails'