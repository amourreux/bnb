<template>
    <div>
        <fatal-error v-if="error"></fatal-error>
        <div v-else class="row">
            <div :class="[{ 'col-md-4': twoColumns }, { 'd-none': oneColumn }]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">Loading...</div>
                        <div v-if="hasBooking">
                            <p>
                                Stayed at
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: {
                                            id: booking.bookable.bookable_id
                                        }
                                    }"
                                    >{{ booking.bookable.title }}</router-link
                                >
                            </p>
                            <p>From {{ booking.from }} to {{ booking.to }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[ { 'col-md-8': twoColumns },{ 'col-md-12': oneColumn }]">
                <div v-if="loading">Loading...</div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You've allready left a review for this booking!</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label for="" class="text-muted"
                                >Select the star rating (1 is worst - 5 is
                                best)</label
                            >
                            <star-rating
                                class="fa-3x"
                                v-model="review.rating"
                            ></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted"
                                >Describe your experience with</label
                            >
                            <textarea
                                name="content"
                                cols="30"
                                rows="10"
                                class="form-control"
                                v-model="review.content"
                            ></textarea>
                        </div>
                        <button class="btn-lg btn-primary btn-block" @click.prevent="submit" :disabled="loading">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404 } from "./../shared/utils/response";

export default {
    data() {
        return {
            booking: null,
            review: {
                id: null,
                rating: 5,
                content: null
            },
            existingReview: null,
            loading: false,
            error: false
        };
    },
    created() {
        this.review.id = this.$route.params.id;
        this.loading = true;
        axios
            .get(`/api/reviews/${this.review.id}`)
            .then(response => (this.existingReview = response.data.data))
            .catch(err => {
                console.log(err);
                if (is404(err)) {
                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
                        .then(response => {
                            //console.log(response);
                            this.booking = response.data.data;
                        })
                        .catch(err => {
                            this.error = !is404(err);
                        });
                }

                this.error = true;
            })
            .then(() => {
                this.loading = false;
            });
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed;
        },
        twoColumns() {
            return this.loading || !this.alreadyReviewed;
        }
    },
    methods: {
        submit() {
            this.loading = true;
            axios.post(`/api/reviews`, this.review)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                this.error = true;
            })
            .then(() => {
                this.loading = false;
            });
        }
    }
};
</script>
