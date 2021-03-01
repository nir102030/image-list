import React, { useState, useEffect } from 'react';
import PicComp from './PicComp';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Thumbnail from './Thumbnail';
import ToggleButton from 'react-toggle-button';

const PicList = () => {
	const [pics, setPics] = useState([]);
	const [somePicClicked, setSomePicClicked] = useState(false);
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState(true);

	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const screenAlign = windowHeight > windowWidth ? 'vertical' : 'horizontal';

	const clickedStyle = {
		zIndex: 2,
		borderRadius: '10px',
		borderStyle: 'solid',
		borderColor: 'aliceblue',
		borderWidth: '1px',
		position: 'fixed',
		left: '0%',
		right: '0%',
		top: '0%',
		bottom: '0%',
		margin: 'auto',
		height: screenAlign === 'vertical' ? `${windowHeight * 0.6}px` : `${windowHeight * 0.9}px`,
		width: screenAlign === 'horizontal' ? `${windowWidth * 0.7}px` : `${windowWidth * 0.95}px`,
		// height: `${window.innerHeight * 0.9}px`,
		// width: `${window.innerWidth * 0.7}px`,
		//transition: '1s',
	};

	const initiatePics = () => {
		fetch('https://picsum.photos/v2/list')
			.then((response) => {
				response.json().then((results) => {
					setPics(
						results.map((pic) => {
							return { ...pic, loading: true, clicked: false };
						})
					);
				});
			})
			.catch((err) => console.log(err));
	};

	const updatePicState = (picToUpdate) => {
		const updatedPics = pics.map((pic) => {
			return pic.id === picToUpdate.id ? picToUpdate : pic;
		});
		setPics(updatedPics);
		setSomePicClicked(picToUpdate.clicked);
		if (!updatedPics.find((pic) => pic.loading === true)) setLoading(false);
	};

	useEffect(() => {
		initiatePics();
	}, []);

	const renderPics = () => {
		return pics.map((pic) => {
			return (
				<PicComp
					pic={pic}
					updatePicState={updatePicState}
					somePicClicked={somePicClicked}
					loading={loading}
					key={pic.id}
				/>
			);
		});
	};

	const renderThumbnails = () => {
		return pics.map((pic) => {
			return (
				<Thumbnail
					pic={pic}
					updatePicState={updatePicState}
					somePicClicked={somePicClicked}
					loading={loading}
					key={pic.id}
				/>
			);
		});
	};

	return (
		<div
			className={
				!somePicClicked
					? view
						? 'thumbnailList'
						: 'picList'
					: view
					? 'thumbnailListOverlay'
					: 'picListOverlay'
			}
			onClick={() => {
				const pic = pics.find((pic) => pic.clicked);
				if (pic) updatePicState({ ...pic, clicked: false });
			}}
		>
			{loading ? (
				<Loader
					type="Puff"
					color="#00BFFF"
					height={100}
					width={100}
					style={{ position: 'fixed', top: '50%', left: '50%' }}
				/>
			) : null}
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					position: 'fixed',
					zIndex: 100,
					margin: '10px',
					backgroundColor: 'white',
					borderRadius: '10px',
				}}
			>
				{/* {screenAlign === 'horizontal' ? <text style={{ margin: 10 }}>List View</text> : null} */}
				<ToggleButton value={view} onToggle={() => setView(!view)} activeLabel="" inactiveLabel="" />
				{/* {screenAlign === 'horizontal' ? <text style={{ margin: 10 }}>Thumbnails View</text> : null} */}
			</div>
			{view ? <div style={{ margin: '20px' }}>{renderThumbnails()}</div> : <div>{renderPics()}</div>}
			{pics.find((pic) => pic.clicked === true) ? (
				<img src={pics.find((pic) => pic.clicked === true).download_url} alt="." style={clickedStyle} />
			) : null}
		</div>
	);
};

export default PicList;
