// fichier necessaire pour le selecteur de date
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const MONTHS = [
  'janvier',
  'fevrier',
  'mars',
  'avril',
  'may',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];
const WEEKDAYS_LONG = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
];
const WEEKDAYS_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function French() {
  return (
    <DayPicker
      locale="fr"
      months={MONTHS}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={WEEKDAYS_SHORT}
      firstDayOfWeek={1}
    />
  );
}
