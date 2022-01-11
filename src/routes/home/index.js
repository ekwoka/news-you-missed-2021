import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<h1>News you missed</h1>
		<p>Here's news from around the world that you missed in 2021!</p>
	</div>
);

export default Home;
