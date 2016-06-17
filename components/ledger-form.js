(function () {

    App.Components.LedgerForm = {
        template: "#ledger-form-template",
        data: function () {
            return {
                date: moment(new Date).format(App.dateFormat),
                name: "",
                categories: [],
                isDebit: 1,
                amount: null,
                errors: {},
                warnings: {}
            }
        },
        props: ['ledger', 'ledgers'],
        computed: {
            action: function () {
                if (this.ledger.id) {
                    return '/admin/ledger/' + this.ledger.id;
                } else {
                    return '/admin/ledger';
                }
            }
        },
        watch: {
            
        },
        methods: {
            initModal: function () {
                this.$http.get('/admin/categories', function (data) {
                    console.log(data);
                });
            }
        },
        ready: function () {
            this.initModal();
        }
    };

})();