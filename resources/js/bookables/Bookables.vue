<template>
    <div>
        <div v-if="loading">
            Data is loading...
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div class="col d-flex aling-items-stretch" v-for="(bookable, index) in bookablesInRow(row)"
                 :key="'row' + row + index">
                    <bookable-list-item
                        v-bind="bookable">
                    </bookable-list-item>
                </div>
                <div class="col" v-for="(placeholder, index) in placeholdersInRows(row)" :key="'placeholder' + row + index">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
    components: {
        BookableListItem
    },
    computed:{
        rows() {
            return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns)
        }
    },
    data() {
        return {
            columns: 3,
            loading: false,
            bookables : [{
                id: 1,
                title: "Cheap Villa 1 dinamik",
                content: "A very cheap villa 1 dinamik",
                price: 1000
            },{
                id: 2,
                title: "Cheap Villa 2! dinamik",
                content: "A very cheap villa 2! dinamik",
                price: 900
            },{
                id: 1,
                title: "Cheap Villa 1 dinamik",
                content: "A very cheap villa 1 dinamik",
                price: 1000
            },{
                id: 2,
                title: "Cheap Villa 2! dinamik",
                content: "A very cheap villa 2! dinamik",
                price: 900
            }]
        }
    },
    methods:{
        bookablesInRow(row){
            return this.bookables.slice((row-1)*this.columns, row * this.columns);
        },
        placeholdersInRows(row){
            return this.columns - this.bookablesInRow(row).length;
        }
    },
    created() {
        console.log('hello world');
        this.loading = true;

        const p = new Promise( (resolve, reject) => {
            setTimeout( () => resolve("Hello Promise"), 3000 );
        });
        p.then(result => console.log(result));

        const request = axios.get('/api/bookables');
        request.then( response => {
           console.log(response.data.data); 
           this.bookables = response.data.data;
        });
        request.finally( () => {
            this.loading=false;
        });
    },
}
</script>