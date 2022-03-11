<template>
  <div class="container-xl">
    <h1 class="app-page-title">My Account</h1>
    <div class="row gy-4">
    <ProfileCard />
    <PreferencesCard />
    <SecurityCard />
    <PaymentCard />
    </div>
  </div>
</template>

<script>
import ProfileCard from "../../components/Seller/Account/ProfileCard.vue";
import PreferencesCard from "../../components/Seller/Account/PreferencesCard.vue";
import SecurityCard from "../../components/Seller/Account/SecurityCard.vue";
import PaymentCard from "../../components/Seller/Account/PaymentCard.vue";

export default {
  components: { ProfileCard, PreferencesCard, SecurityCard, PaymentCard },
};
</script>