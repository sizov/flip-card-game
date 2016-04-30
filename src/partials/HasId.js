//FIXME: use id generator to get IDs by default
import idGenerator from '../utils/idGenerator';
export default (state) => ({
    getId: () => typeof state.id === 'undefined' ? idGenerator.generate() : state.id
})
