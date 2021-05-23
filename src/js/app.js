/* jshint esversion: 9 */
const axios = require('axios');
const path = require('path');
const jsdom = require('jsdom');
const {
	JSDOM
} = jsdom;
const easyvk = require('easyvk');
const fs = require('fs-extra');
const tgBot = require('node-telegram-bot-api');
const {
	google,
} = require('googleapis');
const resources = require(`${__dirname}\\..\\..\\..\\..\\resources.json`);
const settings = require(`${__dirname}\\..\\..\\..\\..\\settings.json`);
const api = require(`${__dirname}\\..\\..\\..\\..\\api.json`);

const tg = new tgBot(api.tg, {
	polling: true,
});
const youTube = google.youtube({
	version: 'v3',
	auth: api.youTube,
});
const Instagram = require('instagram-web-api');

const inst = new Instagram({
	username: api.inst.login,
	password: api.inst.password,
});
const excel = require('exceljs');
const Workbook = new excel.Workbook();
inst.login({
		username: api.inst.login,
		password: api.inst.password,
	})
	.then(log => console.log(`Instagram authenticated: ${log.authenticated}`))
	.catch(error => console.error('Instagram login error:', error));

const data = {};

for (const key in resources) {
	data[key] = {
		name: resources[key].name,
		dayViews: null,
		dayVisitors: null,
		weekViews: null,
		weekVisitors: null,
		monthViews: null,
		monthVisitors: null,
		vk: null,
		tg: null,
		youTubeSubscribers: null,
		youTubeViews: null,
		ok: null,
		inst: null,
		tw: null,
	};
}
const strToInt = str => Number(`${str}`.replace(/\D/g, ''));
const prettyNumber = str => `${str}`.split('').reverse().join('').replace(/(\d{3})/g, '$1 ').split('').reverse().join('').trim();
const prettyDate = date => `${new Date(date).getDate()}_${new Date(date).getMonth() + 1}_${new Date(date).getFullYear()}~${new Date(date).getHours()}-${new Date(date).getMinutes()}-${new Date(date).getSeconds()}-${new Date(date).getMilliseconds()}`;

async function parse(url, parseFunc, data, key) {
	try {
		const response = await axios.get(url);
		await parseFunc(new JSDOM(response.data).window.document.body, data, key);
	} catch (error) {
		console.error('parse error:', error);
	}
}

const parseMetric = (html, data, key) => {
	const table = html.querySelector('div#trafik').querySelector('.analysis-test__content').querySelector('tbody').children;
	data.dayViews = strToInt(table[0].children[1].innerHTML);
	data.dayVisitors = strToInt(table[1].children[1].innerHTML);
	data.weekViews = strToInt(table[0].children[2].innerHTML);
	data.weekVisitors = strToInt(table[1].children[2].innerHTML);
	data.monthViews = strToInt(table[0].children[3].innerHTML);
	data.monthVisitors = strToInt(table[1].children[3].innerHTML);
	if (settings.snapshots) fs.writeFile(`./snapshots/metric-${prettyDate(Date.now())}-${data.name}.html`, html.innerHTML);
	render(key, [
		'dayViews',
		'dayVisitors',
		'weekViews',
		'weekVisitors',
		'monthViews',
		'monthVisitors',
	]);
};

const parseTw = (html, data, key) => {
	const members = html.querySelector('.table.table-bordered.table-condensed.dashed .col-xs-2');
	data.tw = strToInt(members.innerHTML);
	if (settings.snapshots) fs.writeFile(`./snapshots/${prettyDate(Date.now())} tw - ${data.name}.html`, html.innerHTML);
	render(key, ['tw']);
};

const parseOk = (html, data, key) => {
	const members = html.querySelector('#groupMembersCntEl');
	data.ok = strToInt(members.innerHTML);
	if (settings.snapshots) fs.writeFile(`./snapshots/${prettyDate(Date.now())} ok - ${data.name}.html`, html.innerHTML);
	render(key, ['ok']);
};

const parseVK = (resource, data, key) => {
	easyvk({
		// https://vkhost.github.io/
		token: api.vk,
	}).then(async (vk) => {
		const response = await vk.call('groups.getById', {
			group_id: resource.vk,
			fields: 'members_count',
		});
		data.vk = response[0].members_count;
		render(key, ['vk']);
	}).catch(error => console.error('VK error:', error));
};

const parseTG = (resource, data, key) => {
	tg.getChatMembersCount(resource.tg)
		.then((response) => {
			data.tg = response;
			render(key, ['tg']);
		})
		.catch(error => console.error('Telegram error:', error));
};

const parseYouTube = (resource, data, key) => {
	youTube.channels.list({
		part: 'statistics',
		id: resource.youTube,
	}).then((response) => {
		data.youTubeSubscribers = strToInt(response.data.items[0].statistics.subscriberCount);
		data.youTubeViews = strToInt(response.data.items[0].statistics.viewCount);
		render(key, ['youTubeSubscribers', 'youTubeViews']);
	}).catch(error => console.error('YouTube error:', error));
};

const parseInst = (resource, data, key) => {
	inst.getFollowers({
			userId: resource.inst,
		})
		.then((response) => {
			data.inst = response.count;
			render(key, ['inst']);
		})
		.catch(error => console.error('Instagram error:', error));
};


