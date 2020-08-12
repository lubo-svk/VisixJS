
class Output {
    #element;
    #name = 'out';
    #connections = [];

    constructor(element) {
        this.#element = element;
    }

    setName(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    isConnected() {
        return this.#connections.length !== 0;
    }
}

module.exports = Output;
