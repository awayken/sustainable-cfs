class ScrollTopper {
    constructor(el) {
        this.el = el;
        this.whereToScroll = [0,0];
        this.intialHTML = this.el.innerHTML;
        this.togglePosition = this.togglePosition.bind(this);

        this.attachEvents();
    }

    attachEvents() {
        this.el.addEventListener('click', e => {
            if (e) {
                e.preventDefault();
            }

            this.togglePosition();
        });
    }

    togglePosition() {
        const currX = window.scrollX;
        const currY = window.scrollY;
        const x = this.whereToScroll[0];
        const y = this.whereToScroll[1];

        if (currX > 0 && currY > 0) {
            this.whereToScroll = [currX, currY];
            this.el.innerHTML = 'Go Back Down';
            window.scrollTo(0, 0);
        } else {
            this.whereToScroll = [0, 0];
            this.el.innerHTML = this.intialHTML;
            window.scrollTo(x, y);
        }
    }
}

const scrollToTop = new ScrollTopper(document.querySelector('.js-scrollTop'));
