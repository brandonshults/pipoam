import ELEMENTS from '../elements';
import configDb from '../data/config-db';

export default function () {
  configDb.getPointsSettings()
    .then(pointsSettings => ELEMENTS.CENTER_MAP_CONTROL.checked = pointsSettings.centerOnLoad);

  ELEMENTS.CENTER_MAP_CONTROL.addEventListener('change', event =>
    configDb.getPointsSettings()
      .then(pointsSettings =>
        configDb.setPointsSettings(Object.assign({}, pointsSettings, { centerOnLoad: ELEMENTS.CENTER_MAP_CONTROL.checked }))));
}
