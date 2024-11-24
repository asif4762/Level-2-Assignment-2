Stationery Shop Management System

Overview

The Stationery Shop Management System is a full-featured application designed to manage products, orders, and revenue calculations for a stationery shop. It includes CRUD operations for managing products and orders, along with advanced revenue calculation features using MongoDB’s aggregation pipeline.

Features

Products Management

	•	Add new stationery products with details like name, brand, price, category, description, and stock.
	•	Update existing products.
	•	View all products.
	•	Delete products.

Orders Management

	•	Place new orders by associating products and customers.
	•	View all orders or retrieve a specific order by its ID.
	•	Update order details such as quantity.
	•	Delete orders.

Revenue Calculation

	•	Calculate total revenue from all orders using MongoDB aggregation.
	•	Real-time computation of total revenue based on product prices and order quantities.

Technologies Used

	•	Backend: Node.js, Express.js
	•	Database: MongoDB (with Mongoose ORM)
	•	Validation: Zod Schema Validation
	•	Language: TypeScript
