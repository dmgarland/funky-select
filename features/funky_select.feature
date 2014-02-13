Feature: Funky Select

  Background:
    Given that I am on an edit page for a Fruit with a funky select box
    Then I should see various options

  @javascript
  Scenario: Normal Selection
    When I select "Mango"
    Then "mango-1" should be selected
