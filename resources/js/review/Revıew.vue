<template>
    <div>
        <div class="form-group">
            <label for="" class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
            <star-rating :rating="4.5" class="fa-3x"></star-rating>
        </div>
        <div class="form-group">
            <label for="content" class="text-muted">Describe your experience with</label>
            <textarea name="content" cols="30" rows="10" class="form-control"></textarea>
        </div>
        <button class="btn-lg btn-primary btn-block">
            Submit
        </button>
    </div>
</template>