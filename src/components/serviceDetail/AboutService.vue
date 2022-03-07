<template>
    <div id="description" class="description mb-5">
        <h3>About This Gig</h3>
        <p> {{ service.description }} </p>
        <p> {{ service.additional_info }} </p>
    </div>
</template>

<script>

export default {
    props :{
        service :{
            type: Object,
            require: true
        }
    }
}
</script>
