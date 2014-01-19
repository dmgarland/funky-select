ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../../../test/dummy/config/environment.rb",  __FILE__)

begin
  DatabaseCleaner.strategy = :truncation
rescue NameError
  raise "You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it."
end

ENV["RAILS_ROOT"] ||= File.dirname(__FILE__) + "../../../test/dummy"
require 'cucumber/rails'