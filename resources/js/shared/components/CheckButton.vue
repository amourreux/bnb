<template>
    <div>
        <button
            class="btn btn-secondary btn-block"
            @click="handleClick"
            :disabled="this.loading"
        >
            <span v-if="!this.loading">
                <slot></slot>
            </span>
            <span v-if="this.loading"><i class="fas fa-circle-notch fa-spin"></i>
                <slot></slot>
            </span>
            
        </button>
    </div>
</template>

<script>
export default {
    props: [
        "loading",
    ],methods: {
        handleClick () {
            this.$emit('check')
        }
    },
}
</script>