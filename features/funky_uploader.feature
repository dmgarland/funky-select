Feature: Funky Uploader

  Background:
    Given that I am on a create page for a Fruit with a funky upload

  @javascript
  Scenario: Various Images Upload
    When I attach the file "features/resources/bedroom.jpg" and "features/resources/coolkitchen.jpg"
    And I can not click on the button
    Then I see the images uploaded on the page
    Then I can click on the button


