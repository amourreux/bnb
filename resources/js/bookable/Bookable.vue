<template>
    <div>
        bookable
    </div>
</template>


<script>
export default {
    created() {
        console.log(this.$route.params.id);
        const request = axios.get(`/api/bookables/${this.$route.params.id}`);
        request.then(
            responce => {
                console.log(responce.data);
            }
        );
    },
    data() {
        return {
            bookable: null
        }
    },
}
</script>