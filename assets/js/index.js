'use strict'

const INCON_MAP = {
    'www.facebook.com': 'fa-facebook',
    'twitter.com': "fa-twitter-square",
    'www.instagram.com': "fa-instagram",
}



const cardContainer = document.getElementById("root");



fetch('./data.json').then(res => res.json())
    .then((datas) => {
        const cardElements = datas.map(user => createPlaceCard(user));
        cardContainer.append(...cardElements)
    })
    .catch((e) => { console.log(e) })


function createPlaceCard(cardObject) {
    return createElement('li', { className: ['cardContainer'] },
        createElement('article', { className: ['cardContainer'] },
            createCardImageWrapper(cardObject),
            createContentWrapper(cardObject),
            createLinkProfile(cardObject),
        )
    )
}



function createContentWrapper({ profession, firstName, lastName }) {
    return createElement('div', { className: ['contentWrapper'] },
        createElement('h3', { className: ['cardName'] }, `${firstName} ${lastName}`),
        createElement('h3', { className: ['cardProfession'] }, profession || 'unknown'),
        createElement('p', { className: ['cardDescription'] }, 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.')
    )
}

function createCardImageWrapper({ firstName, lastName, profilePicture }) {
    const imageWrapper = createElement('div', { className: ['cardImageWrapper'] },
        createElement('div', { className: ['initials'] }, `${firstName[0]}${lastName[0]}`),
        createElement('img',
            {
                className: ['cardImage'],
                atributes: { 'src': profilePicture, 'hidden': true },
                handlers: { load: loads, error: errors }
            })
    )
    imageWrapper.style.backgroundColor = stringToColor(firstName || '');
    return imageWrapper
}





function createLinkProfile({ contacts }) {
    const linkContainer = createElement('div', { className: ['linkContainer'] });
    contacts.map(link => {
        let url = new URL(link)
        const links = createElement('a', { className: [INCON_MAP[url.hostname] || 'fa-adn', 'fab'], atributes: { 'href': link } })
        linkContainer.append(links)
    })

    return linkContainer
}


function createElement(type, { className = [], handlers = {}, atributes = {} }, ...children) {
    const elem = document.createElement(type);
    elem.classList.add(...className);

    for (let [eventType, eventHandler] of Object.entries(handlers)) {
        elem.addEventListener(eventType, eventHandler);
    }

    for (let [nametAtr, valueAtr] of Object.entries(atributes)) {
        elem.setAttribute(nametAtr, valueAtr);
    }
    elem.append(...children)
    return elem
}



function loads() {
    return this.hidden = false
}


function errors() {
    return this.remove()
}


function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
}








