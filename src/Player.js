import idGenerator from './utils/idGenerator';

const DEFAULT_OPTIONS = {};

function Player(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    const id = idGenerator.generate();

    this.getId = () => id;
}

export default Player;
