import { h } from 'preact';
import Hero from "../../components/hero";
import Map from "../../components/map";

const Home = () => (
	<main className="text-emerald-900">
		<Hero />
		<Map />
	</main>
);

export default Home;
