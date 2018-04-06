import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import history from '../history';
import Avatar from '../Avatar';

import s from './style.sass';

class AvatarSelector extends Component {
    constructor(props) {
        super(props);

        this.state = { selector: -1 };
    }

    componentDidMount() {
        document.addEventListener('keyup', (e) => this.handleKeys(e));
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', (e) => this.handleKeys(e));
    }

    handleKeys({ keyCode }) {
        const {
            prevKey,
            nextKey,
            submitKey,
        } = this.props;

        const keysArr = [prevKey, submitKey, nextKey];
        const idx = keysArr.indexOf(keyCode);

        if (idx > -1) {
            this.selector(idx - 1);
        }
    }

    change(id) {
        const { onActive } = this.props;

        onActive();
        history.push(`/${id}`);
    }

    selector(dir) {
        if (dir === 1 || dir === -1) {
            const { avatars } = this.props;
            const { selector } = this.state;

            if (selector + dir > -1 && selector + dir < avatars.length) {
                this.setState((old) => ({
                    selector: old.selector + dir,
                }));
            }
        } else {
            const { selector } = this.state;

            this[`avatar${selector}`].li.click();
        }
    }

    render() {
        const {
            open,
            avatars,
            selected,
        } = this.props;
        const { selector } = this.state;

        return (
            <div className={classNames(s.selector, { [s.open]: open })}>
                <p>Choose your avatar</p>
                <ul>
                    {
                        avatars.length &&
                        avatars.map((a, i) => (
                            <Avatar
                                key={`avatar${a.id}`}
                                ref={(avatar) => this[`avatar${i}`] = avatar}
                                onActive={() => this.change(a.id)}
                                path={a.src}
                                selected={a.id === selected}
                                selector={a.id === selector}
                            />
                        ))
                    }
                </ul>
            </div>
        );
    }
}

AvatarSelector.defaultProps = {
    open: false,
};

AvatarSelector.propTypes = {
    selected: PropTypes.number.isRequired,
    avatars: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
    onActive: PropTypes.func.isRequired,
    nextKey: PropTypes.number.isRequired,
    prevKey: PropTypes.number.isRequired,
    submitKey: PropTypes.number.isRequired,
    open: PropTypes.bool,
};

export default AvatarSelector;
