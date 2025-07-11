# Signature Validation

This repository contains a Go backend application for generating and validating signatures, and a pure HTML/JavaScript frontend application that replicates the signature logic.

## Features

### Backend (Go)

-   **Signature Generation**: Generates a unique nonce and a SHA256 signature based on a request body and a client key.
-   **Signature Validation**: Validates a given signature, nonce, request body, and client against the expected signature.
-   **Client Management**: Client names and keys are managed in `handler/const.go`.

### Frontend (HTML/JavaScript)

-   **Clients Editor**: Allows adding, viewing, and deleting client names and their corresponding keys directly in the browser.
-   **Signature Generator**: Generates nonce and signature using a provided request body and selected client, mirroring the backend's logic.
-   **Signature Validator**: Validates signatures against a request body, nonce, signature, and client, mirroring the backend's logic.
-   **No Backend Dependency**: The frontend application runs entirely in the browser and does not require the Go backend to be running.

## How to Run

### Running the Backend

To run the Go backend application:

1.  Navigate to the root directory of the project in your terminal.
2.  Run the main application:
    ```bash
    go run main.go
    ```
3.  The API endpoints will be available at `http://localhost:8080/generate` (POST) and `http://localhost:8080/validate` (POST).

### Running the Frontend

To run the HTML/JavaScript frontend application:

1.  Open the `docs/index.html` file in your web browser.
2.  All functionalities (Client Editor, Signature Generator, Signature Validator) are available directly in the browser.

## Technologies Used

### Backend

-   **Go**: Programming language.
-   **Gin Gonic**: Web framework for Go.
-   **SHA256**: Hashing algorithm.
-   **UUID**: For generating unique nonces.

### Frontend

-   **HTML5**: Structure of the web pages.
-   **CSS3**: Styling for the web pages.
-   **JavaScript (ES6+)**: Client-side logic for signature generation and validation.
-   **Web Crypto API**: For SHA256 hashing in the browser.

## Directory Structure

```
signature_validation/
├── frontend/             # Frontend application files (HTML, CSS, JS)
│   ├── index.html
│   └── script.js
├── handler/              # Go backend handlers and helpers
│   ├── const.go
│   ├── generate.go
│   ├── helper.go
│   └── validate.go
├── main.go               # Main Go application entry point
├── go.mod                # Go module dependencies
├── go.sum                # Go module checksums
└── README.md             # Project README file
``` 