<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-border">
            Check Availability

            <transition name="fade">
                <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
                <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
            </transition>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    class="form-control form-control-sm"
                    placeholder="Start Date"
                    v-model="from"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': errorFor('from') }]"
                />

                <v-errors :errors="this.errorFor('from')"></v-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    name="to"
                    class="form-control form-control-sm"
                    placeholder="End Date"
                    v-model="to"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': this.errorFor('to') }]"
                />

                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
        </div>
        <check-button :loading="loading" @check="check">Check!</check-button>
    </div>
</template>

<script>
import { is422 } from "./../shared/utils/response";
import validationErrors from "./../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number]
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null
        };
    },
    methods: {
        check() {
            this.loading = true;
            this.errors = null;

            this.$store.dispatch("setLastSearch", {
                from: this.from,
                to: this.to
            });

            axios
                .get(
                    `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                )
                .then(response => {
                    this.status = response.status;
                })
                .catch(error => {
                    if (is422(error)) {
                        this.errors = error.response.data.errors;
                    }
                    this.status = error.response.status;
                })
                .then(() =>  {
                    (this.loading = false);
                    this.$emit('availability', this.hasAvailability);
                });
        }
    },
    computed: {
        hasErrors() {
            return 422 === this.status && this.errors !== null;
        },
        hasAvailability() {
            return 200 === this.status;
        },
        noAvailability() {
            return 404 === this.status;
        }
    }
};
</script>

<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bolder;
}
.is-invalid {
    border-color: #b22222;
    background-image: none;
}

.invalid-feedback {
    border-color: #b22222;
}
</style>
