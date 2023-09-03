<div style="display: flex;justify-content: center">
<img src="https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/bc0eb07e-fe1c-4d67-8d02-251adf0443d3" alt="Image Description" height="100" style="background-color: grey; border-radius: 5px;"/>
</div>

# Visualisation Dashboard

This project was built in 5 days as an assignment by an organization (name kept anonymous).

## Table of Contents

- [Backend](#backend)
- [Frontend](#frontend)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)

## Backend

The backend of this project utilizes Mongoose and Express.js. It incorporates classified JSON data provided by the organization. Mongoose models were created to structure the data, which was then uploaded to a MongoDB database. Various RESTful API endpoints were developed to retrieve data from the backend.

## Frontend

The frontend of this project was built using React.js. Notably, all the styling is implemented using pure CSS, with no external libraries used. The dashboard is fully responsive and features the following types of graphs: Bar, Line, Pie, and Scatter plot. These graphs were created using D3.js and SVG. Data is passed between components using the Context API.

## Screenshots

### Overview

![Overview](https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/9be52d58-c5b1-438a-8171-a2f13ebdcd2e)

### Bar Graph

![Bar Graph](https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/c332e9d2-4068-4041-8a70-6c8324c1e403)

### Line Graph

![Line Graph](https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/f3ecdba3-700a-41fa-9561-de4e4e08b8bb)

### Pie Chart

![Pie Chart](https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/317e62ca-8e40-42ae-8653-7f684fb4d341)

### Scatter Plot

![Scatter Plot](https://github.com/coldcoffeee/visualisation-dashboard/assets/68056738/839bd19c-87cc-415a-a3a7-a0b3ec353eda)

## Folder Structure

The project is well-organized, following MVC (Model-View-Controller) norms. Here is the folder structure:

├── backend  
│ ├── app.js  
│ ├── controllers  
│ │ ├── articleControllers.js  
│ │ ├── countryControllers.js  
│ │ ├── pestleControllers.js  
│ │ ├── sectorControllers.js  
│ │ ├── sourceControllers.js  
│ │ └── topicControllers.js  
│ ├── package.json  
│ ├── routes  
│ │ ├── articleRoutes.js  
│ │ ├── countryRoutes.js  
│ │ ├── pestleRoutes.js  
│ │ ├── sectorRoutes.js  
│ │ ├── sourceRoutes.js  
│ │ └── topicRoutes.js  
│ ├── schemas  
│ │ ├── articleSchema.js  
│ │ ├── countrySchema.js  
│ │ ├── pestleSchema.js  
│ │ ├── reportSchema.js  
│ │ ├── sectorSchema.js  
│ │ ├── sourceSchema.js  
│ │ └── topicSchema.js  
│ └── utils  
│ ├── data.js  
│ └── dataUploadHandler.js  
├── demonstration.webm  
├── frontend  
│ ├── package.json  
│ ├── public  
│ │ ├── favicon.ico  
│ │ ├── index.html  
│ │ ├── logo192.png  
│ │ ├── logo512.png  
│ │ ├── manifest.json  
│ │ └── robots.txt  
│ └── src  
│ ├── App.js  
│ ├── App.module.css  
│ ├── components  
│ │ ├── GraphCardContainer  
│ │ │ ├── GraphCard  
│ │ │ │ ├── Graph  
│ │ │ │ │ ├── BarGraph.js  
│ │ │ │ │ ├── LineGraph.js  
│ │ │ │ │ ├── PieGraph.js  
│ │ │ │ │ └── ScatterPlotChart.js  
│ │ │ │ ├── GraphCard.js  
│ │ │ │ └── GraphCard.module.css  
│ │ │ └── GraphCardContainer.js  
│ │ ├── Header  
│ │ │ ├── Header.js  
│ │ │ └── Header.module.css  
│ │ ├── Overview  
│ │ │ ├── OverviewCard.js  
│ │ │ ├── OverviewCard.module.css  
│ │ │ ├── Overview.js  
│ │ │ └── Overview.module.css  
│ │ └── UI  
│ │ └── LoadingCard  
│ │ ├── LoadingCard.js  
│ │ └── LoadingCard.module.css  
│ ├── context  
│ │ ├── app-context.js  
│ │ └── AppContextProvider.js  
│ ├── index.css  
│ └── index.js  
└── README.md
