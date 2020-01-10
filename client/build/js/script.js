!function (a, b) { "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.LazyLoad = b() }(this, function () { function a() { q || (m = { elements_selector: "img", container: window, threshold: 300, throttle: 50, data_src: "original", data_srcset: "original-set", class_loading: "loading", class_loaded: "loaded", skip_invisible: !0, show_while_loading: !0, callback_load: null, callback_error: null, callback_set: null, callback_processed: null, placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" }, n = !!window.addEventListener, o = !!window.attachEvent, p = !!document.body.classList, q = !0) } function b(a, b, c) { return n ? void a.addEventListener(b, c) : void (o && (a.attachEvent("on" + b, function (a) { return function () { c.call(a, window.event) } }(a)), a = null)) } function c(a, b, c) { return n ? void a.removeEventListener(b, c) : void (o && a.detachEvent("on" + b, c)) } function d(a, b, c) { function d() { return window.innerWidth || l.documentElement.clientWidth || document.body.clientWidth } function e() { return window.innerHeight || l.documentElement.clientHeight || document.body.clientHeight } function f(a) { return a.getBoundingClientRect().top + m - l.documentElement.clientTop } function g(a) { return a.getBoundingClientRect().left + n - l.documentElement.clientLeft } function h() { var d; return d = b === window ? e() + m : f(b) + b.offsetHeight, d <= f(a) - c } function i() { var e; return e = b === window ? d() + window.pageXOffset : g(b) + d(), e <= g(a) - c } function j() { var d; return d = b === window ? m : f(b), d >= f(a) + c + a.offsetHeight } function k() { var d; return d = b === window ? n : g(b), d >= g(a) + c + a.offsetWidth } var l, m, n; return l = a.ownerDocument, m = window.pageYOffset || l.body.scrollTop, n = window.pageXOffset || l.body.scrollLeft, !(h() || j() || i() || k()) } function e() { var a = new Date; return a.getTime() } function f(a, b) { var c, d = {}; for (c in a) a.hasOwnProperty(c) && (d[c] = a[c]); for (c in b) b.hasOwnProperty(c) && (d[c] = b[c]); return d } function g(a) { try { return Array.prototype.slice.call(a) } catch (b) { var c, d = [], e = a.length; for (c = 0; e > c; c++)d.push(a[c]); return d } } function h(a, b) { return p ? void a.classList.add(b) : void (a.className += (a.className ? " " : "") + b) } function i(a, b) { return p ? void a.classList.remove(b) : void (a.className = a.className.replace(new RegExp("(^|\\s+)" + b + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")) } function j(a, b, c, d) { var e = b.getAttribute("data-" + d), f = b.getAttribute("data-" + c), g = a.tagName; return "IMG" === g ? (f && a.setAttribute("srcset", f), void (e && a.setAttribute("src", e))) : "IFRAME" === g ? void (e && a.setAttribute("src", e)) : void (a.style.backgroundImage = "url(" + e + ")") } function k(a, b) { return function () { return a.apply(b, arguments) } } function l(c) { a(), this._settings = f(m, c), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._handleScrollFn = k(this.handleScroll, this), b(window, "resize", this._handleScrollFn), this.update() } var m, n, o, p, q = !1; return l.prototype._showOnLoad = function (a) { function d() { null !== f && (f.callback_load && f.callback_load(a), j(a, a, f.data_srcset, f.data_src), f.callback_set && f.callback_set(a), i(a, f.class_loading), h(a, f.class_loaded), c(e, "load", d)) } var e, f = this._settings; a.getAttribute("src") || a.setAttribute("src", f.placeholder), e = document.createElement("img"), b(e, "load", d), b(e, "error", function () { i(a, f.class_loading), f.callback_error && f.callback_error(a) }), h(a, f.class_loading), j(e, a, f.data_srcset, f.data_src) }, l.prototype._showOnAppear = function (a) { function d() { null !== e && (e.callback_load && e.callback_load(a), i(a, e.class_loading), h(a, e.class_loaded), c(a, "load", d)) } var e = this._settings; ("IMG" === a.tagName || "IFRAME" === a.tagName) && (b(a, "load", d), b(a, "error", function () { c(a, "load", d), i(a, e.class_loading), e.callback_error && e.callback_error(a) }), h(a, e.class_loading)), j(a, a, e.data_srcset, e.data_src), e.callback_set && e.callback_set(a) }, l.prototype._loopThroughElements = function () { var a, b, c = this._settings, e = this._elements, f = e ? e.length : 0, g = []; for (a = 0; f > a; a++)b = e[a], c.skip_invisible && null === b.offsetParent || d(b, c.container, c.threshold) && (c.show_while_loading ? this._showOnAppear(b) : this._showOnLoad(b), g.push(a), b.wasProcessed = !0); for (; g.length > 0;)e.splice(g.pop(), 1), c.callback_processed && c.callback_processed(e.length); 0 === f && this._stopScrollHandler() }, l.prototype._purgeElements = function () { var a, b, c = this._elements, d = c.length, e = []; for (a = 0; d > a; a++)b = c[a], b.wasProcessed && e.push(a); for (; e.length > 0;)c.splice(e.pop(), 1) }, l.prototype._startScrollHandler = function () { this._isHandlingScroll || (this._isHandlingScroll = !0, b(this._settings.container, "scroll", this._handleScrollFn)) }, l.prototype._stopScrollHandler = function () { this._isHandlingScroll && (this._isHandlingScroll = !1, c(this._settings.container, "scroll", this._handleScrollFn)) }, l.prototype.handleScroll = function () { var a, b, c; this._settings && (b = e(), c = this._settings.throttle, 0 !== c ? (a = c - (b - this._previousLoopTime), 0 >= a || a > c ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = b, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(k(function () { this._previousLoopTime = e(), this._loopTimeout = null, this._loopThroughElements() }, this), a))) : this._loopThroughElements()) }, l.prototype.update = function () { this._elements = g(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler() }, l.prototype.destroy = function () { c(window, "resize", this._handleScrollFn), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null }, l });
window.lazy = 'y';
$(document).ready(function () {
	setTimeout(function () {
		lazyload_thumb = new LazyLoad({
			elements_selector: ".mot__thumb",
			show_while_loading: true,
			placeholder: '',
			threshold: 700
		});
	}, 500);
});

function pc_lazyload_update() {
	if (typeof lazyload_thumb !== "undefined") { lazyload_thumb.update(); }
}
$(function () {
  pc__init('ru');
});
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
// function pc__showPopup__addEvents(wrapper) {
// 	...
// }

function pc__showPopup(item = null) {
	const template = pc__showPopup__editCode(item);
	const modal = $('.modal');
	$(modal).html(template);
	$(modal).addClass('modal--show');

	$(document).click(function (e) {
		const modal = e.target.closest('.modal__content');
		const createButton = e.target.closest('.button--head');
		const toolbar = e.target.closest('.toolbar');

		if (!modal && !createButton && !toolbar) pc__closePopup();
	});
	//datepicker load
	$(document).ready(function () {
		$('#date_expire').datepicker();
	});
}

function pc__closePopup() {
	const modal = $('.modal');
	$(modal).removeClass('modal--show');
	$(document).off('click');
}

function pc__showPopup__editCode(item) {
	return `
      <div class="modal__content">
        <button class="modal__close-button" type="button" onclick="pc__closePopup();">
          <span class="visually-hidden">Закрыть окно</span>
        </button>
        <h3 class="modal__header h4">Редактировать промокод</h3>
        <form class="modal__form form" method="post" action="https://tilda.cc">
          <div class="form__item-group">
            <label class="form__label" for="code">Промокод</label>
            <input class="form__input" type="text" name="code" id="code" placeholder="Придумайте красивый код" ${item ? `value="${item.key}"` : ''} required>
          </div>
          <div class="form__item-group">
            <label class="form__label" for="plan">План</label>
            <div class="form__select-wrapper form__select-wrapper--plan">
              <select class="form__select" name="plan" id="plan" required>
                <option class="form__select-option" value="personal">Personal</option>
                <option class="form__select-option" value="business" checked>Business</option>
              </select>
            </div>
          </div>
          <div class="form__2col">
            <div class="form__item-group form__item-group--2col">
              <label class="form__label" for="count">Количество</label>
              <input class="form__input" type="text" name="count" id="count" placeholder="В штуках" ${item ? `value="${item.count}"` : ''}>
            </div>
            <div class="form__item-group form__item-group--2col">
              <label class="form__label" for="duration">Длительность</label>
              <input class="form__input" type="text" name="duration" id="duration" placeholder="Например: 1 month" ${item ? `value="${item.duration}"` : ''}>
            </div>
          </div>
          <div class="form__2col">
            <div class="form__item-group form__item-group--2col">
              <label class="form__label">Дата создания</label>
              <input class="form__input form__input--disabled" type="text" name="date_created" id="date_created"
                placeholder="20.12.2020" disabled>
            </div>
            <div class="form__item-group form__item-group--2col">
              <label class="form__label" for="date_expire">Дата окончания</label>
              <input class="form__input form__input--date-expire" type="text" name="date_expire" id="date_expire">
            </div>
          </div>
          <div class="form__item-group">
            <label class="form__label" for="countries">Страны</label>
            <input class="form__input" type="text" name="countries" id="countries" ${item ? `value="${item.countries}"` : ''}>
          </div>
          <div class="form__button-wrap">
            <button class="form__button-send button" type="submit">Сохранить и закрыть
            </button>
          </div>
        </form>
      </div>
		`
}
// Datepicker support for IE and Safari
const dateInput = $('.form__input--date-expire');

if (dateInput.type != "date") { //if browser doesn't support input type="date", load files for jQuery UI Date Picker
  document.write('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
  document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"><\/script>\n')
}
if (dateInput.type != "date") { //if browser doesn't support input type="date", initialize date picker widget:
  // $(document).ready(function () {
  //   $('#date_expire').datepicker();
  // });
}

//Multiselect
// $(document).ready(function () {
//   $('.form__select--countries').select2();
// });