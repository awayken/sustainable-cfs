const dothises = document.querySelectorAll('.js-idothis');
[...dothises].forEach(idothis => {
    console.log(idothis)

    idothis.addEventListener('click', e => {
        idothis.innerHTML = '✅ I already do this!';
        idothis.setAttribute('title', 'You rock!');
        idothis.classList.add('tip__button--done');
    })
});

class ScrollTopper {
    constructor(el) {
        this.el = el;
        this.whereToScroll = [0,0];
        this.intialHTML = this.el.innerHTML;
        this.goBackHTML = 'Go Back Down';

        this.attachEvents();
    }

    attachEvents() {
        this.el.addEventListener('click', e => {
            if (e) {
                e.preventDefault();
            }

            this.togglePosition();
        });

        window.addEventListener('scroll', e => {
            const currX = window.scrollX;
            const currY = window.scrollY;
            const x = this.whereToScroll[0];
            const y = this.whereToScroll[1];
            const scrollHTML = this.el.innerHTML;

            if ((currX > 0 || currY > 0) && (x > 0 || y > 0) && scrollHTML === this.goBackHTML) {
                this.setTopper(0, 0, this.intialHTML);
            }
        })
    }

    setTopper(x, y, html) {
        this.whereToScroll = [x, y];
        this.el.innerHTML = html;
    }

    togglePosition() {
        const currX = window.scrollX;
        const currY = window.scrollY;
        const x = this.whereToScroll[0];
        const y = this.whereToScroll[1];

        if (currX > 0 || currY > 0) {
            this.setTopper(currX, currY, this.goBackHTML);
            window.scrollTo(0, 0);
        } else {
            this.setTopper(0, 0, this.intialHTML);
            window.scrollTo(x, y);
        }
    }
}

const scrollToTop = new ScrollTopper(document.querySelector('.js-scrollTop'));
