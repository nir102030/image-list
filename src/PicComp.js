import React from 'react';
import './styles/picStyle.css';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const PicComp = ({ pic, updatePicState, somePicClicked, loading, className }) => {
	const clickedStyle = {
		zIndex: 2,
		borderRadius: '10px',
		borderStyle: 'solid',
		position: 'fixed',
		left: '0%',
		right: '0%',
		top: '0%',
		bottom: '0%',
		margin: 'auto',
		height: `${window.innerHeight * 0.9}px`,
		width: `${window.innerWidth * 0.7}px`,
		transition: '1s',
	};

	const defaultStyle = {
		zIndex: 1,
		position: 'relative',
		borderStyle: '',
		borderRadius: '10px',
		height: `${window.innerHeight * 0.5}px`,
		width: `${window.innerWidth * 0.4}px`,
		opacity: loading ? 0 : 1,
		transition: '400ms',
	};

	const picStyle = pic.clicked ? clickedStyle : somePicClicked ? { ...defaultStyle, opacity: 0.5 } : defaultStyle;

	return (
		<StyleRoot>
			<div className={somePicClicked && !pic.clicked ? `${className}Clicked` : className} style={styles.fadeIn}>
				<img
					className={
						pic.clicked ? 'imgListView' : somePicClicked ? { ...defaultStyle, opacity: 0.5 } : defaultStyle
					}
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
		</StyleRoot>
	);
};
export default PicComp;

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn'),
	},
};
