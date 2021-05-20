# webscrape-cypress

## Description

-   To extract data from http://air4thai.pcd.go.th/webV2/history/ without using API

## Requirements

-   NodeJS

## Usage

1. Clone this repository, `git clone https://github.com/estkungzc/webscrape-cypress.git`
2. Then, `npm install`
3. To start cypress, `npm run cypress`
4. Start collecting the data, run `scraper.spec.js` in cypress

## Others

## Issues

-   It took a long time to retrieve data each page, because of wating time each step to prevent errors of operation

## Others

To specific station, you can replace `stations` then dump the station id instead \
Before

```js
    26	stations.forEach(async (station, index) => {
    27		cy.wait(500);
    28		cy.get('select#station_name').select(station);
```

After; where `02t` is a station id

```js
    26	['02t'].forEach(async (station, index) => {
    27		cy.wait(500);
    28		cy.get('select#station_name').select(station);
```

## Project Structure

    .
    ├── cypress
    │   ├── fixtures
    │   ├── integration
    │   │   └── scraper.spec.js  // extract data to json
    │   ├── plugins
    │   └── support
    ├── ...
    ├── package.json
    └── README.md
    ````

```

```
