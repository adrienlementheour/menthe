export const state = () => ({
    loading: true,
    manualColorMode: false,
    manualDarkMode: true,
    paths: [],
    isTouch: true
});

// export const getters = () => {};

export const mutations = {
    setLoading(state, loading) {
        state.loading = loading;
    },
    setManualColorMode(state, isManualDarkMode) {
        state.manualColorMode = isManualDarkMode;
    },
    setManualDarkMode(state, isManualDarkMode) {
        state.manualDarkMode = isManualDarkMode;
    },
    invertManualDarkMode(state) {
        state.manualDarkMode = !state.manualDarkMode;
    },
    addShapes(state, shapes) {
        state.paths = state.paths.concat(shapes);
    },
    clearShapes(state) {
        state.paths = [];
    },
    setShapes(state, shapes) {
        state.paths = shapes;
    },
    setTouch(state, isTouch) {
        state.isTouch = isTouch;
    }
};

// export const actions = {};
