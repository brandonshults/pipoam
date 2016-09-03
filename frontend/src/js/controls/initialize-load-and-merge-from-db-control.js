import ELEMENTS from '../elements';
import controls from './controls';
import points from '../map/points';

export default function () {
  ELEMENTS.LOAD_FROM_DB_FORM.addEventListener('submit', event => {
    if (!window.fetch) {
      alert('Sorry, your browser must support fetch to use this feature.  See https://developer.mozilla.org/en/docs/Web/API/Fetch_API for more information.');
      return;
    }

    event.preventDefault();

    const formData = new FormData(ELEMENTS.LOAD_FROM_DB_FORM);
    fetch('/load-from-db', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load points from db');
        }
        return response.json();
      })
      .then(pointsFromDb => {
        if(formData.get('mergePoints') === 'true') {
          return points.mergePoints(pointsFromDb);
        } else {
          return points.setPoints(pointsFromDb)
        }
      })
      .then(() => {
        ELEMENTS.LOAD_FROM_DB_FORM.classList.remove('error');
        controls.closeMenus();
      })
      .catch(handleFormError);
  });
}


function handleFormError() {
  ELEMENTS.LOAD_FROM_DB_FORM.classList.add('error');
}
