<template>
<!-- For Web Screen -->
<div class="app-card app-card-orders-table shadow-sm my-3" >
   <div class="app-card-body" >
      <div class="table-responsive">
         <table class="table app-table-hover mb-0 p-1 text-left" >
            <thead >
               <tr >
                  <th class="cell bold text-center" >Service</th>
                  <th class="cell bold" >Title</th>
                  <th class="cell bold" >Price</th>
                  <th class="cell bold text-center" >Due In</th>
                  <th class="cell bold text-center" >Status</th>
                  <th class="cell bold" ></th>
               </tr>
            </thead>
            <tbody >
               <tr v-for="order in orders" :key="order.id">
                  <td class="text-center cell" >
                     <div >
                       <img class="img-fluid bg-info mb-1"
                        alt="img" width="60" height="60"
                        :src="imgURL + '/' + order.image"
                        ></div>
                      
                  </td>
                  <td class="cell" ><span class="truncate" >{{order.description}} </span></td>
                  <td class="cell" ><span class="truncate" >{{order.currency}}{{order.amount}}</span></td>
                  <td class="text-center cell " ><span class="truncate mdi mdi-clock" > {{order.end_date}}</span></td>
                   
                  <td class="text-center cell" >
                    
                  <span class="badge bg-success" v-if="order.status_id == 1"> IN PROGRESS </span> 
                    
                  </td>
                  <td class="cell" >
                      <router-link :to="{name:'OrderDetails', params:order}"
                        class="btn btn-light">
                        View 
                      </router-link>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <!--//table-responsive-->
   </div>
   <!--//app-card-body-->
</div>

<!-- For Mobile Screen -->
<!-- <div class="app-card shadow-sm d-sm-none my-3" >
   <div class="app-card-body p-2" >
      <div class="d-flex flex-column" v-for="order in orders" :key="order.id">
         <div>
            <div class="text-secondary cell bold"> Service: </div>
         </div>
         <div>
            <div class="text-secondary cell d-flex justify-content-between"> <div class="bold"> Title: </div>  <div> {{order.description}} </div> </div>
         </div>
         <div>
            <div class="text-secondary cell d-flex justify-content-between"> <div class="bold">  Price: </div>  <div> {{order.currency}}{{order.amount}} </div> </div>
         </div>
         <div>
            <div class="text-secondary cell d-flex justify-content-between"> <div class="bold"> Due In: </div>  <div> {{order.end_date}} </div> </div>
         </div>
         <div>
            <div class="text-secondary cell bold"> Status: </div>
         </div>
         <div> 
            <div class="text-secondary cell bold"> View: </div>
         </div>
      </div>
   </div>
</div> -->
</template>

<script>
export default {
   props: {
      orders: {
         type: Array,
         required: true
      }
   },
   setup() {
      return{
         imgURL: process.env.VUE_APP_URL,
      }
   }
};
</script>

<style scoped>
 
 .bold{
  font-weight: 500 !important;
}

.name-holder{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  /* background-color: #E4E5E5; */
  background: rgba(0, 0, 0, 0.562);
  padding: 10px;
  color:#fff;
  border-radius: 50%;
  font-weight: 600;
}
.online-icon{
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
 background: #75a925;
  bottom: 2px;
  right: 2px;
}

</style>