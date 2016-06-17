(function () {

    App.emptyCategory = {
        "id": 0,
        "name": "",
        "count": 0,
        "description": ""
    };    

    App.Components.Categories = {
        template: "#category-template",
        data: function() {
            return {
                category: _.extend({}, App.emptyCategory),
                categories: [],
                pages: 1,
                activeCategory: {}
            };
        },        
        components: {
            'category-form': App.Components.CategoryForm
        },
        props: [],
        computed: {
            page: function () {
                return this.$route.query.page || 1;
            },
            currentRoute: function () {
                return this.$route.path.split('?')[0];
            }
        },
        watch: {
            page: function () {
                this.updateList();
            }
        },
        methods: {
            updateList: function () {
                var data = { page: this.page };

                this.$http.get('/admin/categories', data, function (data) {
                    console.log(data);
                    this.categories = data.categories;
                });
            },
            addNew: function () {
                App.vent.trigger('category.modal.open');
                this.category = _.extend({}, App.emptyCategory);
                $('#category-form').modal('show');
            }
        },
        ready: function () {
            this.updateList();
        }
    };

})();