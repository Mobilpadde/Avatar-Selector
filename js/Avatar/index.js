import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './style.sass';

class Avatar extends Component {
    constructor(props) {
        super(props);

        this.state = { spin: false };
    }

    toggle() {
        const { onActive } = this.props;

        this.setState({ spin: true });

        setTimeout(() => {
            this.setState({ spin: false });
            onActive();
        }, 1000);
    }

    render() {
        const {
            selected,
            main,
            path,
            classes,
            popopen,
            selector,
        } = this.props;
        const { spin } = this.state;

        return (
            <li
                ref={(ref) => this.li = ref}
                onClick={() => this.toggle()}
                className={classNames(s.avatar, {
                    [s.selected]: selected,
                    [s.chosen]: main,
                    [s.popopen]: popopen,
                    [s.spinner]: spin && !main,
                    [s.selector]: selector,
                }, classes)}
            >
                <img src={path}/>
            </li>
        );
    }
}

Avatar.defaultProps = {
    classes: '',
    selected: false,
    main: false,
    popopen: false,
    selector: false,
};

Avatar.propTypes = {
    onActive: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    classes: PropTypes.string,
    selected: PropTypes.bool,
    popopen: PropTypes.bool,
    main: PropTypes.bool,
    selector: PropTypes.bool,
};

export default Avatar;
