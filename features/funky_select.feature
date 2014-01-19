Feature: Funky Select

  Background:
    Given that I am on an edit page for a Fruit with a funky select box
    Then I should see various options

  Scenario: Normal Selection
    When I select "Mango"
    And I save the form
    Then a Mango should be created
