(function () {

    App.Components.CategoryForm = {
        template: "#category-form-template",
        data: function () {
            return {
                name: "",
                description: "",
                count: 0,
                errors: {},
                warnings: {}
            }
        },
        props: ['category', 'categories'],
        computed: {
            action: function () {
                if (this.category.id) {
                    return '/admin/categories/' + this.category.id;
                } else {
                    return '/admin/categories';
                }
            }
        },
        watch: {
            //....
        },
        methods: {
            //...
        },
        ready: function () {
            //...
        }
    };

})();