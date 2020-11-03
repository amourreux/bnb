<template>
    <div>
        <bookable-list-item :item-title="bookable1.title" :item-content = "bookable1.content" :price="bookable1.price"></bookable-list-item>
        <bookable-list-item :item-title="bookable2.title" :item-content = "bookable2.content" :price="bookable2.price"></bookable-list-item>
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
            count: 0,
            bookable1 : {
                title: "Cheap Villa 1 dinamik",
                content: "A very cheap villa 1 dinamik",
                price: 1000
            },
            bookable2 : {
                title: "Cheap Villa 2! dinamik",
                content: "A very cheap villa 2! dinamik",
                price: 900
            },
        }
    },
    created() {
        console.log('hello world');

        console.log(this.bookable1);

        setTimeout( () => {
            console.log("time has come");

            this.bookable1.title= "time has come";
        },5000);
    },

}
</script>