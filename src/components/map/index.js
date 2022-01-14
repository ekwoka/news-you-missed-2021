import { ReactSVG } from 'react-svg';
import { useState } from 'preact/hooks';

const offset = [];
let offsetFactor = 0;

function getSize(err, svg) {
  if (offset.length >= 2) return;
  console.log(svg);
  const { width, height } = svg.getBBox();
  offset.push(width, height);
  offsetFactor = width / svg.getBoundingClientRect().width;
  console.log(offset);
  console.log(offsetFactor);
}

export default function Map() {
  const [active, setActive] = useState(undefined);
  const [target, setTarget] = useState(undefined);
  const [scale, setScale] = useState(1);

  function selectCountry({ target }) {
    if (!target.id) return;
    console.log(active, target.getAttribute('title'));
    if (active == target.getAttribute('title')) {
      setActive(undefined);
      setTarget(undefined);
      return;
    }
    console.log(target.getAttribute('title'));
    console.log(target.getBBox());
    console.log(target.getBoundingClientRect());
    setActive(target.getAttribute('title'));
    retarget(target.getBBox());
  }

  function retarget({ x, y, width, height }) {
    console.log(x, y);
    y = y + height / 2;
    x = x + width / 2;
    let newTarget = {};
    newTarget.y = offset[1] / 2 / offsetFactor - y / offsetFactor;
    newTarget.x = offset[0] / 2 / offsetFactor - x / offsetFactor;
    console.log(newTarget);
    setTarget(newTarget);
    console.log(1 / Math.max(width / offset[0], height / offset[1]));
    setScale(0.5 / Math.max(width / offset[0], height / offset[1]));
  }

  return (
    <section role="complementary" className="relative flex flex-col items-center w-full px-8 mx-auto overflow-hidden max-w-screen-2xl bg-gray-50">
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
    </section>
  );
}