async function startParsing() {
	for (const key in resources) {
		if (resources[key].metricUrl !== null && (
				data[key].dayViews === null ||
				data[key].dayVisitors === null ||
				data[key].weekViews === null ||
				data[key].weekVisitors === null ||
				data[key].monthViews === null ||
				data[key].monthVisitors === null
			)) await parse(`${settings.metric}${resources[key].metricUrl}`, parseMetric, data[key], key);

		if (resources[key].vk !== null && data[key].vk === null) parseVK(resources[key], data[key], key);

		if (resources[key].tg !== null && data[key].tg === null) parseTG(resources[key], data[key], key);

		if (resources[key].youTube !== null && (
				data[key].youTubeSubscribers === null ||
				data[key].youTubeViews === null
			)) parseYouTube(resources[key], data[key], key);

		if (resources[key].ok !== null && data[key].ok === null) parse(`${settings.ok.before}${resources[key].ok}${settings.ok.after}`, parseOk, data[key], key);

		if (resources[key].inst !== null && data[key].inst === null) parseInst(resources[key], data[key], key);

		if (resources[key].tw !== null && data[key].tw === null) await parse(`${settings.tw}${resources[key].tw}`, parseTw, data[key], key);
		data[key].date = Date.now();
		console.log(`${resources[key].name} : parsing done`);
	}
}

/* web-muzzle */
const start = document.querySelector('#start');
const excelBtn = document.querySelector('#excel');
const table = document.querySelector('#main').querySelector('tbody');

function render(resourceKey, dataKeys = []) {
	dataKeys.forEach((key) => {
		// console.log(resourceKey, key, data[resourceKey][key]);
		const cell = table.querySelector(`#${resourceKey}`).querySelector(`.${key}`);
		cell.classList.add('hide');
		setTimeout(() => {
			cell.style.color = null;
			cell.innerHTML = typeof (data[resourceKey][key]) === 'number' ? prettyNumber(data[resourceKey][key]) : data[resourceKey][key];
			cell.classList.remove('hide');
		}, 200);
	});
}



async function dataToExcel() {
	fs.copy(`${settings.xlsx.path}\\${settings.xlsx.name}`, `${settings.xlsx.path}\\clone-${prettyDate(Date.now())}-${settings.xlsx.name}`);
	let wb = await Workbook.xlsx.readFile(`${settings.xlsx.path}\\${settings.xlsx.name}`);
	for (let key in resources) {
		try {
			let ws = wb.getWorksheet(resources[key].name);
			const table = ws.getTable(key);
			const tableRef = {
				start: {
					row: Number(table.table.tableRef.split(':')[0].replace(/\D/g, '')),
					col: table.table.tableRef.split(':')[0].replace(/\d/g, '')
				},
				end: {
					row: Number(table.table.tableRef.split(':')[1].replace(/\D/g, '')),
					col: table.table.tableRef.split(':')[1].replace(/\d/g, '')
				}
			};
			const lastRow = ws.getRow(tableRef.end.row + 1);
			table.table.tableRef = `${tableRef.start.col}${tableRef.start.row}:${tableRef.end.col}${++tableRef.end.row}`;
			lastRow.values = [
				data[key].date !== null ? new Date(data[key].date) : '-',
				data[key].dayViews !== null ? data[key].dayViews : '-',
				data[key].dayVisitors !== null ? data[key].dayVisitors : '-',
				data[key].weekViews !== null ? data[key].weekViews : '-',
				data[key].weekVisitors !== null ? data[key].weekVisitors : '-',
				data[key].monthViews !== null ? data[key].monthViews : '-',
				data[key].monthVisitors !== null ? data[key].monthVisitors : '-',
				data[key].vk !== null ? data[key].vk : '-',
				data[key].tg !== null ? data[key].tg : '-',
				data[key].youTubeSubscribers !== null ? data[key].youTubeSubscribers : '-',
				data[key].youTubeViews !== null ? data[key].youTubeViews : '-',
				data[key].ok !== null ? data[key].ok : '-',
				data[key].inst !== null ? data[key].inst : '-',
				data[key].tw !== null ? data[key].tw : '-'
			];
			lastRow.numFmt = '#,##0';
			lastRow.getCell('A').numFmt = 'mm-dd-yy';
		} catch (error) {
			console.error('dataToExcel error:', error);
		}
	}
	await wb.xlsx.writeFile(`${settings.xlsx.path}\\${settings.xlsx.name}`);
}


window.addEventListener('DOMContentLoaded', () => {
	const generateTable = () => {
		for (const resourceKey in data) {
			const resource = document.createElement('tr');
			resource.id = resourceKey;
			for (const attributeKey in data[resourceKey]) {
				const cell = document.createElement('td');
				// console.log(resourceKey, attributeKey);
				cell.classList.add(attributeKey, 'hide');
				cell.innerHTML = attributeKey === 'name' ?
					`<a href="${resources[resourceKey].url}" target="_blank">${data[resourceKey][attributeKey]}</a>` :
					resources[resourceKey][attributeKey] !== null ? 'no data' : '-';
				if (attributeKey.includes('youTube') && resources[resourceKey].youTube === null) cell.innerHTML = '-';
				if (!cell.classList.contains('name')) cell.style.color = '#9d9d9d';
				setTimeout(() => cell.classList.remove('hide'), 200);
				resource.append(cell);
			}
			table.append(resource);
		}
	};
	generateTable();

	start.addEventListener('click', () => {
		startParsing();
	});

	excelBtn.addEventListener('click', () => {
		dataToExcel();
	});
});
