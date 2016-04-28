import HasId from './partials/HasId';

const DEFAULT_OPTIONS = {
    id: undefined
};

function Player(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    return Object.assign(
        {},
        HasId({id: options.id})
    );
}

export default Player;
