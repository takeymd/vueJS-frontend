(function () {

    App.emptyLedger = {
        "id": 0,
        "name": "",
        "date": moment(new Date).format(App.dateFormat),
        "category_id": 0,
        "isDebit": false,
        "amount": 0
    };    

    App.Components.Ledger = {
        template: "#ledger-template",
        data: function() {
            return {
                ledger: _.extend({}, App.emptyLedger),
                ledgers: [],
                pages: 1,
                activeLedger: {},
                dateFrom: moment(new Date).format(App.dateFormat),
                dateTo: moment(new Date).format(App.dateFormat),
            };
        },        
        components: {
            'ledger-form': App.Components.LedgerForm
        },
        props: [],
        computed: {
            filter: function() {
                return this.$route.params.action;
            },
            page: function () {
                return this.$route.query.page || 1;
            },
            currentRoute: function () {
                return this.$route.path.split('?')[0];
            }
        },
        watch: {
            filter: function () {
                this.updateList();
            },
            page: function () {
                this.updateList();
            }
        },
        methods: {
            updateList: function () {
                var data = { page: this.page };

                if(this.filter == "archive") {
                    data.isArchieve = 1;
                } else {
                    if(this.filter) {
                        data.isDebit = this.filter == "debits" ? 1 : 0;
                    }
                }
                this.$http.get('/admin/ledger', data, function (data) {
                    this.ledgers = data.ledger;
                });
            },
            addNew: function () {
                App.vent.trigger('ledger.modal.open');
                this.ledger = _.extend({}, App.emptyLedger);
                $('#ledger-form').modal('show');
            }
        },
        ready: function () {
            this.updateList();
            App.vent.on('ledger.new', this.addNew.bind(this));
        }
    };

})();