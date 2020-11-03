<template>
    <div>
        <div v-if="loading">
            Data is loading...
        </div>
        <div v-else>
            <bookable-list-item
                v-for = "(bookable, index) in bookables"
                :key="index"
                :item-title="bookable.title"
                :item-content = "bookable.content"
                :price="bookable.price">
            </bookable-list-item>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
    components: {
        BookableListItem
    },
    data() {
        return {
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
            }]
        }
    },
    created() {
        console.log('hello world');
        this.loading = true;

        setTimeout( () => {
            console.log("time has come");
            this.loading=false;
        },3000);
    },

}
</script>