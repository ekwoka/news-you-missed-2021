import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const navigation = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'Home',
		path: '/'
	}
]

const Header = () => (
	<header class={style.header}>
		<h1>NEWS YOU MISSED</h1>
		<nav>
			{navigation.map(({ name, path }) => (
				<Link activeClassName={style.active} href={path}>{name}</Link>
			))}
		</nav>
	</header>
);

export default Header;
