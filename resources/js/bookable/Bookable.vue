<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{bookable.title}}</h2>
                        <hr>
                        <article>
                            {{bookable.description}}
                        </article>
                    </div>  
                    <div v-else>Loading...</div>                  
                </div>
            </div>
        </div>
        <div class="col-md-4">
            col-md-4
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.loading = true;
        console.log("loging...");
        console.log(this.$route.params.id);
        const request = axios.get(`/api/bookables/${this.$route.params.id}`);
        request.then(
            responce => {
                console.log(responce.data);
                this.bookable = responce.data.data;
                this.loading = false;
            }
        );
    },
    data() {
        return {
            bookable: null,
            loading: false,
        }
    },
}
</script>