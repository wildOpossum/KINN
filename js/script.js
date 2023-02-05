'use strict';

/* search */
const iconForm = document.querySelector('.action-header__search');
const iconSearch = document.querySelector('.action-header');
const searchForm = document.querySelector('.action-header__form');
const inputData = document.forms.search;
const searchValue = inputData.nameInput;

function showSearch() {
	searchForm.classList.add('active');
}

function hideSearch() {
	searchForm.classList.remove('active');
	searchValue.addEventListener('blur', () => {
		inputData.reset();
	});
}

iconForm.addEventListener('click', (e) => {
	console.log(e.target)
	if (e.target.closest('.action-header__search')) {
		showSearch()
		searchValue.focus();
	}
});

document.body.addEventListener('click', (e) => {
	if (!e.target.classList.contains('action-header__search') && !e.target.classList.contains('action-header__input')) {
		hideSearch();
	}
});

document.body.addEventListener('keydown', (e) => {
	if (e.code === 'Escape') {
		hideSearch();
	}
});

/* burger */
const headerMenu = document.querySelector('.menu');
const iconMenu = document.querySelector('.icon-menu');
const overflovBlock = document.querySelector('body');

iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('active');
	headerMenu.classList.toggle('active');
	overflovBlock.classList.toggle('lock');
});

/* Cart */
const productBnt = document.querySelectorAll('.item__buy');
const cartProductList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.action-header__shopping');
const cartQuantity = document.querySelector('.action-header__shopping-quantity');
const fullPrice = document.querySelector('.fullprice');
const shoppingCart = document.querySelector('.action-header__shopping');
const shoppingList = document.querySelector('.cart-content')
let price = 0;

function showCart() {
	shoppingList.classList.add('active');
}
function hideCart() {
	shoppingList.classList.remove('active');
}

//рандомний Id для елементу (для карток з товаром)
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

function generateCardProduct(img, title, price, id) {
	return `
	<li class="cart-content__item">
		<article class="cart-content__product cart-product"  data-id="${id}">
			<div class="cart-product__image">
				<img src="${img}" alt="">
			</div>
			<div class="cart-product__text">
				<h2 class="cart-product__title">${title}</h2>
				<div class="cart-product__price">$${price}</div>
			</div>
			<button class="cart-product__delete"></button>
		</article>
	</li>
	`
}
function deleteProducts(productParrent) {
	//отримати id для розлокування кнопки
	let prodId = productParrent.querySelector('.cart-content__product').dataset.id;
	//розблокувати кнопку
	document.querySelector(`.body-store__item[data-id="${prodId}"]`).querySelector('.item__buy').disabled = false
	//Відмінусувати видалений товар
	let price = productParrent.querySelector('.cart-product__price').textContent;
	const currentPrice = parseFloat(price.slice(1));
	minusFullPrice(currentPrice);
	//Оновити повну ціну
	showFullPrice();
	//видалити елементи із списку
	productParrent.remove();
	//вивести кількість в корзині
	showQuantity()
}
function plussFullPrice(currentPrice) {
	return price += currentPrice;
}

function minusFullPrice(currentPrice) {
	return price -= currentPrice;
}

function showFullPrice() {
	fullPrice.textContent = `$ ${price.toFixed(2)}.`
}
function showQuantity() {
	let length = document.querySelector('.cart-content__list').children.length;
	//кількість товару в корзині
	cartQuantity.textContent = length;
	//???
	/* length > 0 ? cart.classList.add('active') : cart.classList.remove('active'); */
}


productBnt.forEach(item => {
	item.closest('.body-store__item').setAttribute('data-id', randomId());
	item.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parrent = self.closest('.body-store__item');
		let id = parrent.dataset.id;
		let img = parrent.querySelector('.item__image img').getAttribute('src');
		let title = parrent.querySelector('.item__title').textContent;
		let price = parrent.querySelector('.item__price').textContent;
		let priceInt = parseFloat(price.slice(1));
		//визначати суму
		plussFullPrice(priceInt);
		//вивести повну ціну
		showFullPrice();
		//додати до кошинка
		document.querySelector('.cart-content__list')
			.insertAdjacentHTML('afterbegin', generateCardProduct(img, title, priceInt, id))
		//вивести кількість в корзині
		showQuantity();
		//закрити кнопку
		self.disabled = true
	});
});

//видалення із списку
cartProductList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		const parrent = e.target.closest('.cart-content__item');
		deleteProducts(parrent);

	}
});

shoppingCart.addEventListener('click', (e) => {
	if (e.target.closest(".action-header__shopping")) {
		showCart();
	}
});

document.body.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.target.closest(".action-header__shopping") && !e.target.closest('.cart-product__delete')) {
		hideCart();
	}
});
showCart();
hideCart();

//Log in
const modalTriger = document.querySelector('.action-header__user');
const modalCloseBtn = document.querySelector('[data-close]');
const modal = document.querySelector('.modal');
const form = document.forms.loginform;
const input = form.querySelectorAll('input');
const showBnt = form.querySelector('.modal-pass__show');
const pass = form.password;

showBnt.addEventListener('click', () => {
	showBnt.classList.toggle('show');

	if (pass.getAttribute('type') === 'password') {
		pass.setAttribute('type', 'text');
	} else {
		pass.setAttribute('type', 'password');
	}
});

input.forEach(item => {
	const placeholderValue = item.placeholder;
	item.addEventListener('focus', () => {
		item.placeholder = '';
		item.classList.add('_focus');
	});
	item.addEventListener('blur', () => {
		item.placeholder = placeholderValue;
		item.classList.remove('_focus');

		if (item.value === '') {
			item.classList.add('error');
		} else {
			item.classList.remove('error');
		}
	});
});

function showLogin() {

	modal.classList.add('active');
}
function closeLogin() {
	modal.classList.remove('active');
	form.reset()
	input.forEach(item => {
		item.classList.remove('error');
	})
}
modalTriger.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.classList.contains("action-header__user")) {
		showLogin();
	}
});

modalCloseBtn.addEventListener('click', closeLogin);

modal.addEventListener('click', (event) => {
	if (event.target === modal) {
		closeLogin();
	}
});

document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape') {
		closeLogin();
	}
});

//Form
const subscribeForm = document.querySelector('.form-subscribe__body');

const massage = {
	loading: 'loading',
	succses: 'Than you',
	failure: 'Ups, ERROR',
};

postData(subscribeForm);

function postData(formS){
	formS.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(e.target)
		const statusMessage = document.createElement('div');
		statusMessage.textContent = massage.loading;
		formS.append(statusMessage);


		const request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		request.setRequestHeader('Content-type', 'multipart/form-data');

		const formData = new formData(formS);

		request.send(formData);

		request.addEventListener('load', () =>{
			if (request.status === 200) {
				console.log(request.response);
				statusMessage.textContent = massage.succses;
			}else {
				statusMessage.textContent = massage.failure;
			}
		});
	});
}