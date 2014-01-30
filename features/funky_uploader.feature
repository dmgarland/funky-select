Feature: Funky Uploader

  Background:
    Given that I am on a create page for a Fruit with a funky upload
    And the fruit has an UUID
    Then I should see various options

  @javascript
  Scenario: Various Images Upload
    When I upload various images
    I see the progress bar for each of the images
    And I can not click on "Save Changes"
    Then I see the images uploaded on the page
    And the images have an UUID that matches the Fruit UUID
    Then I can click on "Save Changes"


