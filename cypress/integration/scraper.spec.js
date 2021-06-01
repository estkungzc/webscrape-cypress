/// <reference types="cypress" />

import promisify from 'cypress-promise';
const { _, $ } = Cypress;

describe('Collecting Data', () => {
	before(() => {
		cy.visit('http://air4thai.pcd.go.th/webV2/history');
	});

	it('Creating the json data', async () => {
		// Get all parameters
		const params = await promisify(
			cy
				.get('select#parameter_name option')
				.then(($el) => _.slice($el).map((x) => x.value))
		);

		// Select all parameters
		await promisify(cy.get('select#parameter_name').select(params));

		// Get all stations
		let stations = await promisify(
			cy
				.get('select#station_name option')
				.then(($el) => _.slice($el).map((x) => x.value))
		);

		// Write all stations to json file
		cy.writeFile(`data/stations.json`, stations);

		// Get all data(params) each stations
		stations.forEach(async (station, index) => {
			cy.wait(500);
			cy.get('select#station_name').select(station);

			// Click this button to show data table
			cy.contains('ตาราง Table').click();

			// Get pages number
			const pages = await promisify(
				cy.get('ul.pagination li').then(($li) => {
					const pagesElement = $li[$li.length - 2];
					const pages = parseInt(pagesElement.innerText);
					return pages;
				})
			);

			// Get column of table
			const cols = await promisify(
				cy.get('table#table1 thead tr').then(($tr) => {
					const rowElement = $tr.get(0);
					const cells = rowElement.cells;
					const cols = _.slice(cells).map((c) => c.innerText);
					return cols;
				})
			);
			cy.wait(500);

			let results = [];

			// Get data in each page and store in results
			for (let index = 0; index < pages; index++) {
				// const element = array[index];

				const data = await promisify(
					cy.get('table#table1 tbody tr').then(($tr) => {
						const rowsElement = _.slice($tr);
						let r = [];
						rowsElement.forEach((el) => {
							const cells = el.cells;
							const cols = _.slice(cells).map((c) => c.innerText);
							r.push(cols);
						});
						return r;
					})
				);

				data.forEach((row) => {
					let obj = {};

					row.forEach((el, idx) => {
						obj[cols[idx]] = el;
					});
					results.push(obj);
				});

				cy.get('li#table1_next').contains('Next').click();
				cy.wait(500);
			}
			console.log(results);

			// Finally write results to json file
			cy.writeFile(`data/${stations[index]}.json`, results);
			// cy.wait(300);
		});
	});
});
