function modal() {

    let more = document.querySelector('.more'),
    moreBtn = document.querySelectorAll('.description-btn'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

    function modal(btn) {
        btn.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            btn.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    }

    modal(more);

    moreBtn.forEach(function(item) {
        modal(item);
    });

}

module.exports = modal;