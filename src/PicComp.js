import React from 'react';
import './styles/picStyle.css';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const PicComp = ({ pic, updatePicState, somePicClicked, loading }) => {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const screenAlign = windowHeight > windowWidth ? 'vertical' : 'horizontal';

	const defaultStyle = {
		zIndex: 1,
		position: 'relative',
		borderStyle: '',
		borderRadius: '10px',
		height: screenAlign === 'vertical' ? `${windowHeight * 0.3}px` : `${windowHeight * 0.6}px`,
		width: screenAlign === 'horizontal' ? `${windowWidth * 0.4}px` : `${windowWidth * 0.7}px`,
		// height: `${window.innerHeight * 0.5}px`,
		// width: `${window.innerWidth * 0.4}px`,
		opacity: loading ? 0 : 1,
		transition: '400ms',
	};

	const picStyle = somePicClicked ? { ...defaultStyle, opacity: 0.5 } : defaultStyle;

	return (
		<StyleRoot>
			<div className={somePicClicked && !pic.clicked ? 'picCompClicked' : 'picComp'} style={styles.fadeIn}>
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
