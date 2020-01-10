let codes = [];
const status = {
	active: 'активно',
	paused: 'пауза',
	expired: 'просрочен',
	ended: 'закончились'
}

function pc__init(lang) {
	// Глобально ставим язык
	window.lang = lang || 'ru';
	pc__loadCodesList();
}

function pc__loadCodesList() {
	showLoadIcon();
	var ts = Date.now();

	var showdel = getParameterByName('showdel');
	if (typeof showdel != 'undefined' && showdel == 'y') { showdel = 'y'; } else { showdel = ''; }

	$.ajax({
		type: "POST",
		url: "http://localhost:5000/api/",
		data: { comm: 'getcodes', showdel: showdel, lang: window.lang },
		dataType: "text",
		success: function (datastr) {
			if (datastr == '') {
				alert('Error. Empty response from server');
			} else {
				var data = pc__parseJson(datastr);
				if (typeof data == 'object') {
					codes = data;
					pc__drawCodesList(codes);
					pc_lazyload_update();
				}
			}
		},
		error: function (xhr) {
			var ts_delta = Date.now() - ts;
			if (xhr.status == 0 && ts_delta < 100) {
				alert('Request error. Please check internet connection...');
			} else {
				alert('Request timeout');
			}
		},
		complete: function (xhr) {
			hideLoadIcon();
		},
		timeout: 1000 * 60
	});
}

function pc__parseJson(datastr) {
	try {
		var obj = JSON.parse(datastr);
		if (typeof obj == 'object') {
			return obj;
		} else {
			alert('Server response error: ' + datastr);
		}
	} catch (e) {
		alert('Server response error: ' + datastr);
		console.log('Error parse server response! error:' + e);
		console.log(datastr);
	}
}

function showLoadIcon() {
	if ($('#loadicon').length == 0) {
		$('body').append('<div id="loadicon"><img src="/img/ajax-loader.gif"></div>');
	}
	$('#loadicon').css({ "display": "block" });
}

function hideLoadIcon() {
	if ($('#loadicon').length > 0) {
		$('#loadicon').css({ "display": "none" });
	}
}

function pc__drawCodesList(data) {
	const wrapper = $('.pc__codes');
	const head = pc__drawCodesList__getHead();
	wrapper.empty();

	$(wrapper).append(head);

	// Шапка таблицы
	$(wrapper).append(
		`<div class="codes-list__item codes-list__item--head">
			<span class="codes-list__part codes-list__part--id">ID</span>
			<span class="codes-list__part codes-list__part--key">промокод</span>
			<span class="codes-list__part codes-list__part--plan">план</span>
			<span class="codes-list__part codes-list__part--count">количество</span>
			<span class="codes-list__part codes-list__part--countries">страны</span>
			<span class="codes-list__part codes-list__part--duration">длительность</span>
			<span class="codes-list__part codes-list__part--expire">дата окончания</span>
			<span class="codes-list__part codes-list__part--status">статус</span>
			<div class="codes-list__part codes-list__part--toolbar"></div>
		</div>`
	);

	const list = $('<ul class="pc__codeslist codes-list"></ul>');
	for (let item of data) {
		if (item.isDeleted) {
			$(list).append(
				`<li class="codes-list__item codes-list__item--deleted">
					<span class="codes-list__del-message">Промокод удален</span>
					<button class="codes-list__restore-button" type="button" data-id="${item.id}">Восстановить?</button>
				</li>`
			);
		} else {
			const date_expire = item.date_expire ? utcformat(item.date_expire * 1000) : '–';
			const status = pc__drawCodesList__getItemStatus(item);
			const isPaused = status !== 'активно' ? true : false;

			$(list).append(
				`<li class="codes-list__item ${isPaused ? 'codes-list__item--paused' : ''}">
					<span class="codes-list__part codes-list__part--id">${item.id}</span>
					<span class="codes-list__part codes-list__part--key">${item.key.toUpperCase()}</span>
					<span class="codes-list__part codes-list__part--plan">${item.plan}</span>
					<span class="codes-list__part codes-list__part--count">${item.count}</span>
					<span class="codes-list__part codes-list__part--countries">${item.countries || '–'}</span>
					<span class="codes-list__part codes-list__part--duration">${item.duration}</span>
					<span class="codes-list__part codes-list__part--expire">${date_expire}</span>
					<span class="codes-list__part codes-list__part--status">${status}</span>
					<div class="codes-list__part codes-list__part--toolbar">${pc__drawCodesList__getToolbar(item.id, status)}</div>
				</li>`
			);
		}

	}

	function pc__drawCodesList__getHead() {
		return `
		<div class="pc__title-wrap">
			<h1 class="pc__title title">Промокоды</h1>
			<button class="pc__button button button--head" type="button">Добавить</button>
		</div>
		`
	}

	function pc__drawCodesList__getToolbar(id, state) {
		let checkboxState = '';

		switch (state) {
			case status.active:
				checkboxState = 'checked';
				break;
			case status.paused:
				checkboxState = '';
				break;
			case status.expired:
				checkboxState = 'disabled';
				break;
			case status.ended:
				checkboxState = 'disabled';
				break;
		}

		return `
			<div class="codes-list__toolbar toolbar">
				<label class="toolbar__switch">
					<input class="toolbar__checkbox" data-id="${id}" type="checkbox" ${checkboxState}>
					<span class="toolbar__slider"></span>
				</label>
				<button class="toolbar__button toolbar__button--edit" type="button" data-id="${id}">
					<span class="visually-hidden">Edit</span>
				</button>
				<button class="toolbar__button toolbar__button--delete" type="button" data-id="${id}">
				<span class="visually-hidden">Delete</span>
				</button>
			</div>
		`
	}

	function pc__drawCodesList__getItemStatus(item) {
		if (item.date_expire) {
			if (Date.now() > item.date_expire * 1000) return status.expired;
		}
		if (item.off === 'y') return status.paused;
		if (item.count <= 0) return status.ended;
		return status.active;
	}

	$(wrapper).append(list);
	pc__drawSite__addEvents(wrapper);
}

