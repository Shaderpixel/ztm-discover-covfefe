import { useRouter } from "next/router";
import Link from "next/link";

import { fetchCoffeeStores } from "../../lib/coffee-store";
import styles from "../../styles/coffee-store.module.css";
import Head from "next/head";
import Image from "next/image";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";
import React from "react";

const CoffeeStore = (initialProps) => {
	const router = useRouter();
	const { id } = router.query;
	// console.log("router", router);
	// console.log("initialProps", initialProps);

	//! Accessing data must come after loading state
	if (router.isFallback) {
		return <p>Loading...</p>;
	}

	//! this is a major problem breaking rules of hooks being called conditionally
	const [coffeeStore, setCoffeeStore] = React.useState(
		initialProps.coffeeStore
	);
	const {
		state: { coffeeStores: contextCoffeeStores },
	} = React.useContext(StoreContext);

	// set coffeeStore info from context coffee stores if from getStaticProps is not available
	React.useEffect(() => {
		if (
			initialProps.coffeeStore &&
			isEmpty(initialProps.coffeeStore) &&
			contextCoffeeStores.length > 0
		) {
			const foundCoffeeStoreById = contextCoffeeStores.find(
				(coffeeStore) => coffeeStore.id === id
			);
			setCoffeeStore(foundCoffeeStoreById);
		}
	}, [contextCoffeeStores, id, initialProps.coffeeStore]);

	function handleUpvoteButton() {
		console.log("handle upvote");
	}

	const { name, address, neighborhood, imgUrl } = coffeeStore;

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>← Back to home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						src={
							imgUrl ||
							"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
						}
						width={600}
						height={360}
						className={styles.storeImg}
						alt={`${name} coffee store`}
					/>
				</div>
				<div className={`glass ${styles.col2}`}>
					{address && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/places.svg'
								width={24}
								height={24}
								alt='places icon'
							/>
							<p className={styles.text}>{address}</p>
						</div>
					)}
					{neighborhood && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/nearMe.svg'
								width={24}
								height={24}
								alt='near me icon'
							/>
							<p className={styles.text}>{neighborhood}</p>
						</div>
					)}
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/star.svg'
							width={24}
							height={24}
							alt='star icon'
						/>
						<p className={styles.text}>0</p>
					</div>

					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps({ params }) {
	// console.log("params", params);
	const coffeeStores = await fetchCoffeeStores();
	const foundCoffeeStores = coffeeStores.find(
		(coffeeStore) => coffeeStore.id === params.id
	);
	return {
		props: {
			coffeeStore: foundCoffeeStores ? foundCoffeeStores : {},
		},
	};
}

// looks like getStaticPaths runs before getStaticProps
export async function getStaticPaths() {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map((coffeeStore) => ({
		params: {
			id: coffeeStore.id,
		},
	}));

	return {
		paths,
		fallback: true,
	};
}

export default CoffeeStore;
