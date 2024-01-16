# Developer Documentation: Paginator Class

The `Paginator` class is a utility class designed to facilitate querying data from a MongoDB database using Mongoose. It provides methods for performing find and aggregate operations with pagination, filtering and sorting capabilities. This documentation aims to provide an overview of the class, its constructor, methods, and usage examples.

## Table of Contents

1. [Class Overview](#class-overview)
2. [Constructor](#constructor)
3. [Private Methods](#private-methods)
    - [setQueryParams](#setqueryparams)
    - [getMatchQueries](#getmatchqueriesstages)
    - [setPageData](#setpagedataresponse-mode)
    - [getTotalCount](#gettotalcountmatchqueries)
4. [Public Methods](#public-methods)
    - [find](#findfilters)
    - [aggregate](#aggregatestages)

## Class Overview

The `Paginator` class is defined as follows:

```javascript
class Paginator {
    static MODE_FIND = 0;
    static MODE_AGGREGATE = 1;

    constructor(Model, config) {
        // ...
    }

    // Private methods...

    // Public methods...
}
```

### Static Properties

-   `MODE_FIND`: A static property indicating the find mode for the `setPageData` method.
-   `MODE_AGGREGATE`: A static property indicating the aggregate mode for the `setPageData` method.

### Constructor

The constructor of the `Paginator` class initializes an instance of the class with the provided parameters.

```javascript
constructor(Model, config) {
    // query config params
    // pageSize = 20, page = 1, srtBy, direction = 1, searchBy = 'name', search
    this.Model = Model;
    this.config = config;

    this.setQueryParams();
}
```

#### Parameters

-   `Model` (Mongoose Model): The Mongoose model representing the collection to query.
-   `config` (Object): An object containing query configurations such as `pageSize`, `page`, `sortBy`, `direction`, `searchBy`, and `search`.

### Private Methods

#### setQueryParams

The `setQueryParams` method is a private method that extracts and sets query configurations from the `query` object.

```javascript
setQueryParams() {
    // ...
}
```

#### getMatchQueries(stages)

The `getMatchQueries` method is a private method that filters and returns an array of match queries from an array of stages (Aggregation Stages).

```javascript
getMatchQueries(stages) {
    // ...
}
```

#### setPageData(response, mode)

The `setPageData` method is a private method that sets page-related data based on the provided response (from mongoose) and mode.

```javascript
async setPageData(response, mode) {
    // ...
}
```

#### getTotalCount(matchQueries)

The `getTotalCount` method is a private method that calculates and returns the total count of documents based on the provided match queries, this method is used when the query mode is `MODE_FIND`.

```javascript
async getTotalCount(matchQueries) {
    // ...
}
```

### Public Methods

#### find(filters)

The `find` method performs a find operation on the MongoDB collection using the specified mongo filters and query configurations.

```javascript
async find(filters) {
    // ...
}
```

#### Parameters

-   `filters` (Object): An object filters to be applied to the find operation.

#### Returns

-   Returns an array of documents matching the specified filters and query filters.

#### aggregate(stages)

The `aggregate` method performs an

aggregate operation on the MongoDB collection using the specified stages and query parameters.

```javascript
async aggregate(stages) {
    // ...
}
```

#### Parameters

-   `stages` (Array): An array of stages representing the aggregation pipeline to be executed.

#### Returns

-   Returns a Mongoose Query object representing the aggregate operation.

## Usage Example

Here's an example of how to use the `Paginator` class to query data from a MongoDB collection:

```javascript
import Paginator from 'datasource-mongoose';

// Assuming you have a Mongoose model defined as 'Contact'
import Contact from './models/Contact.js';

// Create a new instance of Paginator
const paginator = new Paginator(Contact, {
    pageSize: 10,
    page: 1,
    sortBy: 'name',
    direction: 1,
    searchBy: 'name',
    search: 'John',
});

// Perform a find operation
const results = await paginator.find({ category: 'Work' });

// Perform an aggregate operation
const pipeline = [
    { $match: { status: 'Active' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
];
const aggregatedData = await paginator.aggregate(pipeline);
```

This example demonstrates how to create an instance of the `Paginator` class, set config, and perform find and aggregate operations on a Mongoose model. You can customize the config, filters, and stages based on your application's requirements.

Note: The above example assumes that the necessary dependencies and models are properly imported and set up.

That concludes the developer documentation for the `Paginator` class. For further information, consult the class implementation and comments in the source code.
