import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Selector from '../AvatarSelector';
import Avatar from '../Avatar';

import a1 from '../../images/avatar1.png';
import a2 from '../../images/avatar2.png';
import a3 from '../../images/avatar3.png';
import a4 from '../../images/avatar4.png';
import a5 from '../../images/avatar5.png';
import a6 from '../../images/avatar6.png';

import s from './style.sass';

const avatars = [
    { src: a1, id: 0 },
    { src: a2, id: 1 },
    { src: a3, id: 2 },
    { src: a4, id: 3 },
    { src: a5, id: 4 },
    { src: a6, id: 5 }
];

const keys = {
    space: 32,
    enter: 13,
    left: 37,
    right: 39,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { popopen: false };
    }

    componentDidMount() {
        document.addEventListener('keyup', (e) => this.handleKeys(e));
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', (e) => this.handleKeys(e));
    }

    handleKeys({ keyCode }) {
        if (keyCode === keys.space) {
            this.toggle();
        }
    }

    toggle() {
        this.setState((old) => ({
            popopen: !old.popopen,
        }));
    }

    render() {
        const { selected } = this.props;
        const { popopen } = this.state;

        return (
            <div className={s.home}>
                <div className={s.center}>
                    <Avatar
                        main
                        popopen={popopen}
                        path={avatars.filter((x) => x.id === selected)[0].src}
                        classes={s.inline}
                        onActive={() => this.toggle()}
                    />
                </div>
                <Selector
                    avatars={avatars}
                    open={popopen}
                    selected={selected}
                    onActive={() => this.toggle()}
                    nextKey={keys.right}
                    prevKey={keys.left}
                    submitKey={keys.enter}
                />
            </div>
        );
    }
}

Home.defaultProps = {
    selected: 0,
};

Home.propTypes = {
    selected: PropTypes.number,
};

export default Home;
