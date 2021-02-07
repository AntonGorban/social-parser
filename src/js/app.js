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

const resources = require(`${__dirname}/json/resources.json`);
const settings = require(`${__dirname}/json/settings.json`);
const api = require(`${__dirname}/json/api.json`);

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

async function parse(url, parseFunc, data, key) {
	try {
		let date = Date.now();
		const response = await axios.get(url);
		date = new Date((date + Date.now()) / 2);
		data.date = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
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
	if (settings.snapshots) fs.writeFile(`./snapshots/${data.date} metric - ${data.name}.html`, html.innerHTML);
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
	if (settings.snapshots) fs.writeFile(`./snapshots/${data.date} tw - ${data.name}.html`, html.innerHTML);
	render(key, ['tw']);
};

const parseOk = (html, data, key) => {
	const members = html.querySelector('#groupMembersCntEl');
	data.ok = strToInt(members.innerHTML);
	if (settings.snapshots) fs.writeFile(`./snapshots/${data.date} ok - ${data.name}.html`, html.innerHTML);
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


function startParsing() {
	for (const key in resources) {
		if (resources[key].metricUrl) parse(`${settings.metric}${resources[key].metricUrl}`, parseMetric, data[key], key);
		if (resources[key].vk) parseVK(resources[key], data[key], key);
		if (resources[key].tg) parseTG(resources[key], data[key], key);
		if (resources[key].youTube) parseYouTube(resources[key], data[key], key);
		if (resources[key].ok) parse(`${settings.ok.before}${resources.dnrsovet.ok}${settings.ok.after}`, parseOk, data[key], key);
		if (resources[key].inst) parseInst(resources[key], data[key], key);
		if (resources[key].tw) parse(`${settings.tw}${resources[key].tw}`, parseTw, data[key], key);
	}
}

/* web-muzzle */
const start = document.querySelector('#start');
const table = document.querySelector('#main').querySelector('tbody');

function render(resourceKey, dataKeys = []) {
	dataKeys.forEach((key) => {
		// console.log(resourceKey, key, data[resourceKey][key]);
		const cell = table.querySelector(`#${resourceKey}`).querySelector(`.${key}`);
		cell.classList.add('hide');
		setTimeout(() => {
			cell.innerHTML = typeof (data[resourceKey][key]) === 'number' ? prettyNumber(data[resourceKey][key]) : data[resourceKey][key];
			cell.classList.remove('hide');
		}, 200);
	});
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
					data[resourceKey][attributeKey] :
					resources[resourceKey][attributeKey] !== null ? 'no data' : '-';
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
});
