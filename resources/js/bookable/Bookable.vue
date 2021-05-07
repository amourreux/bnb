<template>
    <div class="row">
        <div class="col-md-8 pb-4">
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

            <review-list :bookable-id="this.$route.params.id"></review-list>

        </div>
        <div class="col-md-4 pb-4">
            <availability :bookable-id="this.$route.params.id" @availability="checkPrice($event)">
            </availability>
        </div>
    </div>
</template>

<script>
import availability from "./Availability";
import ReviewList from "./ReviewList";
import { mapState } from "vuex";

export default {
    components: {
        availability,
        ReviewList
    },
    computed:mapState({
        lastSearch: "lastSearch"
    }),
    methods: {
        async checkPrice(hasAvailability){
            if (!hasAvailability) {
                this.price = null;
                return;
            }
            
            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data;
            } catch (err) {
                this.price = null;
            }

        }
    },
    created() {
        this.loading = true;
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