function pc__drawSite__addEvents(wrapper) {
	wrapper.find('.button--head').click(function () {
		pc__showPopup();
	});

	wrapper.find('.toolbar__button--edit').click(function () {
		const id = $(this).attr('data-id');
		const codeItem = codes.find(el => el.id === Number(id));
		pc__showPopup(codeItem);
	});

	wrapper.find('.toolbar__checkbox').click(function () {
		const id = $(this).attr('data-id');

		for (let code of codes) {
			if (code.id === Number(id)) {
				code.off = code['off'] === 'n' ? 'y' : 'n';
				pc__drawCodesList(codes);
				break;
			}
		}
	});

	wrapper.find('.toolbar__button--delete').click(function () {
		const id = Number($(this).attr('data-id'));
		// let deleted = {};

		for (let i = 0; i < codes.length; i++) {
			if (codes[i] && codes[i].id === id) {
				// deleted = jQuery.extend(true, {}, codes[i]);
				codes[i].isDeleted = true;
				pc__drawCodesList(codes);
				restoreTimer(id);
				break;
			}
		}
	});
}

function restoreTimer(id) {
	let timer = setTimeout(function () {
		codes = codes.filter((el, i) => {
			if (el) return id !== el.id;
		})
		pc__drawCodesList(codes);
	}, 5000);


	$(function () {
		const selector = `.codes-list__restore-button[data-id=${id}]`;
		let restoreButton = $(selector);
		// console.log(restoreButton);

		restoreButton.click(() => {
			console.log('click');
			clearTimeout(timer);
			for (let code of codes) {
				if (code.id === id) {
					delete code.isDeleted;
					pc__drawCodesList(codes);
					break;
				}
			}
		});
	});
}

function validURL(textval) {
	var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return urlregex.test(textval);
}

function ParseData(timestamp) {
	if (timestamp == '') return '';
	var date = new Date();
	date.setTime(timestamp);

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function utcformat(d) {
	d = d + (60 * 60 * 3 * 1000);
	d = new Date(d);
	// var tail = '', D = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()],
	// 	T = [d.getUTCHours(), d.getUTCMinutes()];
	var tail = '', D = [d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear()],
		T = [d.getUTCHours(), d.getUTCMinutes()];
	var i = 3;
	while (i) {
		--i;
		if (D[i] < 10) D[i] = '0' + D[i];
		if (T[i] < 10) T[i] = '0' + T[i];
	}
	// return D.join('-') + ' ' + T.join(':') + tail;
	return D.join('.') + ' ' + tail;
}