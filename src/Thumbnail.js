import React from 'react';
import './styles/picStyle.css';

const PicComp = ({ pic, updatePicState, somePicClicked, loading }) => {
	const defaultStyle = {
		position: 'relative',
		borderStyle: '',
		borderRadius: '10px',
		height: `100px`,
		width: `150px`,
		opacity: loading ? 0 : 1,
		zIndex: 1,
	};

	const picStyle = somePicClicked ? { ...defaultStyle, opacity: 0.5 } : defaultStyle;

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
