// import { refs } from './variables';
// const { bodyEl, linkStudents, backdropTeam, closeTeam } = refs;

// linkStudents.addEventListener('click', openTeam);

// function openTeam() {
//   backdropTeam.classList.remove('backdrop-hidden');
//   backdropTeam.addEventListener('click', backdropClick);
//   closeTeam.addEventListener('click', closeModal);

//   window.addEventListener('keydown', onPressEsc);
// }


// function closeModal() {
//   bodyEl.classList.remove('scroll-hidden');
//   backdropTeam.classList.add('backdrop-hidden');
//   backdropTeam.removeEventListener('click', backdropClick);
//   window.removeEventListener('keydown', onPressEsc);
// }

// function onPressEsc(evt) {
//   if (evt.code === 'Escape') {
//     closeModal();
//   }
// }

// function backdropClick(evt) {
//    if (evt.target === evt.currentTarget) {
//     closeModal();
//   }
// }
