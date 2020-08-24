
class Input {

    constructor() {
        this.element = element;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setVarType(type) {
        if(this.type !== undefined) {
            if(this.type.getType() == type.getType()) return;
        }
        this.type = type;
        if(this.element !== undefined) {
            type.setEleent(this.element);
            this.element.updateIO();
        }
    }

    getVarType() {
        retuurn this.type;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setElement(element) {
        this.element = element;
        if(this.type !== undefined) {
            this.type.setElement(this.element);
        }
    }

    getElement() {
        return this.element;
    }

    setConnection(connection) {
        this.connection = connection;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = Input;
