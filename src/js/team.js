import { refs } from './variables';
const { backdropTeam,  bodyEl, teamClose, linkStudents} = refs;

backdropTeam.addEventListener('click', closeCard);
linkStudents.addEventListener('click', closeModal); //открыть модалку

function closeModal() {

  backdropTeam.classList.remove('backdrop-hidden');
}



function closeCard(ev) {
  ev.preventDefault();
 
      const current = document.querySelector('.default.expand');
    if (ev.target.classList.contains('team-name')) {
        return;
    }    
        
  if (current) {
        ev.target.classList.remove('expand');
        current.classList.remove('expand');
      if (ev.target !== current) {
        ev.target.classList.add('expand');
        }
           
    } else {
        ev.target.classList.add('expand');
    backdropClick(ev);
  }
}

teamClose.addEventListener('click', closeModalTeam);
function closeModalTeam(ev) {
  bodyEl.classList.remove('scroll-hidden');
  backdropTeam.classList.add('backdrop-hidden');
  backdropTeam.removeEventListener('click', backdropClick);
  window.removeEventListener('keydown', onPressEsc);
   }

function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModalTeam();
  }
}

function backdropClick(evt) {
     if (evt.target === evt.currentTarget) {
    closeModalTeam();
  }
}
