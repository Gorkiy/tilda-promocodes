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