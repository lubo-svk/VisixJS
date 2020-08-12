
class Input {
    #element;
    #name = 'in';
    #connection = undefined;

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
        return typeof(this.#connection) !== 'undefined';
    }
}

module.exports = Input;
