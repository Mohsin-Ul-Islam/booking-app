const preload = document.querySelector('.preload');
const search = document.querySelector('.search__results');
const results = document.querySelector('.results');
const searchBox = document.querySelector('.search__box');
const navlinks = document.querySelectorAll('.nav__link');
const heading = document.querySelector('.heading__styled');
const bg = document.querySelector('.right');
const mask = document.querySelector('.left');

const locations = [
    'Quetta, Balochistan',
    'Karachi, Sindh',
    'Peshawar, KPK',
    'Lahore, Punjab',
    'Multan, Punjab'
];

function init() {

    preload.classList.remove('preload');

    searchBox.addEventListener('input', onQuery);

    navlinks.forEach((link, id) => {
        link.addEventListener('click', () => {
            navlinks.forEach(link => link.classList.remove('nav__link--active'));
            link.classList.add('nav__link--active');
            const tag = link.getAttribute('data-tag');
            const img = link.getAttribute('data-img');
            backSpace(heading, 80, tag.length, () => {
                forwardSpace(heading, 80, tag);
            });
            mask.classList.add('unfold-from-left');
            mask.onanimationend = () => {
                bg.style.backgroundImage = `url(./images/${img})`;
                mask.classList.remove('unfold-from-left');
            }
        });
    });

    searchBox.addEventListener('focus', () => {
        search.classList.add('search--focused');
    });

    searchBox.addEventListener('blur', () => {
        search.classList.remove('search--focused');
    });

}

function forwardSpace(elem, speed, value, callback) {
    let index = 0;
    const f = setInterval(
        () => {
            elem.innerHTML += value[index];

            index += 1;

            if (index === value.length) {
                clearInterval(f);

                if (callback) callback();

            }


        }, speed
    );
}

function backSpace(elem, speed, count, callback) {

    if (!count) count = elem.innerHTML.length;

    const f = setInterval(
        () => {
            elem.innerHTML = elem.innerHTML.substr(0, elem.innerHTML.length - 1);

            count -= 1;

            if (count === 0) {
                clearInterval(f);

                if (callback) callback();

            }

        }, speed
    );
}

function onQuery(evt) {

    const searchValue = searchBox.value.trim();

    if (searchValue === '') {
        buildSearchList([]);
        return;
    }

    const matchedLocations = locations.filter((location) => {
        return location.match(new RegExp(searchValue, 'gi')) ? true : false;
    });

    buildSearchList(matchedLocations);

}

function buildSearchList(list) {

    results.innerHTML = '';

    list.forEach((element) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const pinImage = document.createElement('img');

        pinImage.src = './images/pin.svg';
        pinImage.classList.add('map__icon');

        a.href = '#';
        a.innerHTML = element;
        li.classList.add('result');

        li.appendChild(pinImage);
        li.appendChild(a);

        results.appendChild(li);

    });

}

window.addEventListener('load', init);
