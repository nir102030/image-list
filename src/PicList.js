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
		document.title = 'CoCoHub Demo';
	}, []);

	const renderPics = () => {
		const className = view ? 'PicComp' : 'thumbnail';
		return pics.map((pic) => {
			return (
				<PicComp
					pic={pic}
					updatePicState={updatePicState}
					somePicClicked={somePicClicked}
					loading={loading}
					key={pic.id}
					className={className}
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
			className={!somePicClicked ? (view ? 'thumbnailList' : 'picList') : 'picListOverlay'}
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
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<text style={{ margin: 10, fontWeight: 'bold' }}>List View</text>
				<ToggleButton value={view} onToggle={() => setView(!view)} activeLabel="" inactiveLabel="" />
				<text style={{ margin: 10, fontWeight: 'bold' }}>Thumbnails View</text>
			</div>
			{view ? (
				<div style={{ margin: '10px' }}>{renderThumbnails()}</div>
			) : (
				<div style={{ columns: '2 auto' }}>{renderPics()}</div>
			)}
		</div>
	);
};

export default PicList;
