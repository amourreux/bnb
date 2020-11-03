<template>
    <div>
        <div v-if="loading">
            Data is loading...
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div class="col" v-for="(bookable, index) in bookablesInRow(row)"
                 :key="'row' + row + index">
                    <bookable-list-item
                        :key="index"
                        :item-title="bookable.title"
                        :item-content = "bookable.content"
                        :price="bookable.price">
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

        setTimeout( () => {
            console.log("time has come");
            this.loading=false;
        },1000);
    },

}
</script>