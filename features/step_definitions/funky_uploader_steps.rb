Given(/^that I am on a create page for a Fruit with a funky upload$/) do
  visit new_fruit_path
end

When(/^I attach the file "(.*?)" and "(.*?)"$/) do |file1, file2|
  attach_file("fruit[image]", File.expand_path(file1))
  attach_file("fruit[image]", File.expand_path(file2))
end

When(/^I can not click on the button$/) do
  find('.funky-submit')[:disabled] == 'disabled'
end

Then(/^I see the images uploaded on the page$/) do
  assert page.has_xpath?("//img[@src=\"/assets/beach.jpg\"]")
end

Then(/^I can click on the button$/) do
  assert find('.funky-submit')[:disabled] == nil
end