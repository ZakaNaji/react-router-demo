# Contact Management Application

This is a contact management application built with React and React Router.

## Features

- List all contacts
- View details of a contact
- Update contact details
- Delete a contact

## Project Structure

The main component is `Contacts.jsx`. It fetches and displays a list of contacts. Each contact is a link that navigates to the details of the contact.

The `loader` function fetches the details of a contact based on the id in the URL. If the contact is not found, it throws a 404 error.

The `action` function updates the details of a contact. It gets the updated details from the form data in the request. After updating the contact, it redirects to the contact's detail page.

The `destroy` function deletes a contact based on the id in the URL. After deleting the contact, it redirects to the home page.

## Setup

To run this project, install it locally using npm:
npm install 
npm run dev


## Usage

To view a contact's details, click on the contact's name in the list. To add a new contact, click on the "Add Contact" button and fill out the form. To update a contact's details, fill out the form on the contact's detail page and click "Save". To delete a contact, click "Delete" on the contact's detail page. To search for a contact, use the search bar at the top of the page.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
