import Vue from 'vue';
// NOTE: Here's how to import SuperComponents
import { useSacVue, useSuperWindowVue, useSuperScrollVue, useSuperDOMVue } from '@stereorepo/sac';

import Icon from '~/components/Miscellaneous/Icon';
import Routing from '~/components/Routing';

Vue.prototype.$stereosuper = {
    ...Vue.prototype.$stereosuper,
    namespace: 'stereosuper'
};

const isDevEnv = process.env.NODE_ENV !== 'production';
Vue.config.performance = isDevEnv;

// Set Vue.use here
// NOTE: Here's an example of how to use SuperComponents like SuperWindowVue
Vue.use(useSacVue);
Vue.use(useSuperWindowVue);
Vue.use(useSuperScrollVue);
Vue.use(useSuperDOMVue);

Vue.filter('removeParagraphAround', function(value) {
    if (value.substring(0, 3) === '<p>') {
        let text = value.substring(3);
        text = text.slice(0, -4);
        return text;
    } else {
        return value;
    }
});

// Set Vue.component here
Vue.component('Icon', Icon);
Vue.component('Routing', Routing);
