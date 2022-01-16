import { ReactSVG } from 'react-svg';
import { useState } from 'preact/hooks';
import { useGlobalState } from '../../plugins/preact/globalState';
import { route } from 'preact-router';

const offset = [];
let offsetFactor = 0;

function getSize(err, svg) {
  if (offset.length >= 2) return;
  const { width, height } = svg.getBBox();
  offset.push(width, height);
  offsetFactor = width / svg.getBoundingClientRect().width;
}

export default function Map() {
  const [active, setActive] = useGlobalState('country');
  const [target, setTarget] = useState(undefined);
  const [scale, setScale] = useState(1);

  function selectCountry({ target }) {
    if (!target.id) return;
    if (active == target.getAttribute('title')) {
      setActive(undefined);
      setTarget(undefined);
      setScale(1);
      return;
    }
    route(`/country/${target.getAttribute('title')}`);
    setActive(target.getAttribute('title'));
    retarget(target.getBBox());
  }

  function retarget({ x, y, width, height }) {
    y = y + height / 2;
    x = x + width / 2;
    let newTarget = {
      y: offset[1] / 2 / offsetFactor - y / offsetFactor,
      x: offset[0] / 2 / offsetFactor - x / offsetFactor
    };
    setTarget(newTarget);
    setScale(0.5 / Math.max(width / offset[0], height / offset[1]));
  }

  return (
    <section role="complementary" className="relative flex flex-col items-center w-full px-8 pb-4 mx-auto overflow-hidden max-w-screen-2xl bg-gray-50">
      <style>
        {`.map-svg path[title='${active}'] {
          fill: #${Math.floor(Math.random() * 16777215).toString(16)};
        }`}
        {target
          ? `.map-svg {
          transform: scale(${scale}) translate(${target.x}px, ${target.y}px);
          }`
          : `.map-svg {
            transform: scale(${scale}) translate(0px, 0px);
        }`}
      </style>
      <ReactSVG src="assets/worldHigh.svg" onClick={selectCountry} afterInjection={getSize} className="w-full duration-[2s] map-svg trasnition-transform" />

      <div class="absolute bottom-1 z-10 rounded shadow bg-gray-100 py-2 px-4 min-w-max max-w-sm mx-auto">{active || 'Select a country on the map'}</div>
    </section>
  );
}
