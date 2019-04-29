Feature: Login page

Scenario: Sign Up as a user
    Given Navigate to signup page
    When set "email" as "oguz.akpinar@logo.com.tr"
    And set "username" as "oguz"
    And set "password" as "123"
    And tap button "save" on "signup" page
    Then alert occurs with message "Signup Successfully"

Scenario: Login as correct user
    Given Navigate to login page
    When set "username" as "oguz"
    And set "password" as "123"
    And tap button "login" on "login" page
    Then I see "home" page
