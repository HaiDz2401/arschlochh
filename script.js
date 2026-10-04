const photoCards = [...document.querySelectorAll('.photo-card')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxTitle = lightbox.querySelector('strong');
const lightboxMeta = lightbox.querySelector('span');
const lightboxAlt = lightbox.querySelector('.lightbox-alt');
let activePhotos = photoCards;
let activeIndex = 0;

function openLightbox(card) {
	const album = card.closest('[data-album]');
	activePhotos = [...album.querySelectorAll('.photo-card')];
	activeIndex = activePhotos.indexOf(card);
	updateLightbox();
	lightbox.hidden = false;
	document.body.style.overflow = 'hidden';
	lightbox.querySelector('.lightbox-close').focus();
}

function updateLightbox() {
	const card = activePhotos[activeIndex];
	const image = card.querySelector('img');
	photoCards.forEach((photo) => photo.classList.remove('is-selected'));
	card.classList.add('is-selected');
	lightboxImage.src = image.src;
	lightboxImage.alt = image.alt;
	lightboxTitle.textContent = card.dataset.title;
	lightboxMeta.textContent = card.dataset.meta;
	lightboxAlt.textContent = image.alt;
}

function closeLightbox() {
	lightbox.hidden = true;
	document.body.style.overflow = '';
}

photoCards.forEach((card) => {
	const image = card.querySelector('img');
	const altTarget = card.querySelector('.photo-alt');
	if (altTarget) altTarget.textContent = image.alt;
	const gallery = card.closest('[data-album]');
	const cardIndex = [...gallery.querySelectorAll('.photo-card')].indexOf(card);
	if (gallery.dataset.album === 'Street Photo' && cardIndex < 3) image.style.filter = 'blur(3px) brightness(.86)';
	card.addEventListener('click', () => {
		if (gallery?.dataset.album === 'Street Photo' && !gallery.classList.contains('is-expanded')) {
			gallery.classList.add('is-expanded');
			gallery.querySelectorAll('img').forEach((image) => { image.style.setProperty('filter', 'none', 'important'); });
			card.classList.add('is-selected');
			return;
		}
		openLightbox(card);
	});
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
	if (event.target === lightbox) closeLightbox();
});

lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
	activeIndex = (activeIndex - 1 + activePhotos.length) % activePhotos.length;
	updateLightbox();
});

lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
	activeIndex = (activeIndex + 1) % activePhotos.length;
	updateLightbox();
});

document.addEventListener('keydown', (event) => {
	if (lightbox.hidden) return;
	if (event.key === 'Escape') closeLightbox();
	if (event.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
	if (event.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
});
