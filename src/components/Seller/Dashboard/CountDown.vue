<template>
 
  <div
    class="
      app-card
      alert alert-dismissible
      shadow-sm
      mb-4
      pb-3
    "
  >
<h5 style="border-bottom: 1px solid #e7e9ed;" class="text-center py-2 text-muted">Time left to deliver</h5>
 
    <div class="row d-flex justify-content-center text-center">
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Days</h4>
        <div class="count-down-content">
          <h2>{{ remainingTime.days }}</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Hours</h4>
        <div class="count-down-content">
          <h2>{{ remainingTime.hours }}</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Minutes</h4>
        <div class="count-down-content">
          <h2>{{ remainingTime.minutes }}</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Seconds</h4>
        <div class="count-down-content">
          <h2>{{ remainingTime.seconds }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    time: {
      default: new Date().toString(),
    },
  },
  setup(props) {
    const remainingTime = ref({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });

    const timeNow = ref((new Date()).getTime());
    const endDate = new Date(props.time);

    onMounted(() => {
      setInterval(() => {
        timeNow.value= (new Date()).getTime();
        const difference = (endDate.getTime() - timeNow.value);
    
        remainingTime.value={ 
          days: Math.floor(difference / (1000 * 3600 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      }, 1000);
    });

    return {
      remainingTime,
    };
  },
};
</script>

<style scoped>
.count-down-content {
  background: #14222b;
  color: #2dbcb2;
  padding: 16px;
  border-radius: 10px;
}
h4 {
  font-weight: 600;
  padding-bottom: 10px;
  padding-top: 10px;
}
h2 {
  color: #2dbcb2;
}
</style>