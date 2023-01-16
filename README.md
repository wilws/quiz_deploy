# CarbonCode NextJS Tech Test

## Overview

Create a basic quiz application using NextJS, Prisma, TailwindCSS and React Query.

## Tasks

1. Create a home page which displays a list of quizzes. These should be retrieved from the API using React Query. If you click on a quiz, it should take you to the view quiz page. The home page should also have a button to create a new quiz.

2. A create quiz page which will have a form to input the name and three yes or no questions and their answers. When the form is submitted, it should create a new quiz in the database and redirect to the home page.

3. A view quiz page. This should render out the name and the questions and answers. This page will be optimized for fast loading, using incremental static regeneration to fetch the data.

We are looking for candidates that can implement best practices with the technologies used and create an appropriate database schema using Prisma. There is no need to go into depth with validation and error handling.

A blank NextJS template has been provided with all the required packages installed and set up. We are using a SQLite file for the database to make it easier to get started.
