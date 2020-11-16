[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=iamthechad_Angular-Developer-Take-Home-Challenge&metric=alert_status)](https://sonarcloud.io/dashboard?id=iamthechad_Angular-Developer-Take-Home-Challenge)
[![Build Status](https://travis-ci.com/iamthechad/Angular-Developer-Take-Home-Challenge.svg?branch=master)](https://travis-ci.com/iamthechad/Angular-Developer-Take-Home-Challenge)

# GRM Sample App

## Local server

* Run `npm i` to install the dependencies.
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Solution

For my solution, I created a simple application that has a header and shows the Contacts grid by default. The Alerts view can be shown by clicking the bell icon.

### UI Components

#### Header

The header is very basic. The Alerts button (bell icon) shows a label indicating the current number of alerts. This number is designed to change if the number of alerts changes. Clicking the icon will activate the slideout that contains the Alerts grid.

#### Contacts Grid

The contacts grid shows Name, Status, Begin Timestamp, and End Timestamp.

The grid is sortable on Name and is sorted in ascending order by default.

The Status column uses an ag-grid feature to color the cell based on the status string, just as an example.

#### Alerts Grid

The Alerts grid is shown when the bell icon in the header is selected. It is contained in an element that slides in from the right.

The grid shows Message, Category, and Time. The grid is sortable by Category and is sorted in ascending order by default.

The slideout can be closed by clicking the "X" icon.

### UI Design

The design is very simple. Some basic font changes and a bit of color.

### Design and Tradeoffs

#### Data loading

All data loading is designed to be continuously updated even though the data file is only loaded a single time.

The data loading infrastructure is designed to behave as if it were an external module that the application uses.

#### Angular Library

I thought about creating an Angular library for the data loading modules, but I didn't want to add the extra overhead around the build and running the application.

### Libraries/Technologies Used

#### Used for application

* Angular 10
* FontAwesome 5
* ag-grid v24
* RxJS
* Custom TSLint ruleset

#### Quality Control/Documentation

* Custom TSLint ruleset
* Compodoc
* Integrated with SonarCloud for quality checks
* Integrated with Travis CI for builds
* Integrated with GitHub Projects for task management


