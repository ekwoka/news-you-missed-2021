import { route } from 'preact-router';
import { Nations } from '../../data';

export default function() {
    const NATIONS = Object.entries(Nations)
    const newIndex = Math.floor(Math.random() * NATIONS.length)
    route(`/country/${NATIONS[newIndex][1].name}`)
}