class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.stateRecord = ["normal"];
        this.recordUndoneState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states.hasOwnProperty(state)) {
            this.state = state;
            if (this.state === "normal") {
                this.stateRecord = ["normal"];
            } else {
                this.stateRecord.push(this.state);
            }

        } else {
            throw new Error;
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions[event]) {
            this.state = this.config.states[this.state].transitions[event];
            if (this.state === "normal") {
                this.stateRecord = ["normal"];
            } else {
                this.stateRecord.push(this.state);
            }
            this.recordUndoneState = [];
            return this.state;
        } else {
            throw new Error;
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        let i;

        if (event === undefined) {
            for (i in this.config.states) {
                states.push(i)
            }
        } else {
            for (i in this.config.states) {
                if (this.config.states[i].transitions[event]) {
                    states.push(i)
                }
            }
        }

        return states;
    }


    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateRecord.length > 1) {
            this.recordUndoneState.push(this.stateRecord.pop());
            this.state = this.stateRecord[this.stateRecord.length - 1]
            return true;
        } else {
            this.state = this.stateRecord[0];
            console.log(this.state);
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.recordUndoneState.length > 0) {
            this.state = this.recordUndoneState[this.recordUndoneState.length - 1];
            this.stateRecord.push(this.recordUndoneState.pop());
            return true;
        } else {
            return false;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateRecord = ["normal"];
        this.recordUndoneState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
