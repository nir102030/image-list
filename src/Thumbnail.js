import React from 'react';
import './styles/picStyle.css';

const PicComp = ({ pic, updatePicState, somePicClicked, loading }) => {
	const clickedStyle = {
		...pic.style,
		borderStyle: 'solid',
		position: 'fixed',
		left: '0%',
		right: '0%',
		top: '0%',
		bottom: '0%',
		margin: 'auto',
		height: `${window.innerHeight * 0.9}px`,
		width: `${window.innerWidth * 0.7}px`,
		zIndex: 2,
	};

	const defaultStyle = {
		position: 'relative',
		borderStyle: '',
		borderRadius: '10px',
		height: `100px`,
		width: `150px`,
		opacity: loading ? 0 : 1,
		zIndex: 1,
	};

	const picStyle = pic.clicked ? clickedStyle : somePicClicked ? { ...defaultStyle, opacity: 0.5 } : defaultStyle;

	return (
		<div className={somePicClicked && !pic.clicked ? 'thumbnailClicked' : 'thumbnail'}>
			<img
				src={pic.download_url}
				alt={pic.author}
				style={picStyle}
				onClick={() => {
					if (somePicClicked && !pic.clicked) {
					} else updatePicState({ ...pic, clicked: true });
				}}
				onLoad={() => updatePicState({ ...pic, loading: false })}
			/>
		</div>
	);
};
export default PicComp;
