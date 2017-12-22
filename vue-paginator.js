'use strict';
Vue.component('pagination', {
    methods: {
        navPage: function (next) {
            var nextPageNum = this.activePage + (next ? 1 : -1);

            if (nextPageNum > 0 && nextPageNum <= this.pagesNum)
                this.onChange(nextPageNum);
        },
        filterVisible: function () {
            var start = this.activePage - Math.ceil(this.visiblePages / 2) > 0 ? this.activePage - Math.ceil(this.visiblePages / 2) : 0,
                end = start + this.visiblePages > this.pagesNum ? this.pagesNum - 1 : start + this.visiblePages - 1;

            return this.range(start, end);
        },
        range: function (start, end) {
            return R.range(start, end);
        }
    },
    data: function () {
        var _data = {
            selected: undefined,
            items: this.dataSource
        };
        return _data;
    },
    created: function () {
    },
    props: {
        pagesNum: { type: [Number], default: 0, required: true },
        activePage: { type: [Number], default: 0, required: true },
        onChange: { required: true },
        visiblePages: { type: [Number], default: 15 }
    },
    template:
    '<nav aria-label="...">\
        <ul v-if="pagesNum &gt; 0" class="pagination">\
            <li title="Primeira página" v-bind:class="{ disabled: activePage == 1 }">\
                <a href="javascript:" aria-label="Previous" v-on:click="onChange(1)">\
                    <span aria-hidden="true">&laquo;&laquo;</span>\
                </a>\
            </li>\
            \
            <li title="Página anterior" v-bind:class="{ disabled: activePage == 1 }">\
                <a href="javascript:" aria-label="Previous" v-on:click="navPage(false)">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>\
            \
            <li v-for="n in filterVisible()" v-bind:class="{ active: activePage ==  n + 1 }">\
                <a v-on:click="onChange(n+1)" href="javascript:"> {{ n + 1 }}\
                <span v-if="activePage ==  n + 1" class="sr-only">(current)</span> </a>\
            </li>\
            \
            <li title="Página seguinte" v-bind:class="{ disabled: activePage == pagesNum }">\
                <a href="javascript:" aria-label="Next" v-on:click="navPage(true)">\
                    <span aria-hidden="true">&raquo;</span>\
                </a>\
            </li>\
            \
            <li title="Última Página" v-bind:class="{ disabled: activePage == pagesNum }">\
                <a href="javascript:" aria-label="Next" v-on:click="onChange(pagesNum)">\
                    <span aria-hidden="true">&raquo;&raquo;</span>\
                </a>\
            </li>\
        </ul>\
    </nav>'
});
