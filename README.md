## Foodie's Restaurant Reservation Application

Link Here: https://ruby-perch-kilt.cyclic.app/foodies  


#  CRUD Operations and MVP Document

Overview:
Foodie allows users to make, view, update, and delete reservations at a restaurant.

# MVP Features:
  Minimum: The product includes only essential features that address the core problem or need of the target users. Non-essential features are intentionally left out to streamline development.

  Viable: The product is functional and usable, even if it lacks advanced features or polish. It should provide enough value to early adopters to encourage them to use it.

  Product: The MVP is a tangible product or application that users can interact with. It's not just a concept or prototype but a working solution that addresses a specific problem or fulfills a need.

# Reservation Creation:

  Users can create a reservation by providing their name, reservation date, and the number of people in their party.

#  Reservation Viewing:

  Users can view all existing reservations.
  
# Reservation Updating:

  Users can update existing reservations to change details such as the name, date, or number of people.
  
# Reservation Deletion:

  Users can delete existing reservations.

# CRUD Operations:

  Create:
  Endpoint: /reserve
  Method: POST
  Request Body: { "name": "John Doe", "date": "2024-03-05", "numberOfPeople": 4 }
  Response: Success message or error message

Read:
  Endpoint: /reservations
  Method: GET
  Response Body: List of reservations

Update:
  Endpoint: /reserve/:id
  Method: PUT
  Request Body: Updated reservation data (e.g., { "name": "Jane Doe", "date": "2024-03-06", "numberOfPeople": 6 })
  Response: Success message or error message

Delete:
  Endpoint: /reserve/:id
  Method: DELETE
  Response: Success message or error message

Database Schema:
  Reservation:
  id: ObjectId (automatically generated)
  name: String
  date: Date
  numberOfPeople: Number

Routes:
  Create Reservation:
    Endpoint: /reserve
      Method: POST

List Reservations:
  Endpoint: /reservations
    Method: GET

Update Reservation:
  Endpoint: /reserve/:id
    Method: PUT

Delete Reservation:
  Endpoint: /reserve/:id
    Method: DELETE
    

Authentication: Implement user authentication to secure reservation operations.

Validation: Add validation for reservation data to ensure accuracy and completeness.
Availability Check: Implement functionality to check the availability of seats for a given reservation date.
Notifications: Send email or SMS notifications to users upon successful reservation creation or updates.
Technologies Used:
Node.js
Express.js
Mongoose 
HTML/CSS (for frontend, not covered in this document)
