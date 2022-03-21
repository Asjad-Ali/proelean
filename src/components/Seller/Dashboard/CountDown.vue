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
        <div class="covid-content">
          <h2>00</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Hours</h4>
        <div class="covid-content">
          <h2>20</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Minutes</h4>
        <div class="covid-content">
          <h2>30</h2>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-12">
        <h4>Seconds</h4>
        <div class="covid-content">
          <h2>22</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.covid-content {
    background: #14222B;
    color: #2DBCB2;
    padding: 16px;
    border-radius: 10px;
}
  h4 {
    font-weight: 600;
    padding-bottom: 10px;
    padding-top: 10px;
}
h2{
  color: #2DBCB2;
}
</style>