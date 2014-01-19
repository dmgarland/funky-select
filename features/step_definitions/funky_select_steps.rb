# Don't ignore hidden elements
Capybara.ignore_hidden_elements = false

Given(/^that I am on an edit page for a Fruit with a funky select box$/) do
  visit new_fruit_path
end

When(/^I select "(.*?)"$/) do |option|
  find('.handle').click
  find("li", :text => option).click
end

Then(/^I should see various options$/) do
  assert page.has_css?('div.funky-select')
  assert page.has_css?('div.funky-select .handle')
  assert page.has_css?('div.funky-select .selected')
  assert page.has_css?('div.funky-select input[type="hidden"]')
  assert page.has_css?('div.funky-select ul.funky-options')
  assert page.has_css?('div.funky-select ul.funky-options li[data-name="mango-1"]')
  assert page.has_css?('div.funky-select ul.funky-options li[data-name="apple-2"]')
  assert page.has_css?('div.funky-select ul.funky-options li[data-name="pear-3"]')
  assert page.has_css?('div.funky-select ul.funky-options li[data-name="banana-4"]')
  within('div.funky-select ul.funky-options li[data-name="mango-1"]') { assert page.has_text? 'Mango' }
  within('div.funky-select ul.funky-options li[data-name="apple-2"]') { assert page.has_text? 'Apple' }
  within('div.funky-select ul.funky-options li[data-name="pear-3"]') { assert page.has_text? 'Pear' }
  within('div.funky-select ul.funky-options li[data-name="banana-4"]') { assert page.has_text? 'Banana' }
end

Then(/^"(.*?)" should be selected$/) do |option|
  assert_equal option, page.find('.funky-select input[type="hidden"]').value
end