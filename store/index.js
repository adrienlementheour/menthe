export const state = () => ({
    loading: true,
    manualColorMode: false,
    manualDarkMode: true
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
    }
};

// export const actions = {};
