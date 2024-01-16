# User Documentation: Paginator Class

The `Paginator` class is a powerful tool that allows you to retrieve data from a MongoDB database using Mongoose. It provides convenient methods for finding and aggregating data with pagination, filtering and sorting capabilities. This documentation will guide you on how to use the class effectively to retrieve the data you need.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Importing the Paginator Class](#importing-the-paginator-class)
3. [Using the Paginator Class](#using-the-paginator-class)
    - [Initializing the Paginator](#initializing-the-paginator)
    - [Performing a Find Operation](#performing-a-find-operation)
    - [Performing an Aggregate Operation](#performing-an-aggregate-operation)
4. [The `pageData` property](#the-pagedata-property)
5. [Example Usage](#example-usage)
6. [Summary](#summary)

## Introduction

The `Paginator` class simplifies the process of querying and retrieving data from a MongoDB database using Mongoose. It provides a convenient way to specify query parameters, apply filters, and paginate through results. Whether you need to find individual documents or perform complex aggregations, the `Paginator` class can handle it.

## Getting Started

### Installation

Before you can use the `Paginator` class, ensure that you have the necessary dependencies installed. These dependencies include Mongoose and any other required packages for your project. You can install them using npm or yarn:

```bash
npm install mongoose
# or
yarn add mongoose
```

### Importing the Paginator Class

To use the `Paginator` class in your project, import it into your JavaScript or TypeScript file:

```javascript
import Paginator from './path/to/Paginator';
```

Make sure to replace `'./path/to/Paginator'` with the correct path to the `Paginator` class file in your project.

## Using the Paginator Class

### Initializing the Paginator

To get started with the `Paginator` class, create an instance of it by providing the necessary parameters:

```javascript
const paginator = new Paginator(Model, config);
```

-   `Model` (Mongoose Model): The Mongoose model representing the collection from which you want to retrieve data.
-   `config` (Object): An object containing configurations such as `pageSize`, `page`, `sortBy`, `direction`, `searchBy`, and `search`.

### Performing a Find Operation

To find documents in the collection, use the `find` method of the `Paginator` instance:

```javascript
const filters = { category: 'Work' };
const results = await paginator.find(filters);
```

-   `filters` (Object): An object containing additional filters to apply to the find operation. It's the same as for the `find` method of the `MongooseModel`

The `find` method will return an array of documents that match the specified filters and query parameters.

### Performing an Aggregate Operation

To perform complex aggregations on the collection, use the `aggregate` method of the `Paginator` instance:

```javascript
const stages = [
    { $match: { status: 'Active' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
];
const aggregatedData = await paginator.aggregate(stages);
```

-   `stages` (Array): An array of stages representing the aggregation pipeline to be executed.

The `aggregate` method will execute the specified stages in the provided order and return the aggregated result.

## The `pageData` Property

The `Paginator` class provides a property called `pageData` that contains information about the pagination details for the executed query. This property allows you to retrieve metadata about the total number of pages, the current page, and the number of data items per page.

The `pageData` property is updated internally by `Paginator` class. It is accessible after executing a query using the `find` or `aggregate` methods.

The `pageData` object has the following properties:

-   `totalPages` (Number): The total number of pages based on the query and pagination settings.
-   `totalData` (Number): The total number of data items that match the query and filters.
-   `currentPage` (Number): The current page number.
-   `pageSize` (Number): The number of data items per page.

Here's an example of how to access and use the `pageData` property:

```javascript
const paginator = new Paginator(Model, query, filtersAllowed);
const results = await paginator.find(filters);

// Access the pageData property
const { totalPages, totalData, currentPage, pageSize } = paginator.pageData;

console.log(`Total Pages: ${totalPages}`);
console.log(`Total Data: ${totalData}`);
console.log(`Current Page: ${currentPage}`);
console.log(`Page Size: ${pageSize}`);
```

You can use the `pageData` property to implement pagination controls in your application or display information about the current page and total data count to the user.

Note: The `pageData` property is populated after executing a query using the `find` or `aggregate` methods. Ensure that you have executed a query before accessing the `pageData` property.

## Example Usage

To illustrate the usage of the `Paginator` class, let's consider an example scenario where we have a MongoDB collection of contacts and we want to retrieve paginated and filtered results sorted by name.

Assuming you have already set up the Mongoose connection and defined a Mongoose model for the `Contact` collection, we can proceed with the following example:

```javascript
const Contact = require('./models/Contact'); // Import the Mongoose model
const Paginator = require('datasource-mongoose'); // Import the Paginator

// Define the configurations
const config = {
    pageSize: 10,
    page: 1,
    sortBy: 'name',
    direction: 1,
    searchBy: 'name',
    search: 'John',
    category: 'Work',
    status: 'Active',
};

// Create an instance of the Paginator class
const paginator = new Paginator(Contact, config);

// Perform a find operation
const filters = { age: { $gte: 25 } };
const results = await paginator.find(filters);

// Access the pageData property
const { totalPages, totalData, currentPage, pageSize } = paginator.pageData;

// Display the results
console.log('Contacts:');
results.forEach(contact => {
    console.log(contact.name);
});

// Display pagination details
console.log(`Page: ${currentPage}/${totalPages}`);
console.log(`Total Contacts: ${totalData}`);
console.log(`Contacts per Page: ${pageSize}`);
```

In this example, we create an instance of the `Paginator` class, passing the `Contact` model and config. We then perform a find operation with additional filters, such as age greater than or equal to 25.

After executing the query, we can access the retrieved results and the `pageData` property to display the contacts, pagination details, and total number of contacts.

Feel free to customize the example code according to your specific use case and the structure of your data.

## Summary

The `Paginator` class simplifies data retrieval from a MongoDB database using Mongoose. By providing an intuitive interface for specifying configs, filters, and pagination, it enables you to find and aggregate data efficiently. Use the methods `find` and `aggregate` to retrieve the data you need based on your requirements.

Refer to the documentation comments within the `Paginator` class implementation for more detailed information on its functionalities and options.

If you have any further questions or need additional assistance, please consult the official Mongoose documentation or reach out to the development team for support. Happy data querying!
