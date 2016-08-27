import ELEMENTS from '../elements';
import points from '../map/points';

export default function () {
  const downloadElement = document.createElement('a');
  downloadElement.download = 'all-points.json';

  ELEMENTS.EXPORT_ALL_POINTS_CONTROL.addEventListener('click', event => {
    points.getPoints()
      .then(points => {
        const url = URL.createObjectURL(new Blob([JSON.stringify(points)], {type: "application/json"}));
        downloadElement.href = url;
        downloadElement.click();
      });
  });
}
