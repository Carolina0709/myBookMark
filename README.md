# My BookMark 📚

This project was built as the **capstone project** of the **PostgreSQL** module from _The Complete 2024 Web Development Bootcamp_ on Udemy. The goal was to create a full CRUD web application to manage a personal library of books and favorite quotes, using a relational database.

## 📌 Table of Contents
- [Introduction](#introduction)
- [What I Built](#what-i-built)
- [Main Features](#main-features)
- [Learning Goals](#learning-goals)
- [Preview](#preview)
- [Technologies Used](#technologies-used)

---

## 📖 Introduction

**My BookMark** is a web application that allows users to:

- Add books they’ve read
- Save their favorite quotes from each book
- View books filtered by category
- Edit books
- Delete quotes

It also fetches book covers dynamically using the Open Library API.

---

## 🔧 What I Built

This app consists of:

- A book registration form with fields for title, author, ISBN, category, date_read, rate and summary
- Integration with the Open Library Covers API:
  
  `https://covers.openlibrary.org/b/isbn/0385472579-S.jpg`

- A relational PostgreSQL database with two tables:
  - `book`: stores all book data
  - `quote`: stores quotes related to each book via a foreign key

- A user interface to:
  - Add, edit books
  - Add and delete quotes for each book
  - Filter books by category

---

## 🌟 Main Features

- 📚 **Book management**: Full CRUD functionality for books
- 📝 **Quote management**: Add your favorite quotes per book
- 🖼️ **Book covers**: Dynamically displayed using ISBN and the Open Library Covers API
- 🔍 **Category filters**: Easily view books by genre
- 💾 **Relational DB**: PostgreSQL schema with relationships
- 🎨 **Responsive UI**: Built with Bootstrap and EJS templates

---

## 🎯 Learning Goals

The main objectives of this project were to:

- Practice integrating PostgreSQL with Node.js and Express
- Create and manage relational databases with foreign keys
- Build dynamic web pages using EJS
- Handle form data with POST and GET routes
- Consume an external API and handle media (book covers)
- Develop a user-friendly interface with validation

---

## 🖼️ Preview
https://github.com/user-attachments/assets/d89e020f-6da7-48d1-9028-f9fb65b35f34




## 💻 Technologies Used

- Node.js
- Express
- EJS
- PostgreSQL
- pg-promise / pg module
- Bootstrap
- Axios (for API requests)
- Open Library Covers API

