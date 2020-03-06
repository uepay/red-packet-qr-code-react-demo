import React from 'react';
import PropTypes from 'prop-types';

import css from './avatar.scss';

class Avatar extends React.Component {

    state = {

    }

    render() {
        const { shape, size, src, alt } = this.props;

        let shapeClass = shape === 'circle' ? css.avatarCircle : css.avatarSquare;
        let sizeClass = '';
        let height = '';
        let width = '';
        if (typeof size === 'number') {
            height = size;
            width = size;
        } else {
            if (size === 'default') {
                sizeClass = '';
            }
            if (size === 'large') {
                sizeClass = css.avatarLg;
            }
            if (size === 'small') {
                sizeClass = css.avatarSm;
            }
        }

        return (
            <span className={`${css.avatar} ${shapeClass} ${sizeClass}`} style={{ height: height, width: width }}>
                <img src={src} alt={alt} height={height} width={width} />
            </span>
        )
    }
}

Avatar.defaultProps = {
    shape: "circle",
    size: "default",
    alt: 'image error'
};

Avatar.propTypes = {
    shape: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    src: PropTypes.string,
    alt: PropTypes.string
};

export default Avatar